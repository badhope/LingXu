# DATA-AI

DATA-AI - 智能化数据处理和分析平台，支持多种 AI 工具和代理

## 功能特性

### 🤖 AI 智能体
- 智能意图识别系统（基于 NLP.js）
- 多步思考推理能力
- 记忆和上下文理解
- 知识库检索和学习

### 📊 数据分析和可视化
- 图表生成（Chart.js）
- 流程图设计（Mermaid）
- 数据报告生成
- 实时数据展示

### 🌐 网页浏览和自动化
- 网页抓取和分析
- 浏览器自动化
- 网络搜索集成

### 🔧 工具集成
- MCP 协议支持
- 技能系统（Skills）
- 自定义工具开发
- API 连接器

### 📝 文档处理
- 会议纪要生成
- 文献摘要提取
- 多语言翻译润色
- PPT 演示文稿生成

### 🎨 用户界面
- 现代化设计风格
- 实时日志系统
- 语音输入支持
- 响应式布局

## 安装

### 使用 pip

```bash
pip install -r requirements.txt
```

### 配置

编辑配置文件 `config/web_config.json`：

```json
{
  "llm": {
    "provider": "aliyun",
    "api_key": "your-api-key",
    "model": "qwen-plus-latest",
    "base_url": "https://dashscope.aliyuncs.com/compatible-mode/v1"
  }
}
```

## 快速开始

### 开发模式

```bash
python -m uvicorn web_app:app --host 0.0.0.0 --port 8001 --reload
```

### 生产模式

```bash
python -m uvicorn web_app:app --host 0.0.0.0 --port 8001
```

访问 http://localhost:8001 查看应用。

## 项目结构

```
DATA-AI/
├── app/              # 应用核心代码
│   ├── agent/        # AI 智能体模块
│   ├── tool/         # 工具模块
│   └── utils/        # 工具函数
├── config/           # 配置文件
├── data/             # 数据存储
│   ├── knowledge_base/ # 知识库
│   └── skills/       # 技能配置
├── protocol/         # 协议实现
├── static/           # 前端静态资源
│   ├── css/          # 样式文件
│   ├── js/           # JavaScript 代码
│   └── libs/         # 第三方库
├── templates/        # HTML 模板
├── tests/            # 测试代码
├── web_app.py        # FastAPI 主应用
└── requirements.txt  # 依赖列表
```

## API 文档

启动应用后访问 `/docs` 查看 Swagger API 文档。

## 许可证

MIT License
