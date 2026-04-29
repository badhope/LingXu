<div align="center">

# ⚯ 靈墟

**末法时代 · 失落修行文明档案馆**

[![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-在线演示-2ea44f?style=for-the-badge&logo=github)](https://yourname.github.io/LingXu)
[![Next.js](https://img.shields.io/badge/Next.js-14-000?style=for-the-badge&logo=nextdotjs)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-严格模式-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/许可-非商用开源-E94D5F?style=for-the-badge&logo=opensourceinitiative)](LICENSE)
[![Build Status](https://img.shields.io/badge/构建-98页全绿-success?style=for-the-badge&logo=githubactions)]()

![灵墟封面](https://via.placeholder.com/800x400/0f172a/fbbf24?text=灵墟档案馆+-+探索失落的修行世界)

</div>

---

## 📖 项目简介

**灵墟**是一个以中华传统文化为核心的修真主题档案馆，收录了从玄学易理到天文地理，从八字风水到历史星宿等诸多领域的知识，打造一个沉浸式的修仙主题知识平台。

> 道生一，一生二，二生三，三生万物。
> —— 道德经

---

## ✨ 核心特性

### 🎯 功能模块

| 模块 | 状态 | 页面数 | 简介 |
|------|------|--------|------|
| 🌌 **天字卷** | ✅ | 12 | 天文历法、星宿星象、八字命理 |
| 🌍 **地字卷** | ✅ | 12 | 风水堪舆、地理龙脉、形煞化解 |
| 📜 **玄字卷** | ✅ | 12 | 易经八卦、六爻占卜、奇门遁甲 |
| 🏔️ **人字卷** | ✅ | 12 | 人物传记、门派传承、功法秘籍 |
| 🗡️ **武字卷** | ✅ | 10 | 兵器谱、丹药、符箓 |
| 🧬 **修真系统** | ✅ | 8 | 炼气筑基、炼丹画符炼器 |
| 🔧 **工具箱** | ✅ | 12 | 起卦排盘工具集合 |
| 📚 **藏经阁** | ✅ | 8 | 道家典籍全文检索 |
| 🗺️ **全站地图** | ✅ | 1 | 98页完整导航 |
| --- | --- | **98页** | --- |

### 🎨 设计特色

- ✅ **深空蓝金主题** - 神秘古雅的修真氛围
- ✅ **Framer Motion** - 丝滑流畅的动画效果
- ✅ **响应式设计** - 完美适配桌面/平板/手机
- ✅ **PWA 支持** - 可安装的离线应用
- ✅ **手势交互** - 移动端下拉刷新、滑动导航
- ✅ **性能优化** - Canvas 自适应降帧、按需渲染

### 🛠️ 技术栈

| 层面 | 技术选型 |
|------|----------|
| **框架** | Next.js 14 App Router |
| **语言** | TypeScript 严格模式 |
| **样式** | SCSS Modules + CSS Variables |
| **动画** | Framer Motion |
| **3D/特效** | Three.js + Canvas |
| **部署** | GitHub Pages 静态导出 |
| **CI/CD** | GitHub Actions 自动部署 |
| **质量** | ESLint + Prettier |

---

## 🚀 快速开始

### 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 访问 http://localhost:3000
```

### 构建部署

```bash
# 使用专属 Agent 工具
node agent/quality-check.mjs    # 质量检查
node agent/build-deploy.mjs      # 构建准备

# 或直接构建
npm run build
```

👉 详细部署指南：[DEPLOY.md](DEPLOY.md)

---

## 🤖 Agent 工具集

项目内置专属 AI Agent 开发工具：

```bash
agent/
├── quality-check.mjs      # 代码质量全检查
├── build-deploy.mjs       # 构建部署自动化
├── prompt.md              # AI 系统提示词
└── README.md              # 使用指南
```

```bash
# 提交代码前必跑
node agent/quality-check.mjs
```

---

## ⚖️ 许可协议

### 🔒 重要声明

**本项目采用「非商用开源协议」**

### ✅ 您可以

- 个人学习、研究、参考
- 非商业用途的修改和分发
- 保留版权声明的二次开发

### ❌ 您不可以

- **未经授权的任何商业使用**（包括付费、广告、企业内部使用等）
- 移除或修改本版权声明
- 声称此项目为您的原创作品
- 用于违法违规用途

### 💼 商业合作

如需商业授权，请通过以下方式联系：
1. 提交 Issue 标注【商业授权】
2. 详细说明使用场景

**违反协议者将承担相应法律责任。**

---

## 📊 项目数据

```
📄 页面总数:        98 个
🧩 组件总数:        37 个
🪝 自定义 Hooks:    27 个
🎯 代码行数:        35,000+
✅ TypeScript 覆盖:  100%
📦 构建大小:        ~280 KB
⚡ LCP 性能:        < 1.5s
```

---

## 🎯 路线图

- [x] ✅ v1.0 - 98页完整档案馆
- [ ] v1.1 - 用户系统 + 数据持久化
- [ ] v1.2 - 多人修真社交系统
- [ ] v2.0 - 微信小程序版
- [ ] v2.1 - AI 智能解卦

---

## ⭐ Star 历史

如果这个项目对你有帮助，欢迎给个 Star 支持！

---

## 📞 联系方式

- 📌 GitHub Issues: [提交问题](https://github.com/yourname/LingXu/issues)
- 💡 功能建议: 欢迎提交 PR 或 Issue

---

<div align="center">

**愿尔等在此间，寻得真我，证得大道。**

—— 灵墟阁主 手札 ⚯

</div>
