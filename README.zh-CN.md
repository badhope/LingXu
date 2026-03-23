# 灵墟 (LingXu)

**天地玄黄 · 宇宙洪荒 · 失落修行文明档案馆**
*The Great Cosmos · Primordial Chaos · Archive of a Lost Cultivation Civilization*

[![构建状态](https://img.shields.io/badge/build-dynamic-blue)](https://github.com/badhope/LingXu)
[![版本](https://img.shields.io/badge/version-v2.0-gold)](CHANGELOG.md)
[![框架](https://img.shields.io/badge/framework-Astro-purple)](https://astro.build)

---

## 快速入门

### 灵墟是什么？

灵墟是一个数字档案馆，探索中国历史上的修行文明——那个通过精神修炼可以获得非凡能力的世界。采用「天地玄黄，宇宙洪荒」八字框架，将修行文明的知识体系归纳为八大模块。

**核心问题**：一个拥有精密精神技术的古老文明，为何只在现代留下零散的痕迹？

### 如何浏览

```
入口
    ↓
叩启封印 (Portal) — 仪式感入口体验
    ↓
首页 (Homepage) — 八大模块导航
    ↓
八大板块：
    ├── 天 /tian — 天时、星辰、黄历节气
    ├── 地 /di — 地理、风水、洞天福地
    ├── 玄 /xuan — 玄学、易经、符箓阵法
    ├── 黄 /huang — 历史、秘辛、纪年档案
    ├── 宇 /yu — 空间、界域、万界结构
    ├── 宙 /zhou — 时间、轮回、因果纪年
    ├── 洪 /hong — 洪荒、神兽、异兽图鉴
    └── 荒 /huang-lost — 失落文明、失传秘术
```

### 核心框架

| 模块 | 主题 | 说明 |
|------|------|------|
| **天** | 天时 | 天道运行，星辰变化，灵气潮汐 |
| **地** | 地理 | 山川风水，龙脉洞天，福地选址 |
| **玄** | 玄学 | 易经八卦，符箓符咒，阵法布局 |
| **黄** | 历史 | 千古兴亡，秘辛档案，纪年转换 |
| **宇** | 空间 | 万界结构，仙界冥界，空间层次 |
| **宙** | 时间 | 轮回因果，六道纪年，时间线 |
| **洪** | 洪荒 | 神兽异兽，图腾信仰，祥瑞凶兆 |
| **荒** | 失落 | 失传秘术，远古遗迹，文明残痕 |

---

## 技术文档

### 技术栈

| 技术 | 用途 |
|------|------|
| Astro | 静态站点框架 |
| TypeScript | 类型安全 |
| Tailwind CSS | 样式系统 |
| GitHub Pages | 部署 |

### 目录结构

```
LingXu/
├── src/
│   ├── components/          # 组件
│   │   ├── interactive/    # 动效与大气效果
│   │   ├── layout/         # 布局组件
│   │   ├── portal/         # 入口大门
│   │   └── ui/             # UI组件
│   ├── data/
│   │   ├── modules.ts      # 八大模块配置
│   │   └── navigation.ts   # 导航配置
│   ├── layouts/             # 布局模板
│   ├── lib/
│   │   └── constants.ts    # 站点配置
│   ├── pages/              # 页面
│   │   ├── tian/           # 天时模块
│   │   ├── di/             # 地理模块
│   │   ├── xuan/           # 玄学模块
│   │   ├── huang/          # 历史模块
│   │   ├── yu/             # 空间模块
│   │   ├── zhou/           # 时间模块
│   │   ├── hong/           # 洪荒模块
│   │   └── huang-lost/     # 失落模块
│   └── styles/             # 样式文件
├── public/                 # 静态资源
├── docs/                   # 开发文档
└── astro.config.mjs        # Astro配置
```

### 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 生产构建
npm run build
```

---

## 开发指南

### 模块系统

每个模块（如 `tian`、`di` 等）包含：
- `index.astro` — 模块首页
- 子页面 — 模块内的具体功能页面

模块配置位于 `src/data/modules.ts`，定义模块名称、颜色、描述和子模块信息。

### 页面开发

新页面应放在对应模块目录下，使用 `ModuleLayout` 作为基础布局：

```astro
---
import ModuleLayout from '../../layouts/ModuleLayout.astro';
---

<ModuleLayout moduleId="模块ID" title="页面标题">
  <!-- 页面内容 -->
</ModuleLayout>
```

### 样式规范

- 使用 Tailwind CSS 工具类
- 遵循现有色彩系统（通过 CSS 变量）
- 保持深色主题一致性

---

## 免责声明

灵墟收录的内容仅供文化研究与欣赏之用。我们不提供任何形式的算命、占卜、法事服务，也不鼓励任何形式的盲目修炼。文中涉及的宗教内容，均作为文化遗产呈现，不代表本站立场。
