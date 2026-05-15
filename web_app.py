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
import traceback
from pathlib import Path
from typing import Dict, List, Optional, Any, Callable
import aiofiles
from pydantic import BaseModel, Field

# Agent framework imports (lazy-loaded to avoid breaking if unavailable)
AGENT_FRAMEWORK_AVAILABLE = False
try:
    from app.agent.toolcall import ToolCallAgent
    from app.tool import (
        Terminate,
        WebSearch,
        PythonExecute,
        StrReplaceEditor,
        ToolCollection,
    )
    from app.llm import LLM
    from app.schema import Message, Memory, ToolChoice, AgentState
    from app.config import config as app_config
    from app.prompt.data import SYSTEM_PROMPT as DATA_SYSTEM_PROMPT
    AGENT_FRAMEWORK_AVAILABLE = True
except Exception as e:
    print(f"[Agent Framework] Import failed, will use fallback: {e}")

try:
    from openai import AsyncOpenAI
    OPENAI_AVAILABLE = True
except ImportError:
    OPENAI_AVAILABLE = False

# RAG module import
from app.rag import retriever, TFIDFRetriever

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
conversations: Dict[str, dict] = {}  # {conv_id: {"id": str, "title": str, "messages": [...], "created_at": str, "updated_at": str}}

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
proc = await asyncio.create_subprocess_# FIX: 移除exec，改用安全方式
# 
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

            # 将文档内容添加到 RAG 检索器
            if content.strip():
                kb_id = documents[doc_id].knowledge_base_id
                doc_name = documents[doc_id].name
                try:
                    retriever.add_document(
                        doc_id=doc_id,
                        content=content,
                        metadata={"name": doc_name, "kb_id": kb_id}
                    )
                    print(f"[RAG] 文档 {doc_name} ({doc_id}) 已添加到检索库，共 {len(retriever.documents.get(doc_id, []))} 个片段")
                except Exception as rag_err:
                    print(f"[RAG] 添加文档到检索库失败: {rag_err}")
            
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

@app.post("/api/knowledge-bases/search")
async def search_knowledge_base(request: Request):
    """搜索知识库 - 使用 RAG 语义检索"""
    data = await request.json()
    query = data.get("query", "")
    top_k = data.get("top_k", 5)
    min_score = data.get("min_score", 0.1)

    if not query.strip():
        return JSONResponse([])

    results = retriever.search(query, top_k=top_k, min_score=min_score)
    return JSONResponse(results)

@app.get("/api/knowledge-bases/rag/stats")
async def get_rag_stats():
    """获取 RAG 检索库统计信息"""
    return JSONResponse(retriever.get_stats())

@app.get("/api/skills")
async def list_skills():
    return JSONResponse([skill.model_dump() for skill in skills.values()])

