<div align="center">

# ⚯ 靈墟

**末法时代 · 失落修行文明档案馆**

[![Netlify Status](https://img.shields.io/badge/Netlify-已部署-00C7B7?style=for-the-badge&logo=netlify)](https://lingxu.netlify.app)
[![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-在线演示-2ea44f?style=for-the-badge&logo=github)](https://yourname.github.io/LingXu)
[![Next.js](https://img.shields.io/badge/Next.js-15-000?style=for-the-badge&logo=nextdotjs)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-严格模式-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/许可-非商用开源-E94D5F?style=for-the-badge&logo=opensourceinitiative)](LICENSE)
[![Build Status](https://img.shields.io/badge/构建-111页全绿-success?style=for-the-badge&logo=githubactions)]()

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
| 🧬 **修真系统** | ✅ | 12 | 炼气筑基、炼丹画符炼器阵 |
| 🔧 **工具箱** | ✅ | 12 | 起卦排盘工具集合 |
| 📚 **藏经阁** | ✅ | 8 | 道家典籍全文检索 |
| 🗺️ **全站地图** | ✅ | 1 | 完整导航 |
| --- | --- | **111页** | --- |

### 🎨 设计特色

- ✅ **深空蓝金主题** - 神秘古雅的修真氛围
- ✅ **Framer Motion** - 丝滑流畅的动画效果
- ✅ **无黑屏 SSR** - 解决初始 opacity:0 渲染问题
- ✅ **响应式设计** - 完美适配桌面/平板/手机
- ✅ **PWA 支持** - 可安装的离线应用
- ✅ **性能优化** - Canvas 自适应降帧、按需渲染
- ✅ **渐进增强** - JS不加载也能正常显示内容

### 🛠️ 技术栈

| 层面 | 技术选型 |
|------|----------|
| **框架** | Next.js 15 Pages Router |
| **语言** | TypeScript 严格模式 |
| **样式** | Tailwind CSS 4 + SCSS Modules |
| **动画** | Framer Motion |
| **3D/特效** | Three.js + React Three Fiber |
| **状态** | Zustand |
| **部署** | Netlify / GitHub Pages 双支持 |
| **CI/CD** | 零配置自动构建 |
| **质量** | ESLint + 类型检查 |

---

## 🚀 快速开始

### 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 访问 http://localhost:8081
```

### 构建生产版本

```bash
# 构建标准静态站点 (Netlify 根路径)
npm run build

# 构建 GitHub Pages (子路径)
NEXT_PUBLIC_BASE_PATH=/LingXu npm run build
```

产物位于 `out/` 目录，可直接部署到任何静态托管。

---

## 🌐 一键部署

### Netlify (推荐)

**零配置自动部署：**

1. Fork 本仓库
2. 打开 https://app.netlify.com
3. 导入仓库，点击 Deploy
4. 完成！

配置已包含在 `netlify.toml` 中：
- ✅ SPA 路由自动重定向
- ✅ 永久缓存策略
- ✅ 安全响应头
- ✅ Node.js 20 环境

### GitHub Pages

设置环境变量 `NEXT_PUBLIC_BASE_PATH=/LingXu` 即可。

---

## 📋 项目结构

```
LingXu/
├── src/
│   ├── components/       # 15+ 通用组件
│   ├── pages/            # 111 页面路由
│   ├── styles/           # 设计令牌 + 全局样式
│   ├── lib/              # 工具函数库
│   ├── hooks/            # React 自定义 Hooks
│   └── context/          # 状态管理
├── public/               # 静态资源
├── netlify.toml          # Netlify 部署配置
├── _redirects            # SPA 路由规则
├── .htaccess             # Apache 虚拟主机支持
└── next.config.js        # 构建配置
```

---

## 🔧 部署文档

| 文档 | 说明 |
|------|------|
| [DEPLOY.md](DEPLOY.md) | 全平台部署详细指南 |
| [CHANGELOG.md](CHANGELOG.md) | 版本更新历史 |
| [CONTRIBUTING.md](CONTRIBUTING.md) | 贡献指南 |

---

## 📄 开源协议

本项目仅供学习交流使用，禁止商业用途。

---

<div align="center">

**修行路上，与君共勉** ✨

</div>
