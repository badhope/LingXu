"""
DATA-AI - 万能智能助手 Web Interface
完整的系统化架构，包括知识库、技能系统、MCP工具、数据清洗等功能
"""

from fastapi import FastAPI, WebSocket, WebSocketDisconnect, Request, UploadFile, File, Form, HTTPException, Depends
from fastapi.responses import HTMLResponse, JSONResponse, FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
import asyncio
import json
import os
import sys
import uuid
import datetime
import re
import tempfile
import shutil
from pathlib import Path
from typing import Dict, List, Optional, Any
import aiofiles
from pydantic import BaseModel, Field

try:
    from openai import AsyncOpenAI
    OPENAI_AVAILABLE = True
except ImportError:
    OPENAI_AVAILABLE = False

app = FastAPI(
    title="DATA-AI - 万能智能助手",
    description="完整的系统化智能助手：知识库、技能系统、MCP工具、数据清洗",
    version="2.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = Path(__file__).parent
CONFIG_DIR = BASE_DIR / "config"
DATA_DIR = BASE_DIR / "data"
KNOWLEDGE_DIR = DATA_DIR / "knowledge_bases"
SKILLS_DIR = DATA_DIR / "skills"
MCP_CONFIG_FILE = CONFIG_DIR / "mcp.json"
SETTINGS_FILE = CONFIG_DIR / "web_config.json"

for dir_path in [CONFIG_DIR, DATA_DIR, KNOWLEDGE_DIR, SKILLS_DIR]:
    dir_path.mkdir(parents=True, exist_ok=True)

class Settings(BaseModel):
    llm: Dict[str, Any] = Field(default_factory=lambda: {
        "provider": "aliyun",
        "model": "qwen-plus-latest",
        "base_url": "https://dashscope.aliyuncs.com/compatible-mode/v1",
        "api_key": "",
        "max_tokens": 4096,
        "temperature": 0.7,
        "top_p": 0.9,
        "stream": False
    })
    sandbox: Dict[str, Any] = Field(default_factory=lambda: {
        "enabled": True,
        "timeout": 60,
        "allow_network": False
    })
    knowledge_base: Dict[str, Any] = Field(default_factory=lambda: {
        "enabled": True,
        "vector_db": "sqlite",
        "chunk_size": 1000,
        "chunk_overlap": 200,
        "embedding_model": "text-embedding-v3"
    })
    conversation: Dict[str, Any] = Field(default_factory=lambda: {
        "history_enabled": True,
        "max_history": 50,
        "auto_title": True
    })
    display: Dict[str, Any] = Field(default_factory=lambda: {
        "theme": "dark",
        "thinking_chain": True,
        "code_highlight": True,
        "markdown_render": True
    })
    agent: Dict[str, Any] = Field(default_factory=lambda: {
        "max_steps": 5,
        "auto_mode": True,
        "reasoning_mode": "auto"
    })
    langsmith: Dict[str, Any] = Field(default_factory=lambda: {
        "enabled": False,
        "api_key": "",
        "project": "dataagent",
        "endpoint": "https://api.smith.langchain.com"
    })

class KnowledgeBase(BaseModel):
    id: str
    name: str
    description: str = ""
    created_at: str
    updated_at: str
    embedding_model: str = "text-embedding-v3"
    indexing_technique: str = "high_quality"
    permission: str = "only_me"

class Document(BaseModel):
    id: str
    knowledge_base_id: str
    name: str
    data_source_type: str
    status: str
    file_path: str
    created_at: str
    content: Optional[str] = None
    error: Optional[str] = None

class ProcessingRule(BaseModel):
    mode: str = "automatic"
    rules: Dict[str, Any] = Field(default_factory=lambda: {
        "pre_processing_rules": [
            {"id": "remove_extra_spaces", "enabled": True},
            {"id": "remove_urls_emails", "enabled": False}
        ],
        "segmentation": {
            "separator": "\n\n",
            "max_tokens": 1000,
            "chunk_size": 1000,
            "chunk_overlap": 200
        }
    })

class Skill(BaseModel):
    id: str
    name: str
    description: str
    version: str = "1.0.0"
    author: str = ""
    category: str = "custom"
    type: str = "custom"
    icon: str = "⚡"
    status: str = "published"
    created_at: str
    updated_at: str
    parameters: List[Dict[str, Any]] = Field(default_factory=list)
    prompts: Dict[str, Any] = Field(default_factory=dict)
    tools: List[Dict[str, Any]] = Field(default_factory=list)

class MCPServer(BaseModel):
    id: str
    name: str
    type: str
    command: str = ""
    args: List[str] = Field(default_factory=list)
    url: str = ""
    env: Dict[str, str] = Field(default_factory=dict)
    status: str = "inactive"
    enabled: bool = True
    icon: str = "🔌"

current_settings: Settings = Settings()
knowledge_bases: Dict[str, KnowledgeBase] = {}
documents: Dict[str, Document] = {}
skills: Dict[str, Skill] = {}
mcp_servers: Dict[str, MCPServer] = {}

def load_settings():
    if SETTINGS_FILE.exists():
        try:
            with open(SETTINGS_FILE, 'r', encoding='utf-8') as f:
                data = json.load(f)
                return Settings(**data)
        except Exception as e:
            print(f"Error loading settings: {e}")
    return Settings()

def save_settings(settings: Settings):
    with open(SETTINGS_FILE, 'w', encoding='utf-8') as f:
        json.dump(settings.model_dump(), f, ensure_ascii=False, indent=2)

current_settings = load_settings()

def load_knowledge_bases():
    index_file = KNOWLEDGE_DIR / "index.json"
    if index_file.exists():
        try:
            with open(index_file, 'r', encoding='utf-8') as f:
                data = json.load(f)
                for kb_id, kb_data in data.items():
                    knowledge_bases[kb_id] = KnowledgeBase(**kb_data)
        except Exception as e:
            print(f"Error loading knowledge bases: {e}")

def save_knowledge_bases():
    index_file = KNOWLEDGE_DIR / "index.json"
    data = {kb_id: kb.model_dump() for kb_id, kb in knowledge_bases.items()}
    with open(index_file, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

def load_skills():
    index_file = SKILLS_DIR / "index.json"
    if index_file.exists():
        try:
            with open(index_file, 'r', encoding='utf-8') as f:
                data = json.load(f)
                for skill_id, skill_data in data.items():
                    skills[skill_id] = Skill(**skill_data)
        except Exception as e:
            print(f"Error loading skills: {e}")
    if not skills:
        init_builtin_skills()

def save_skills():
    index_file = SKILLS_DIR / "index.json"
    data = {skill_id: skill.model_dump() for skill_id, skill in skills.items()}
    with open(index_file, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

def init_builtin_skills():
    builtin = [
        Skill(
            id="code_reviewer",
            name="代码审查专家",
            description="智能代码审查，发现潜在问题并提供优化建议",
            version="1.0.0",
            author="DATA-AI Team",
            category="code_generation",
            type="built_in",
            icon="🔍",
            created_at=datetime.datetime.now().isoformat(),
            updated_at=datetime.datetime.now().isoformat(),
            parameters=[
                {"name": "code", "type": "string", "description": "待审查的代码", "required": True},
                {"name": "language", "type": "string", "description": "编程语言", "required": False, "enum": ["python", "javascript", "typescript"]}
            ],
            prompts={
                "system_prompt": "你是一位资深的代码审查专家，请按照以下标准审查代码：\n1. 检查语法错误和潜在bug\n2. 评估代码风格和最佳实践\n3. 提供性能优化建议\n4. 指出安全隐患"
            }
        ),
        Skill(
            id="data_analyzer",
            name="数据分析助手",
            description="执行数据分析和可视化",
            version="1.0.0",
            author="DATA-AI Team",
            category="data_analysis",
            type="built_in",
            icon="📊",
            created_at=datetime.datetime.now().isoformat(),
            updated_at=datetime.datetime.now().isoformat(),
            parameters=[
                {"name": "data", "type": "string", "description": "数据", "required": True},
                {"name": "analysis_type", "type": "string", "description": "分析类型", "required": True, "enum": ["summary", "statistics", "visualization"]}
            ]
        ),
        Skill(
            id="document_processor",
            name="文档处理助手",
            description="提取、总结和分析文档内容",
            version="1.0.0",
            author="DATA-AI Team",
            category="document_processing",
            type="built_in",
            icon="📄",
            created_at=datetime.datetime.now().isoformat(),
            updated_at=datetime.datetime.now().isoformat(),
            parameters=[
                {"name": "content", "type": "string", "description": "文档内容", "required": True},
                {"name": "task", "type": "string", "description": "任务类型", "required": True, "enum": ["summary", "key_points", "translation"]}
            ]
        )
    ]
    for skill in builtin:
        skills[skill.id] = skill
    save_skills()

def load_mcp_servers():
    if MCP_CONFIG_FILE.exists():
        try:
            with open(MCP_CONFIG_FILE, 'r', encoding='utf-8') as f:
                data = json.load(f)
                if "mcpServers" in data:
                    for server_id, server_data in data["mcpServers"].items():
                        mcp_servers[server_id] = MCPServer(
                            id=server_id,
                            name=server_data.get("name", server_id),
                            type=server_data.get("type", "stdio"),
                            command=server_data.get("command", ""),
                            args=server_data.get("args", []),
                            url=server_data.get("url", ""),
                            env=server_data.get("env", {}),
                            enabled=server_data.get("enabled", True),
                            icon="🔌"
                        )
        except Exception as e:
            print(f"Error loading MCP servers: {e}")

def save_mcp_servers():
    data = {
        "mcpServers": {
            server_id: {
                "type": server.type,
                "command": server.command,
                "args": server.args,
                "url": server.url,
                "env": server.env,
                "enabled": server.enabled
            } for server_id, server in mcp_servers.items()
        }
    }
    with open(MCP_CONFIG_FILE, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

load_knowledge_bases()
load_skills()
load_mcp_servers()

async def execute_python(code: str, timeout: int = 30) -> dict:
    try:
        proc = await asyncio.create_subprocess_exec(
            sys.executable, "-c", code,
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE,
            cwd=tempfile.mkdtemp(prefix="dataagent_"),
            env={**os.environ, "MPLBACKEND": "Agg", "PYTHONIOENCODING": "utf-8"},
        )
        stdout, stderr = await asyncio.wait_for(proc.communicate(), timeout=timeout)
        return {
            "success": True,
            "stdout": stdout.decode('utf-8', errors='replace'),
            "stderr": stderr.decode('utf-8', errors='replace'),
            "returncode": proc.returncode
        }
    except asyncio.TimeoutError:
        return {"success": False, "error": "执行超时"}
    except Exception as e:
        return {"success": False, "error": str(e)}

async def call_llm(prompt: str, settings: Settings) -> str:
    if not OPENAI_AVAILABLE:
        return "错误: 未安装 openai 库，请运行 pip install openai"
    if not settings.llm.get("api_key"):
        return "请先在设置中配置 API Key"
    try:
        client = AsyncOpenAI(
            api_key=settings.llm["api_key"],
            base_url=settings.llm["base_url"]
        )
        response = await client.chat.completions.create(
            model=settings.llm["model"],
            messages=[{"role": "user", "content": prompt}],
            max_tokens=settings.llm["max_tokens"],
            temperature=settings.llm["temperature"],
            top_p=settings.llm["top_p"]
        )
        return response.choices[0].message.content
    except Exception as e:
        return f"LLM调用失败: {str(e)}"

async def clean_text(text: str, rules: dict) -> str:
    result = text
    pre_rules = rules.get("pre_processing_rules", [])
    for rule in pre_rules:
        if rule.get("enabled"):
            rule_id = rule.get("id")
            if rule_id == "remove_extra_spaces":
                result = re.sub(r'\s+', ' ', result).strip()
            elif rule_id == "remove_urls_emails":
                result = re.sub(r'https?://\S+', '', result)
                result = re.sub(r'\S+@\S+', '', result)
    return result

@app.get("/api/settings")
async def get_settings():
    return JSONResponse(current_settings.model_dump())

@app.post("/api/settings")
async def update_settings(request: Request):
    global current_settings
    data = await request.json()
    current_settings = Settings(**data)
    save_settings(current_settings)
    return JSONResponse({"success": True, "settings": current_settings.model_dump()})

@app.get("/api/knowledge-bases")
async def list_knowledge_bases():
    result = []
    for kb in knowledge_bases.values():
        kb_data = kb.model_dump()
        # 计算文档数量
        doc_count = sum(1 for doc in documents.values() if doc.knowledge_base_id == kb.id)
        kb_data["document_count"] = doc_count
        result.append(kb_data)
    return JSONResponse(result)

@app.post("/api/knowledge-bases")
async def create_knowledge_base(request: Request):
    data = await request.json()
    kb_id = str(uuid.uuid4())
    now = datetime.datetime.now().isoformat()
    kb = KnowledgeBase(
        id=kb_id,
        name=data.get("name", "未命名知识库"),
        description=data.get("description", ""),
        created_at=now,
        updated_at=now,
        embedding_model=data.get("embedding_model", "text-embedding-v3"),
        indexing_technique=data.get("indexing_technique", "high_quality")
    )
    knowledge_bases[kb_id] = kb
    save_knowledge_bases()
    (KNOWLEDGE_DIR / kb_id).mkdir(exist_ok=True)
    return JSONResponse(kb.model_dump())

@app.get("/api/knowledge-bases/{kb_id}")
async def get_knowledge_base(kb_id: str):
    if kb_id not in knowledge_bases:
        raise HTTPException(status_code=404, detail="知识库不存在")
    return JSONResponse(knowledge_bases[kb_id].model_dump())

@app.post("/api/knowledge-bases/{kb_id}/documents")
async def upload_document(kb_id: str, file: UploadFile = File(...)):
    if kb_id not in knowledge_bases:
        raise HTTPException(status_code=404, detail="知识库不存在")
    
    allowed_extensions = {'.pdf', '.txt', '.md', '.docx', '.csv', '.xlsx', '.xls', '.ppt', '.pptx'}
    max_size = 50 * 1024 * 1024  # 50MB
    
    file_ext = Path(file.filename).suffix.lower()
    if file_ext not in allowed_extensions:
        raise HTTPException(
            status_code=400, 
            detail=f"不支持的文件格式: {file_ext}。支持的格式: {', '.join(allowed_extensions)}"
        )
    
    file.file.seek(0, 2)
    size = file.file.tell()
    file.file.seek(0)
    
    if size > max_size:
        raise HTTPException(
            status_code=400, 
            detail=f"文件过大: {size / 1024 / 1024:.2f}MB。最大支持 {max_size / 1024 / 1024}MB"
        )
    
    upload_dir = Path("data/uploads") / kb_id
    upload_dir.mkdir(parents=True, exist_ok=True)
    
    doc_id = str(uuid.uuid4())
    file_path = upload_dir / f"{doc_id}{file_ext}"
    
    try:
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        now = datetime.datetime.now().isoformat()
        doc = Document(
            id=doc_id,
            knowledge_base_id=kb_id,
            name=file.filename or "文档",
            data_source_type="upload",
            status="processing",
            file_path=str(file_path),
            created_at=now
        )
        documents[doc_id] = doc
        
        asyncio.create_task(process_document(doc_id, file_path, file_ext))
        
        return JSONResponse({
            **doc.model_dump(),
            "message": f"文件上传成功，正在处理..."
        })
        
    except Exception as e:
        if file_path.exists():
            file_path.unlink()
        raise HTTPException(status_code=500, detail=f"文件上传失败: {str(e)}")

async def process_document(doc_id: str, file_path: Path, file_ext: str):
    try:
        content = ""
        
        if file_ext == '.txt' or file_ext == '.md':
            async with aiofiles.open(file_path, 'r', encoding='utf-8') as f:
                content = await f.read()
        
        elif file_ext == '.csv':
            import pandas as pd
            df = pd.read_csv(file_path)
            content = df.to_string()
        
        if doc_id in documents:
            documents[doc_id].status = "available"
            documents[doc_id].content = content[:10000] if len(content) > 10000 else content
            
    except Exception as e:
        if doc_id in documents:
            documents[doc_id].status = "failed"
            documents[doc_id].error = str(e)

@app.get("/api/knowledge-bases/{kb_id}/documents")
async def list_documents(kb_id: str):
    if kb_id not in knowledge_bases:
        raise HTTPException(status_code=404, detail="知识库不存在")
    kb_docs = [doc.model_dump() for doc in documents.values() if doc.knowledge_base_id == kb_id]
    return JSONResponse(kb_docs)

@app.get("/api/skills")
async def list_skills():
    return JSONResponse([skill.model_dump() for skill in skills.values()])

@app.post("/api/skills/generate")
async def generate_skill(request: Request):
    data = await request.json()
    purpose = data.get("purpose", "")
    
    if not purpose:
        raise HTTPException(status_code=400, detail="请提供技能用途描述")
    
    if not app_settings.get("llm", {}).get("api_key"):
        raise HTTPException(status_code=400, detail="请先在设置中配置API Key")
    
    try:
        client = AsyncOpenAI(
            api_key=app_settings["llm"]["api_key"],
            base_url=app_settings["llm"].get("base_url", "https://api.openai.com/v1")
        )
        
        prompt = f"""基于以下需求，生成一个AI技能的建议：

需求：{purpose}

请生成一个JSON对象，包含以下字段：
- name: 技能名称（中文，不超过30字）
- icon: 表情符号图标（一个emoji）
- description: 详细描述（中文，100字以内）
- category: 分类（代码/数据/文档/翻译/写作/学习/创意/其他）

只返回JSON，不要其他内容。"""
        
        response = await client.chat.completions.create(
            model=app_settings["llm"].get("model", "gpt-4o"),
            messages=[{"role": "user", "content": prompt}],
            max_tokens=500,
            temperature=0.7
        )
        
        result_text = response.choices[0].message.content.strip()
        
        import re
        json_match = re.search(r'\{.*\}', result_text, re.DOTALL)
        if json_match:
            result = json.loads(json_match.group())
            return JSONResponse(result)
        else:
            raise HTTPException(status_code=500, detail="AI返回格式错误")
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI生成失败: {str(e)}")

@app.post("/api/skills")
async def create_skill(request: Request):
    data = await request.json()
    skill_id = data.get("id", str(uuid.uuid4()))
    now = datetime.datetime.now().isoformat()
    skill = Skill(
        id=skill_id,
        name=data.get("name", "未命名技能"),
        description=data.get("description", ""),
        version=data.get("version", "1.0.0"),
        author=data.get("author", ""),
        category=data.get("category", "custom"),
        type=data.get("type", "custom"),
        icon=data.get("icon", "⚡"),
        created_at=now,
        updated_at=now,
        parameters=data.get("parameters", []),
        prompts=data.get("prompts", {}),
        tools=data.get("tools", [])
    )
    skills[skill_id] = skill
    save_skills()
    return JSONResponse(skill.model_dump())

@app.get("/api/skills/{skill_id}")
async def get_skill(skill_id: str):
    if skill_id not in skills:
        raise HTTPException(status_code=404, detail="技能不存在")
    return JSONResponse(skills[skill_id].model_dump())

@app.post("/api/skills/{skill_id}/use")
async def use_skill(skill_id: str, request: Request):
    if skill_id not in skills:
        raise HTTPException(status_code=404, detail="技能不存在")
    skill = skills[skill_id]
    data = await request.json()
    params = data.get("parameters", {})
    prompt = ""
    if skill.prompts.get("system_prompt"):
        prompt += skill.prompts["system_prompt"] + "\n\n"
    template = skill.prompts.get("user_prompt_template", "{{input}}")
    user_input = params.get("input", str(params))
    prompt += template.replace("{{input}}", user_input)
    for key, value in params.items():
        prompt = prompt.replace(f"{{{{{key}}}}}", str(value))
    response = await call_llm(prompt, current_settings)
    return JSONResponse({"response": response, "skill": skill.name})

@app.get("/api/mcp/servers")
async def list_mcp_servers():
    return JSONResponse([server.model_dump() for server in mcp_servers.values()])

@app.post("/api/mcp/servers")
async def create_mcp_server(request: Request):
    data = await request.json()
    server_id = data.get("id", str(uuid.uuid4()))
    server = MCPServer(
        id=server_id,
        name=data.get("name", "未命名服务器"),
        type=data.get("type", "stdio"),
        command=data.get("command", ""),
        args=data.get("args", []),
        url=data.get("url", ""),
        env=data.get("env", {}),
        enabled=data.get("enabled", True),
        icon=data.get("icon", "🔌")
    )
    mcp_servers[server_id] = server
    save_mcp_servers()
    return JSONResponse(server.model_dump())

@app.get("/api/schema/{schema_type}")
async def get_schema(schema_type: str):
    schema_file = CONFIG_DIR / "schema" / f"{schema_type}_schema.json"
    if not schema_file.exists():
        raise HTTPException(status_code=404, detail="Schema不存在")
    with open(schema_file, 'r', encoding='utf-8') as f:
        return JSONResponse(json.load(f))

async def run_universal_agent(websocket: WebSocket, message: str):
    try:
        await websocket.send_json({
            "type": "thinking",
            "title": "🤔 理解需求",
            "content": f"正在分析用户需求: {message[:80]}..."
        })
        
        use_code = False
        kb_related = False
        search_enabled = False
        
        if current_settings.knowledge_base.get("enabled"):
            kb_related = any(kw in message.lower() for kw in ["文档", "知识库", "knowledge", "search", "查找"])
        
        if any(kw in message.lower() for kw in ["代码", "python", "图表", "计算", "数据", "分析", "plot", "chart", "execute"]):
            use_code = True
        
        if use_code:
            await websocket.send_json({
                "type": "thinking",
                "title": "🛠️ 工具选择",
                "content": "检测到代码/数据需求，准备生成Python代码"
            })
            
            code_prompt = f"""根据用户需求生成Python代码：
用户需求：{message}
请直接输出可执行的Python代码，不需要解释。如果需要图表，保存为PNG文件。"""
            
            await websocket.send_json({
                "type": "thinking",
                "title": "💬 调用模型",
                "content": "正在向AI模型请求生成代码..."
            })
            
            code = await call_llm(code_prompt, current_settings)
            code = re.sub(r'^```python\s*\n?', '', code.strip(), flags=re.MULTILINE)
            code = re.sub(r'\n?```$', '', code.strip(), flags=re.MULTILINE)
            code = code.strip()
            
            await websocket.send_json({
                "type": "thinking",
                "title": "📋 生成代码",
                "content": f"```python\n{code}\n```"
            })
            
            await websocket.send_json({
                "type": "thinking",
                "title": "▶️ 执行代码",
                "content": "正在沙箱环境中执行代码..."
            })
            
            result = await execute_python(code, timeout=current_settings.sandbox["timeout"])
            
            if result["success"]:
                response = f"✅ 执行成功！\n\n**标准输出:**\n{result['stdout']}\n\n**代码:**\n```python\n{code}\n```"
                if result["stderr"]:
                    response += f"\n\n**警告:**\n{result['stderr']}"
            else:
                response = f"❌ 执行失败: {result.get('error', '未知错误')}\n\n**代码:**\n```python\n{code}\n```"
        
        elif kb_related and knowledge_bases:
            await websocket.send_json({
                "type": "thinking",
                "title": "📚 知识库检索",
                "content": "正在从知识库中检索相关信息..."
            })
            
            kb_list = ", ".join([kb.name for kb in knowledge_bases.values()])
            
            await websocket.send_json({
                "type": "thinking",
                "title": "🔍 检索内容",
                "content": f"可用知识库: {kb_list}"
            })
            
            response = await call_llm(f"用户问题：{message}\n\n可用知识库：{kb_list}\n\n请基于知识库内容回答用户问题。", current_settings)
        
        else:
            await websocket.send_json({
                "type": "thinking",
                "title": "🧠 智能分析",
                "content": "正在处理您的请求..."
            })
            
            await websocket.send_json({
                "type": "thinking",
                "title": "💬 调用模型",
                "content": "正在向AI模型发送请求..."
            })
            
            response = await call_llm(message, current_settings)
        
        await websocket.send_json({"type": "stream_start"})
        
        chunk_size = 50
        for i in range(0, len(response), chunk_size):
            chunk = response[i:i+chunk_size]
            await websocket.send_json({"type": "stream_data", "content": chunk})
            await asyncio.sleep(0.05)
        
        await websocket.send_json({"type": "stream_end"})
        
    except Exception as e:
        error_msg = f"❌ 处理失败: {str(e)[:300]}"
        await websocket.send_json({"type": "error", "content": error_msg})
        import traceback
        print(f"Error in run_universal_agent: {traceback.format_exc()}")

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            data = await websocket.receive_json()
            message = data.get("content", "")
            await run_universal_agent(websocket, message)
    except WebSocketDisconnect:
        pass
    except Exception as e:
        print(f"WebSocket error: {e}")

@app.get("/")
async def get():
    html_file = BASE_DIR / "static" / "index.html"
    return FileResponse(html_file)

app.mount("/static", StaticFiles(directory=BASE_DIR / "static"), name="static")

if __name__ == "__main__":
    import uvicorn
    print("🚀 Starting DATA-AI Web Interface...")
    uvicorn.run(app, host="0.0.0.0", port=8000)
