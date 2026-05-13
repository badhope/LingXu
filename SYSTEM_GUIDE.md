# DataAgent - 万能智能助手 完整说明文档

## 🚀 概述

DataAgent 是一个完全系统化、规范化的AI智能助手，基于OpenManus项目重构，参照Dify/Coze等优秀项目的设计规范。

## 📁 系统架构

### 核心模块

1. **知识库系统 (Knowledge Base)**
   - 支持多知识库管理
   - 支持多种文件格式上传
   - 内置数据清洗规则
   - 规范Schema定义

2. **技能系统 (Skill System)**
   - 自定义技能创建
   - 规范的Manifest格式
   - 参数化配置
   - 内置技能库

3. **MCP工具服务 (Model Context Protocol)**
   - 完整MCP协议支持
   - 多种连接类型
   - 工具自动发现

4. **智能对话系统**
   - 万能智能体
   - 代码执行与沙箱
   - 图表生成
   - 思维链可视化

## 📐 规范文档

### 1. 知识库系统规范 (`config/schema/knowledge_base_schema.json`)

定义了知识库的完整数据结构：

```json
{
  "KnowledgeBase": {
    "id": "string",
    "name": "string",
    "description": "string",
    "embedding_model": "string",
    "indexing_technique": "high_quality|economy|semantic",
    "permission": "only_me|all_team_members|partial_members"
  },
  "Document": {
    "id": "string",
    "knowledge_base_id": "string",
    "name": "string",
    "data_source_type": "upload_file|web_url|notion|website|custom_text",
    "status": "queuing|indexing|available|error|paused"
  }
}
```

**支持的文件格式**：
- 文本：.txt, .md, .markdown, .rtf
- 文档：.pdf, .doc, .docx, .odt
- 表格：.csv, .xlsx, .xls
- 代码：.py, .js, .java, .cpp等

### 2. 技能系统规范 (`config/schema/skill_schema.json`)

完整的技能Manifest规范：

```json
{
  "manifest_version": "1.0",
  "skill": {
    "id": "code_reviewer",
    "name": "代码审查专家",
    "description": "智能代码审查",
    "version": "1.0.0",
    "category": "code_generation",
    "type": "custom"
  },
  "parameters": [
    {
      "name": "code",
      "type": "string",
      "description": "待审查代码",
      "required": true
    }
  ],
  "prompts": {
    "system_prompt": "系统提示词",
    "user_prompt_template": "用户提示词模板 {{variable}}"
  }
}
```

**技能分类**：
- data_analysis - 数据分析
- code_generation - 代码生成
- document_processing - 文档处理
- web_scraping - 网页抓取
- api_integration - API集成
- automation - 自动化

### 3. MCP服务规范 (`config/schema/mcp_schema.json`)

完整MCP协议实现：

```json
{
  "MCPServerConfig": {
    "id": "string",
    "name": "string",
    "type": "stdio|sse|http",
    "command": "string",
    "args": ["string"],
    "url": "string",
    "env": {}
  }
}
```

**内置MCP服务器**：
- files - 文件系统
- github - GitHub
- brave_search - 网络搜索
- playwright - 浏览器自动化
- 以及更多...

## 🔧 API接口

### 设置管理

- `GET /api/settings` - 获取设置
- `POST /api/settings` - 保存设置

### 知识库管理

- `GET /api/knowledge-bases` - 列表知识库
- `POST /api/knowledge-bases` - 创建知识库
- `GET /api/knowledge-bases/{id}` - 获取知识库
- `POST /api/knowledge-bases/{id}/documents` - 上传文档
- `GET /api/knowledge-bases/{id}/documents` - 列出文档

### 技能管理

- `GET /api/skills` - 列表技能
- `POST /api/skills` - 创建技能
- `GET /api/skills/{id}` - 获取技能
- `POST /api/skills/{id}/use` - 使用技能

### MCP服务管理

- `GET /api/mcp/servers` - 列表服务器
- `POST /api/mcp/servers` - 添加服务器

## 🎯 使用指南

### 快速开始

1. **启动服务**
   ```bash
   cd /workspace/OpenManus
   python web_app.py
   ```

2. **配置模型**
   - 打开 http://localhost:8000/
   - 点击左侧"设置"
   - 选择模型提供商
   - 输入API Key
   - 保存设置

3. **开始对话**
   - 在输入框输入问题
   - 支持普通对话、代码生成、数据分析等

### 知识库使用

1. 创建知识库
   - 点击"知识库"
   - 切换到"创建"标签
   - 填写名称和描述

2. 管理文档
   - 选择知识库
   - 上传文档
   - 配置清洗规则

3. 提问
   - 在对话中提问
   - 系统自动检索相关内容

### 技能系统使用

1. 查看内置技能
   - 点击"技能系统"
   - 浏览可用技能

2. 创建自定义技能
   - 切换到"创建"标签
   - 填写技能信息
   - 配置参数和提示词

3. 使用技能
   - 在对话中指定技能
   - 或通过API调用

### MCP工具使用

1. 配置MCP服务器
   - 点击"MCP工具"
   - 添加新服务器
   - 配置连接信息

2. 启用工具
   - 开启需要的服务器
   - 工具自动加载

## 🛠️ 开发者指南

### 目录结构

```
/workspace/OpenManus/
├── web_app.py              # Web主程序
├── config/
│   ├── web_config.json     # 运行时配置
│   ├── mcp.json            # MCP配置
│   └── schema/             # 规范定义
│       ├── knowledge_base_schema.json
│       ├── skill_schema.json
│       └── mcp_schema.json
├── data/                   # 数据目录
│   ├── knowledge_bases/
│   └── skills/
└── app/                    # OpenManus核心代码
```

### 配置持久化

- 设置保存在 `config/web_config.json`
- 知识库元数据保存在 `data/knowledge_bases/`
- 技能保存在 `data/skills/`
- MCP配置在 `config/mcp.json`

## 📊 功能特点

### 知识库开启与关闭的区别

| 特性 | 开启知识库 | 关闭知识库 |
|------|-----------|-----------|
| 文档存储 | ✅ 支持 | ❌ 不支持 |
| 语义检索 | ✅ 自动进行 | ❌ 不进行 |
| 上下文来源 | 用户输入 + 知识库 | 仅用户输入 |
| 回答准确度 | ⬆️ 更高 | 普通 |
| 响应速度 | 稍慢（需检索） | 更快 |

### 数据清洗规则

系统内置多种预处理规则：

1. **移除多余空白** - 清理多余空格和换行
2. **移除URL/邮箱** - 清除网络链接
3. **停用词过滤** - 移除无意义词汇
4. **标准化处理** - 统一文本格式

## 🔮 未来规划

- [ ] 向量数据库集成（ChromaDB / Milvus）
- [ ] 完整文件上传与解析
- [ ] 知识库向量化索引
- [ ] MCP服务器实际连接
- [ ] 更多内置技能
- [ ] 团队协作功能
- [ ] 工作流编排
- [ ] API集成市场

## 📞 技术支持

- 查看左侧"使用说明"获取帮助
- 参阅 `config/schema/` 了解完整规范
- 参考OpenManus原有代码库

---

**DataAgent** - 构建您的专属智能助手！
