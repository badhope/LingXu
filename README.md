<div align="center">

# 灵墟 · LingXu

**天地玄黄 · 宇宙洪荒**

**失落修行文明档案馆**

*Archive of a Lost Cultivation Civilization*

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Astro](https://img.shields.io/badge/Astro-5.x-FF5D01?logo=astro)](https://astro.build)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-06B6D4?logo=tailwindcss)](https://tailwindcss.com)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Deployed-success?logo=github)](https://pages.github.com)

[在线预览](https://lingxu.xn--jbtt24bux6a.com) · [English](README.en.md) · [更新日志](CHANGELOG.md) · [贡献指南](CONTRIBUTING.md)

</div>

---

## 📖 项目简介

灵墟是一个沉浸式的中国玄学文化数字档案，探索修行文明的兴衰变迁。项目采用「天地玄黄，宇宙洪荒」八字框架，将修行文明的知识体系归纳为八大模块。

### 核心问题

> 一个拥有精密精神技术的古老文明，为何只在现代留下零散的痕迹？

我们不是要证明修行是真的，而是要理解为什么这么多古人会相信修行是真的。

### ✨ 特性

- 🎨 **沉浸式设计** - 精心设计的视觉效果与交互体验
- 📚 **八大模块** - 天时、地理、玄学、历史、空间、时间、洪荒、失落
- 🌙 **暗色主题** - 符合修行文化的神秘氛围
- ⚡ **极速加载** - 静态生成，首屏秒开
- 📱 **响应式设计** - 完美适配各种设备
- 🔍 **全文搜索** - 快速定位感兴趣的内容
- 💾 **本地存储** - 收藏、历史记录本地持久化

---

## 🗺️ 内容架构

```
入口 (Portal)
    │
    ▼
首页 (Homepage) ─ 八大模块导航
    │
    ├── 天 (Tiān) ─ 天时
    │   ├── 黄历吉凶
    │   ├── 八字排盘
    │   ├── 星辰运行
    │   ├── 节气养生
    │   └── 每日吉言
    │
    ├── 地 (Dì) ─ 地理
    │   ├── 罗盘定向
    │   ├── 洞天福地
    │   ├── 风水堪舆
    │   ├── 地理志
    │   └── 方位吉凶
    │
    ├── 玄 (Xuán) ─ 玄学
    │   ├── 易经占卜
    │   ├── 命理推演
    │   ├── 符箓识别
    │   ├── 阵法布局
    │   └── 玄学典籍
    │
    ├── 黄 (Huáng) ─ 历史
    │   ├── 历史卷轴
    │   ├── 纪年转换
    │   ├── 人物谱
    │   ├── 大事件
    │   └── 秘辛档案
    │
    ├── 宇 (Yǔ) ─ 空间
    │   ├── 世界地图
    │   ├── 空间层次
    │   ├── 诸天万界
    │   └── 方位世界
    │
    ├── 宙 (Zhòu) ─ 时间
    │   ├── 时间线
    │   ├── 纪元
    │   ├── 轮回因果
    │   └── 历法系统
    │
    ├── 洪 (Hóng) ─ 洪荒
    │   ├── 神兽录
    │   ├── 凶兽录
    │   ├── 神谱
    │   ├── 吉祥物
    │   └── 本命神兽
    │
    └── 荒 (Huāng) ─ 失落
        ├── 功法典籍
        ├── 秘术
        ├── 法器
        ├── 丹药
        ├── 符咒
        └── 遗迹
```

---

## 🚀 快速开始

### 环境要求

- Node.js >= 18.0.0
- npm >= 9.0.0 或 pnpm >= 8.0.0

### 安装

```bash
# 克隆仓库
git clone https://github.com/badhope/LingXu.git

# 进入目录
cd LingXu

# 安装依赖
npm install
```

### 开发

```bash
# 启动开发服务器
npm run dev

# 访问 http://localhost:4321
```

### 构建

```bash
# 生产构建
npm run build

# 预览构建结果
npm run preview
```

### 代码检查

```bash
# TypeScript 类型检查
npm run typecheck

# ESLint 检查
npm run lint

# 格式化代码
npm run format
```

---

## 🛠️ 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| [Astro](https://astro.build) | 5.x | 静态站点框架 |
| [TypeScript](https://www.typescriptlang.org/) | 5.x | 类型安全 |
| [Tailwind CSS](https://tailwindcss.com/) | 4.x | 样式系统 |
| [Zustand](https://zustand-demo.pmnd.rs/) | 5.x | 状态管理 |
| [Vite](https://vitejs.dev/) | 6.x | 构建工具 |

---

## 📁 项目结构

```
LingXu/
├── .github/                    # GitHub 配置
│   ├── workflows/              # GitHub Actions
│   ├── ISSUE_TEMPLATE/         # Issue 模板
│   └── PULL_REQUEST_TEMPLATE/  # PR 模板
├── docs/                       # 项目文档
│   ├── architecture.md         # 架构设计
│   ├── content-model.md        # 内容模型
│   ├── motion-principles.md    # 动效原则
│   └── ...
├── public/                     # 静态资源
│   ├── favicon.svg
│   └── sitemap.xml
├── src/
│   ├── components/             # 组件
│   │   ├── interactive/        # 交互组件
│   │   ├── layout/             # 布局组件
│   │   ├── portal/             # 传送门组件
│   │   ├── splash/             # 启动画面
│   │   ├── ui/                 # UI 组件
│   │   └── widgets/            # 小部件
│   ├── data/                   # 数据配置
│   ├── layouts/                # 页面布局
│   ├── lib/                    # 工具库
│   ├── pages/                  # 页面路由
│   ├── stores/                 # 状态存储
│   └── styles/                 # 全局样式
├── astro.config.mjs            # Astro 配置
├── tailwind.config.mjs         # Tailwind 配置
├── tsconfig.json               # TypeScript 配置
├── LICENSE                     # 许可证
├── CHANGELOG.md                # 更新日志
├── CONTRIBUTING.md             # 贡献指南
├── CODE_OF_CONDUCT.md          # 行为准则
├── SECURITY.md                 # 安全政策
├── README.md                   # 中文文档
└── README.en.md                # 英文文档
```

---

## 🎨 设计原则

### 视觉风格

- **色彩**：以金色（#c9a227）为主色调，象征修行文明的神秘与庄严
- **字体**：使用「思源宋体」和「站酷小薇」等中文衬线字体
- **动效**：粒子效果、太极旋转、传送门动画等沉浸式体验

### 交互设计

- **仪式感入口**：通过传送门动画营造进入档案馆的仪式感
- **模块化导航**：八字框架清晰呈现内容结构
- **渐进式探索**：从概览到详情，层层深入

---

## 📊 项目统计

![GitHub repo size](https://img.shields.io/github/repo-size/badhope/LingXu)
![GitHub commit activity](https://img.shields.io/github/commit-activity/t/badhope/LingXu)
![GitHub last commit](https://img.shields.io/github/last-commit/badhope/LingXu)
![GitHub stars](https://img.shields.io/github/stars/badhope/LingXu?style=social)

---

## 🤝 参与贡献

我们欢迎所有形式的贡献！

### 贡献方式

- 🐛 [报告 Bug](https://github.com/badhope/LingXu/issues/new?template=bug_report.md)
- 💡 [提出新功能](https://github.com/badhope/LingXu/issues/new?template=feature_request.md)
- 📝 改进文档
- 🔧 提交代码

### 贡献流程

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'feat: 添加某个功能'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

详细指南请参阅 [贡献指南](CONTRIBUTING.md)。

---

## 📜 许可证

本项目基于 [MIT License](LICENSE) 开源。

---

## 🙏 致谢

### 内容来源

- 道教、佛教经典及相关注释
- 《黄帝内经》《山海经》《易经》等先秦两汉典籍
- 历代志怪小说、仙侠传记
- 近现代学者的研究成果

### 免责声明

> 灵墟收录的内容仅供文化研究与欣赏之用。我们不提供任何形式的算命、占卜、法事服务，也不鼓励任何形式的盲目修炼。文中涉及的宗教内容，均作为文化遗产呈现，不代表本站立场。

---

## 📮 联系方式

- **网站**：[https://lingxu.xn--jbtt24bux6a.com](https://lingxu.xn--jbtt24bux6a.com)
- **Issues**：[GitHub Issues](https://github.com/badhope/LingXu/issues)

---

<div align="center">

**愿见者得度，闻者觉悟**

*May those who see find liberation, may those who hear attain enlightenment.*

[⬆ 返回顶部](#灵墟--lingxu)

</div>