@app.post("/api/skills/generate")
async def generate_skill(request: Request):
    data = await request.json()
    purpose = data.get("purpose", "")
    
    if not purpose:
        raise HTTPException(status_code=400, detail="请提供技能用途描述")
    
    if not current_settings.llm.get("api_key"):
        raise HTTPException(status_code=400, detail="请先在设置中配置API Key")

    try:
        client = AsyncOpenAI(
            api_key=current_settings.llm["api_key"],
            base_url=current_settings.llm.get("base_url", "https://api.openai.com/v1")
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
            model=current_settings.llm.get("model", "gpt-4o"),
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

# ==================== 对话历史 API ====================

@app.get("/api/conversations")
async def list_conversations():
    """获取所有对话列表"""
    return JSONResponse(sorted(conversations.values(), key=lambda x: x["updated_at"], reverse=True))

@app.post("/api/conversations")
async def create_conversation(request: Request):
    """创建新对话"""
    data = await request.json()
    conv_id = data.get("id", str(uuid.uuid4()))
    conv = {
        "id": conv_id,
        "title": data.get("title", "新对话"),
        "messages": [],
        "created_at": datetime.datetime.now().isoformat(),
        "updated_at": datetime.datetime.now().isoformat()
    }
    conversations[conv_id] = conv
    return JSONResponse(conv)

@app.get("/api/conversations/{conv_id}")
async def get_conversation(conv_id: str):
    """获取单个对话详情"""
    if conv_id not in conversations:
        raise HTTPException(status_code=404, detail="对话不存在")
    return JSONResponse(conversations[conv_id])

@app.delete("/api/conversations/{conv_id}")
async def delete_conversation(conv_id: str):
    """删除对话"""
    if conv_id in conversations:
        del conversations[conv_id]
    return JSONResponse({"success": True})

@app.post("/api/conversations/{conv_id}/messages")
async def add_message(conv_id: str, request: Request):
    """向对话添加消息"""
    if conv_id not in conversations:
        raise HTTPException(status_code=404, detail="对话不存在")
    data = await request.json()
    msg = {
        "id": str(uuid.uuid4()),
        "role": data.get("role", "user"),
        "content": data.get("content", ""),
        "timestamp": datetime.datetime.now().isoformat()
    }
    conversations[conv_id]["messages"].append(msg)
    conversations[conv_id]["updated_at"] = datetime.datetime.now().isoformat()
    # 自动更新标题（用第一条用户消息）
    if data.get("role") == "user" and conversations[conv_id]["title"] == "新对话":
        conversations[conv_id]["title"] = data.get("content", "新对话")[:20]
    return JSONResponse(msg)

@app.put("/api/conversations/{conv_id}/title")
async def update_conversation_title(conv_id: str, request: Request):
    """更新对话标题"""
    if conv_id not in conversations:
        raise HTTPException(status_code=404, detail="对话不存在")
    data = await request.json()
    conversations[conv_id]["title"] = data.get("title", "")
    return JSONResponse({"success": True})

# ==================== 联网搜索 ====================

async def web_search(query: str, num_results: int = 5) -> str:
    """执行联网搜索"""
    try:
        from duckduckgo_search import DDGS
        results = []
        with DDGS() as ddgs:
            for r in ddgs.text(query, max_results=num_results):
                results.append(f"- {r['title']}: {r['href']}\n  {r['body']}")
        if results:
            return "\n".join(results)
        return "未找到相关结果"
    except Exception as e:
        return f"搜索失败: {str(e)}"

# ==================== Agent Framework Integration ====================

# Keywords for detecting tool needs
_CODE_KEYWORDS = [
    "代码", "python", "图表", "计算", "数据", "分析", "plot", "chart",
    "execute", "运行", "编程", "脚本", "函数", "算法", "统计",
    "可视化", "visualization", "dataframe", "pandas", "numpy",
]
_FILE_KEYWORDS = [
    "文件", "编辑", "读取", "写入", "创建文件", "修改文件",
    "file", "edit", "read", "write", "create file", "modify",
    "目录", "folder", "查看文件", "view file",
]


def _detect_tool_needs(message: str, options: dict = None) -> dict:
    """
    根据用户消息和选项，检测需要的工具集。
    返回: {"web_search": bool, "code_execution": bool, "file_edit": bool}
    """
    if options is None:
        options = {}
    msg_lower = message.lower()
    return {
        "web_search": options.get("web_search", False),
        "code_execution": options.get("code_execution", False) or any(
            kw in msg_lower for kw in _CODE_KEYWORDS
        ),
        "file_edit": any(kw in msg_lower for kw in _FILE_KEYWORDS),
    }


def _build_llm_for_webapp() -> "LLM":
    """
    根据 web_app 的 current_settings 构建 LLM 实例。
    优先使用 Agent 框架的配置，如果 web_settings 有自定义 API key 则覆盖。
    """
    try:
        # 尝试使用 Agent 框架的 LLM 配置
        llm = LLM(config_name="default")
        # 如果 web_settings 有自定义的 API key，创建新的 LLM 实例
        if current_settings.llm.get("api_key"):
            web_api_key = current_settings.llm["api_key"]
            web_base_url = current_settings.llm.get("base_url", "")
            web_model = current_settings.llm.get("model", "")
            # 如果 web_settings 的配置与 Agent 框架不同，需要覆盖
            if (web_api_key and web_api_key != llm.api_key) or \
               (web_base_url and web_base_url != llm.base_url):
                from app.config import LLMSettings
                custom_settings = LLMSettings(
                    model=web_model or llm.model,
                    base_url=web_base_url or llm.base_url,
                    api_key=web_api_key,
                    max_tokens=current_settings.llm.get("max_tokens", llm.max_tokens),
                    temperature=current_settings.llm.get("temperature", llm.temperature),
                    api_type=llm.api_type,
                    api_version=llm.api_version,
                )
                llm = LLM(llm_config=custom_settings)
        return llm
    except Exception as e:
        print(f"[Agent Framework] Failed to build LLM: {e}")
        raise


async def run_agent_task(
    message: str,
    conversation_id: str = None,
    options: dict = None,
    send_func: Callable = None,
):
    """
    使用 Agent 框架处理用户请求。

    Args:
        message: 用户消息
        conversation_id: 对话ID
        options: 选项 {"web_search": bool, "code_execution": bool}
        send_func: 异步发送函数 send_func(data: dict)
    """
    if options is None:
        options = {}

    async def send(data: dict):
        """安全的发送函数"""
        if send_func:
            try:
                await send_func(data)
            except Exception as e:
                print(f"[WebSocket] Send error: {e}")

    try:
        # 1. 检测需要的工具
        tool_needs = _detect_tool_needs(message, options)

        # 2. 构建工具集
        tools = [Terminate()]
        if tool_needs["web_search"]:
            tools.append(WebSearch())
        if tool_needs["code_execution"]:
            tools.append(PythonExecute())
        if tool_needs["file_edit"]:
            tools.append(StrReplaceEditor())

        tool_collection = ToolCollection(*tools)

        # 3. 构建 LLM 实例
        llm = _build_llm_for_webapp()

        # 4. 构建系统提示词
        system_prompt = DATA_SYSTEM_PROMPT.format(directory=str(Path.cwd()))

        # 4.5 RAG 知识库检索 - 如果检索库有文档，自动检索相关内容注入 prompt
        rag_context = ""
        if retriever.doc_vectors:
            rag_results = retriever.search(message, top_k=3, min_score=0.05)
            if rag_results:
                rag_context = "\n\n以下是知识库中检索到的相关参考资料：\n"
                for idx, r in enumerate(rag_results):
                    source_name = r.get("metadata", {}).get("name", "未知文档")
                    rag_context += f"\n--- 参考资料 {idx+1} (来源: {source_name}, 相关度: {r['score']}) ---\n"
                    rag_context += r["content"][:500] + "\n"
                rag_context += "\n请参考以上知识库资料回答用户问题。如果资料中没有相关信息，请基于你的知识回答，并说明信息不在知识库中。"
                await send({
                    "type": "thinking",
                    "title": "知识库检索",
                    "content": f"从知识库中检索到 {len(rag_results)} 条相关内容"
                })
                # 发送引用来源给前端显示
                await send({
                    "type": "rag_sources",
                    "sources": rag_results
                })

        # 将 RAG 上下文注入到用户消息中
        effective_message = message
        if rag_context:
            effective_message = message + rag_context

        # 5. 构建对话历史
        memory = Memory()
        if conversation_id and conversation_id in conversations:
            history = conversations[conversation_id]["messages"]
            for h_msg in history[-20:]:
                role = h_msg["role"]
                content = h_msg.get("content", "")
                if role == "user":
                    memory.add_message(Message.user_message(content))
                elif role == "assistant":
                    memory.add_message(Message.assistant_message(content))

        # 6. 发送初始状态
        tool_names = [t.name for t in tools]
        await send({
            "type": "step",
            "step": 0,
            "max_steps": 10,
            "thinking": f"正在初始化 Agent，可用工具: {', '.join(tool_names)}"
        })

        # 7. 创建 ToolCallAgent 实例
        agent = ToolCallAgent(
            name="web_agent",
            llm=llm,
            memory=memory,
            system_prompt=system_prompt,
            available_tools=tool_collection,
            max_steps=10,
        )

        # 8. 手动执行 Agent 步骤，以便拦截中间状态
        agent.update_memory("user", effective_message)

        final_response = ""
        max_steps = agent.max_steps

        async with agent.state_context(AgentState.RUNNING):
            while agent.current_step < max_steps and agent.state != AgentState.FINISHED:
                agent.current_step += 1
                step_num = agent.current_step

                # --- Think phase ---
                try:
                    should_act = await agent.think()
                except Exception as think_err:
                    await send({
                        "type": "thinking",
                        "title": f"Step {step_num}/{max_steps}",
                        "content": f"思考阶段出错: {str(think_err)[:200]}"
                    })
                    break

                # 获取思考内容（最后一条 assistant 消息）
                thinking_content = ""
                if agent.messages:
                    last_assistant = None
                    for msg in reversed(agent.messages):
                        if msg.role == "assistant":
                            last_assistant = msg
                            break
                    if last_assistant:
                        thinking_content = last_assistant.content or ""

                # 发送步骤信息
                await send({
                    "type": "step",
                    "step": step_num,
                    "max_steps": max_steps,
                    "thinking": thinking_content[:500] if thinking_content else f"Step {step_num}: 处理中..."
                })

                if not should_act:
                    # 没有工具调用，收集最终回复
                    if thinking_content:
                        final_response = thinking_content
                    break

                # --- Act phase: 执行工具调用 ---
                tool_calls = agent.tool_calls
                for tc in tool_calls:
                    tool_name = tc.function.name
                    tool_input_str = tc.function.arguments or "{}"
                    try:
                        tool_input = json.loads(tool_input_str)
                    except json.JSONDecodeError:
                        tool_input = {}

                    # 发送工具调用消息
                    await send({
                        "type": "tool_call",
                        "tool": tool_name,
                        "input": tool_input_str[:2000]
                    })

                # 执行工具
                try:
                    act_result = await agent.act()

                    # 发送工具结果
                    for tc in tool_calls:
                        tool_name = tc.function.name
                        # 从 act_result 中提取对应工具的结果
                        success = "Error" not in act_result and "error" not in act_result.lower()[:100]
                        await send({
                            "type": "tool_result",
                            "tool": tool_name,
                            "output": act_result[:3000] if act_result else "",
                            "success": success
                        })
                except Exception as act_err:
                    await send({
                        "type": "tool_result",
                        "tool": tool_name if tool_calls else "unknown",
                        "output": f"工具执行错误: {str(act_err)[:500]}",
                        "success": False
                    })

                # 检查是否卡住
                if agent.is_stuck():
                    agent.handle_stuck_state()

        # 9. 收集最终回复
        if not final_response:
            # 从 agent 的消息中获取最后的 assistant 回复
            for msg in reversed(agent.messages):
                if msg.role == "assistant" and msg.content and not msg.tool_calls:
                    final_response = msg.content
                    break

        if not final_response:
            final_response = "任务已完成，但没有生成文本回复。"

        # 10. 流式输出最终回复
        await send({"type": "stream_start"})
        chunk_size = 50
        for i in range(0, len(final_response), chunk_size):
            chunk = final_response[i:i + chunk_size]
            await send({"type": "stream_data", "content": chunk})
            await asyncio.sleep(0.03)
        await send({"type": "stream_end"})

        # 11. 保存对话历史
        if conversation_id and conversation_id in conversations:
            user_msg = {
                "id": str(uuid.uuid4()),
                "role": "user",
                "content": message,
                "timestamp": datetime.datetime.now().isoformat()
            }
            conversations[conversation_id]["messages"].append(user_msg)

            assistant_msg = {
                "id": str(uuid.uuid4()),
                "role": "assistant",
                "content": final_response,
                "timestamp": datetime.datetime.now().isoformat()
            }
            conversations[conversation_id]["messages"].append(assistant_msg)
            conversations[conversation_id]["updated_at"] = datetime.datetime.now().isoformat()
            if conversations[conversation_id]["title"] == "新对话":
                conversations[conversation_id]["title"] = message[:20]

        # 12. 清理 Agent 资源
        try:
            await agent.cleanup()
        except Exception:
            pass

    except Exception as e:
        error_detail = str(e)[:500]
        await send({"type": "error", "content": f"Agent 执行失败: {error_detail}"})
        print(f"[Agent Framework] Error in run_agent_task: {traceback.format_exc()}")
        raise  # Re-raise so caller can fallback


# ==================== Legacy Agent (Fallback) ====================

async def run_universal_agent(websocket: WebSocket, message: str, conversation_id: str = None, options: dict = None):
    """运行通用AI Agent，支持联网搜索和对话历史"""
    if options is None:
        options = {}

    try:
        await websocket.send_json({
            "type": "thinking",
            "title": "🤔 理解需求",
            "content": f"正在分析用户需求: {message[:80]}..."
        })

        use_code = False
        kb_related = False
        enable_web_search = options.get("web_search", False)

        if current_settings.knowledge_base.get("enabled"):
            kb_related = any(kw in message.lower() for kw in ["文档", "知识库", "knowledge", "search", "查找"])

        if any(kw in message.lower() for kw in ["代码", "python", "图表", "计算", "数据", "分析", "plot", "chart", "execute"]):
            use_code = True

        # 构建对话历史上下文
        context_prompt = ""
        if conversation_id and conversation_id in conversations:
            history = conversations[conversation_id]["messages"]
            if history:
                context_prompt = "\n\n以下是之前的对话历史：\n"
                for h_msg in history[-10:]:  # 最近10条消息作为上下文
                    role_label = "用户" if h_msg["role"] == "user" else "助手"
                    context_prompt += f"{role_label}: {h_msg['content']}\n"
                context_prompt += "\n请基于以上对话历史继续回答。\n"

        # 联网搜索
        search_context = ""
        if enable_web_search:
            await websocket.send_json({
                "type": "thinking",
                "title": "🌐 联网搜索",
                "content": f"正在搜索: {message[:50]}..."
            })
            search_context = await web_search(message)
            if search_context and not search_context.startswith("搜索失败") and search_context != "未找到相关结果":
                await websocket.send_json({
                    "type": "thinking",
                    "title": "🔍 搜索结果",
                    "content": f"找到相关资料，正在整合分析..."
                })

        if use_code:
            await websocket.send_json({
                "type": "thinking",
                "title": "🛠️ 工具选择",
                "content": "检测到代码/数据需求，准备生成Python代码"
            })

            code_prompt = f"""根据用户需求生成Python代码：
用户需求：{message}"""
            if search_context:
                code_prompt += f"\n\n参考资料：\n{search_context}"
            if context_prompt:
                code_prompt += context_prompt
            code_prompt += "\n请直接输出可执行的Python代码，不需要解释。如果需要图表，保存为PNG文件。"

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

            # 使用 RAG 检索器进行语义搜索
            rag_results = retriever.search(message, top_k=5, min_score=0.05)

            if rag_results:
                rag_context_str = ""
                for idx, r in enumerate(rag_results):
                    source_name = r.get("metadata", {}).get("name", "未知文档")
                    rag_context_str += f"\n--- 参考资料 {idx+1} (来源: {source_name}, 相关度: {r['score']}) ---\n"
                    rag_context_str += r["content"][:800] + "\n"

                await websocket.send_json({
                    "type": "thinking",
                    "title": "🔍 检索结果",
                    "content": f"找到 {len(rag_results)} 条相关内容，正在整合分析..."
                })

                kb_prompt = f"用户问题：{message}\n\n以下是知识库中检索到的相关参考资料：\n{rag_context_str}\n\n请基于以上参考资料回答用户问题。如果资料中没有相关信息，请基于你的知识回答，并说明信息不在知识库中。"
            else:
                kb_list = ", ".join([kb.name for kb in knowledge_bases.values()])
                await websocket.send_json({
                    "type": "thinking",
                    "title": "🔍 检索内容",
                    "content": f"未找到相关内容。可用知识库: {kb_list}"
                })
                kb_prompt = f"用户问题：{message}\n\n可用知识库：{kb_list}\n\n知识库中未找到直接相关的内容，请基于你的知识回答用户问题。"

            if context_prompt:
                kb_prompt += context_prompt
            if search_context:
                kb_prompt += f"\n\n网络搜索参考资料：\n{search_context}\n"
            response = await call_llm(kb_prompt, current_settings)

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

            full_prompt = message
            if context_prompt:
                full_prompt = context_prompt + "\n\n当前用户问题：" + message
            if search_context:
                full_prompt += f"\n\n网络搜索参考资料：\n{search_context}\n请参考以上搜索结果回答用户问题。"

            response = await call_llm(full_prompt, current_settings)

        # 保存用户消息到对话历史
        if conversation_id and conversation_id in conversations:
            user_msg = {
                "id": str(uuid.uuid4()),
                "role": "user",
                "content": message,
                "timestamp": datetime.datetime.now().isoformat()
            }
            conversations[conversation_id]["messages"].append(user_msg)
            conversations[conversation_id]["updated_at"] = datetime.datetime.now().isoformat()
            # 自动更新标题
            if conversations[conversation_id]["title"] == "新对话":
                conversations[conversation_id]["title"] = message[:20]

        # 流式输出
        await websocket.send_json({"type": "stream_start"})

        chunk_size = 50
        for i in range(0, len(response), chunk_size):
            chunk = response[i:i+chunk_size]
            await websocket.send_json({"type": "stream_data", "content": chunk})
            await asyncio.sleep(0.05)

        await websocket.send_json({"type": "stream_end"})

        # 保存助手回复到对话历史
        if conversation_id and conversation_id in conversations:
            assistant_msg = {
                "id": str(uuid.uuid4()),
                "role": "assistant",
                "content": response,
                "timestamp": datetime.datetime.now().isoformat()
            }
            conversations[conversation_id]["messages"].append(assistant_msg)
            conversations[conversation_id]["updated_at"] = datetime.datetime.now().isoformat()

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
            msg_type = data.get("type", "chat")
            if msg_type == "chat":
                content = data.get("content", "")
                conversation_id = data.get("conversation_id")
                options = data.get("options", {})
                # 如果指定了 conversation_id 但对话不存在，自动创建
                if conversation_id and conversation_id not in conversations:
                    conv = {
                        "id": conversation_id,
                        "title": "新对话",
                        "messages": [],
                        "created_at": datetime.datetime.now().isoformat(),
                        "updated_at": datetime.datetime.now().isoformat()
                    }
                    conversations[conversation_id] = conv

                # 优先使用 Agent 框架，失败时回退到旧的 run_universal_agent
                if AGENT_FRAMEWORK_AVAILABLE:
                    try:
                        await run_agent_task(
                            message=content,
                            conversation_id=conversation_id,
                            options=options,
                            send_func=websocket.send_json,
                        )
                    except Exception as agent_err:
                        print(f"[WebSocket] Agent framework failed, falling back: {agent_err}")
                        try:
                            await websocket.send_json({
                                "type": "thinking",
                                "title": "切换模式",
                                "content": "Agent 框架执行异常，切换到备用模式..."
                            })
                        except Exception:
                            pass
                        await run_universal_agent(websocket, content, conversation_id=conversation_id, options=options)
                else:
                    await run_universal_agent(websocket, content, conversation_id=conversation_id, options=options)
            else:
                # 兼容旧格式：直接将 data 当作消息内容
                message = data.get("content", str(data))
                if AGENT_FRAMEWORK_AVAILABLE:
                    try:
                        await run_agent_task(
                            message=message,
                            send_func=websocket.send_json,
                        )
                    except Exception:
                        await run_universal_agent(websocket, message)
                else:
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
