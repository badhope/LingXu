# 灵墟 · LingXu
## 开发者完全指南 | Complete Developer Guide

> **版本**: 2.0.0+ | **最后更新**: 2026-03-26

---

## 📑 目录

1. [项目概述](#项目概述)
2. [技术架构](#技术架构)
3. [快速开始](#快速开始)
4. [项目结构详解](#项目结构详解)
5. [核心系统](#核心系统)
6. [组件开发](#组件开发)
7. [页面开发](#页面开发)
8. [样式系统](#样式系统)
9. [动画系统](#动画系统)
10. [状态管理](#状态管理)
11. [国际化](#国际化)
12. [部署流程](#部署流程)
13. [常见问题](#常见问题)

---

## 1. 项目概述

### 1.1 项目定位

灵墟是一个沉浸式的中国玄学文化数字档案网站，以「天地玄黄，宇宙洪荒」八字框架组织内容，探索失落修行文明的兴衰变迁。

### 1.2 设计理念

- **文化符号级别**：艺术设计、人机交互、视觉效果达到顶尖水准
- **仪式感入口**：通过传送门动画营造进入档案馆的沉浸感
- **模块化导航**：八字框架清晰呈现内容结构
- **渐进式探索**：从概览到详情，层层深入

### 1.3 核心模块

| 模块 | 字符 | 含义 | 主题色 |
|------|------|------|--------|
| 天 (Tiān) | 天时 | 天道运行、星辰变化 | #f0c040 |
| 地 (Dì) | 地理 | 山川地理、风水堪舆 | #40b040 |
| 玄 (Xuán) | 玄学 | 易经八卦、符箓命理 | #8040f0 |
| 黄 (Huáng) | 历史 | 千古兴亡、秘辛档案 | #c08040 |
| 宇 (Yǔ) | 空间 | 万界苍茫、空间层次 | #4080f0 |
| 宙 (Zhòu) | 时间 | 时间长河、轮回因果 | #f04080 |
| 洪 (Hóng) | 洪荒 | 神怪异兽、洪荒神话 | #f06040 |
| 荒 (Huāng) | 失落 | 失传秘术、失落文明 | #806040 |

---

## 2. 技术架构

### 2.1 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Astro | 5.x | 静态站点框架 |
| TypeScript | 5.x | 类型安全 |
| Tailwind CSS | 4.x | 样式系统 |
| Zustand | 5.x | 状态管理 |
| Vite | 6.x | 构建工具 |

### 2.2 项目配置

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://lingxu.xn--jbtt24bux6a.com',
  base: '/',
  output: 'static',
  vite: {
    resolve: {
      alias: {
        '@components': './src/components',
        '@lib': './src/lib',
        '@data': './src/data',
        '@stores': './src/stores',
        '@layouts': './src/layouts',
      },
    },
  },
});
```

### 2.3 环境要求

- Node.js >= 18.0.0
- npm >= 9.0.0 或 pnpm >= 8.0.0

---

## 3. 快速开始

### 3.1 安装依赖

```bash
# 克隆仓库
git clone https://github.com/badhope/LingXu.git

# 进入目录
cd LingXu

# 安装依赖
npm install
```

### 3.2 开发命令

```bash
# 启动开发服务器
npm run dev

# 生产构建
npm run build

# 预览构建结果
npm run preview

# TypeScript 类型检查
npm run typecheck

# 代码格式化
npm run format
```

### 3.3 目录结构

```
LingXu/
├── .github/                    # GitHub 配置
│   ├── workflows/              # GitHub Actions
│   ├── ISSUE_TEMPLATE/         # Issue 模板
│   └── PULL_REQUEST_TEMPLATE/ # PR 模板
├── docs/                       # 项目文档
│   ├── architecture.md         # 架构设计
│   ├── DEVELOPER_GUIDE.md     # 开发者指南（本文件）
│   └── ...
├── public/                     # 静态资源
│   ├── favicon.svg
│   └── sitemap.xml
├── src/
│   ├── components/             # 组件
│   │   ├── interactive/       # 交互组件
│   │   │   ├── DynamicBackground.astro
│   │   │   ├── MistEffect.astro
│   │   │   ├── MotionController.astro
│   │   │   ├── MouseEffects.astro
│   │   │   ├── PageTransition.astro
│   │   │   ├── ParticleField.astro
│   │   │   ├── ScrollReveal.astro
│   │   │   └── Typewriter.astro
│   │   ├── layout/             # 布局组件
│   │   │   ├── Footer.astro
│   │   │   └── Header.astro
│   │   ├── portal/             # 传送门组件
│   │   │   ├── Portal.astro
│   │   │   └── PortalParticles.astro
│   │   ├── splash/             # 启动画面
│   │   │   └── SplashScreen.astro
│   │   ├── ui/                # UI 组件
│   │   │   ├── Badge.astro
│   │   │   ├── Breadcrumbs.astro
│   │   │   ├── Card.astro
│   │   │   ├── EnhancedCard.astro
│   │   │   ├── FlipCard.astro
│   │   │   ├── ModuleCard.astro
│   │   │   ├── SectionHeader.astro
│   │   │   ├── SettingsPanel.astro
│   │   │   └── Timeline.astro
│   │   └── widgets/           # 小部件
│   │       ├── ArchiveCard.astro
│   │       ├── ArticleCard.astro
│   │       └── SectionNav.astro
│   ├── data/                  # 数据配置
│   │   ├── modules.ts         # 八大模块配置
│   │   ├── navigation.ts      # 导航配置
│   │   └── timeline.ts        # 时间线数据
│   ├── layouts/               # 页面布局
│   │   ├── BaseLayout.astro   # 基础布局
│   │   └── ModuleLayout.astro # 模块布局
│   ├── lib/                   # 工具库
│   │   ├── animations.ts      # 动画配置系统
│   │   ├── constants.ts       # 常量定义
│   │   ├── portal.ts          # 传送门逻辑
│   │   └── utils.ts           # 工具函数
│   ├── pages/                 # 页面路由
│   │   ├── 404.astro
│   │   ├── 500.astro
│   │   ├── about.astro
│   │   ├── bookmarks.astro
│   │   ├── home.astro         # 首页
│   │   ├── index.astro        # 入口
│   │   ├── intro.astro
│   │   ├── profile.astro
│   │   ├── search.astro
│   │   ├── di/                # 地模块
│   │   ├── hong/              # 洪模块
│   │   ├── huang/             # 黄模块
│   │   ├── huang-lost/        # 荒模块
│   │   ├── tian/              # 天模块
│   │   ├── xuan/              # 玄模块
│   │   ├── yu/                # 宇模块
│   │   └── zhou/              # 宙模块
│   ├── stores/                # 状态存储
│   │   └── userStore.ts       # 用户状态
│   └── styles/                # 全局样式
│       ├── global.css         # 全局样式
│       └── motion.css         # 动画样式
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
└── package.json
```

---

## 4. 核心系统

### 4.1 模块配置系统

每个模块都在 `src/data/modules.ts` 中定义：

```typescript
export interface ModuleConfig {
  id: string;           // 模块标识符
  char: string;         // 单字符
  name: string;         // 完整名称
  pinyin: string;       // 拼音
  description: string;  // 描述
  href: string;         // 路由路径
  color: string;        // 主色
  bgGradient: string;   // 背景渐变
  theme: {              // 颜色主题
    primary: string;
    secondary: string;
    accent: string;
    bg: string;
    text: string;
    muted: string;
  };
  subModules: SubModule[]; // 子模块列表
}
```

### 4.2 动画配置系统

`src/lib/animations.ts` 提供统一的动画配置：

```typescript
import { 
  DURATIONS,     // 动画时长
  EASINGS,       // 缓动函数
  MODULE_THEMES, // 模块主题
  PAGE_TRANSITIONS, // 页面过渡
  STAGGER_CONFIGS   // 交错配置
} from '@lib/animations';

// 使用示例
const duration = DURATIONS.page; // 600ms
const easing = EASINGS.standard; // 标准缓动
```

### 4.3 状态管理系统

使用 Zustand 进行状态管理：

```typescript
// src/stores/userStore.ts
import { create } from 'zustand';

interface UserState {
  bookmarks: string[];
  history: string[];
  preferences: {
    theme: 'dark' | 'light';
    reducedMotion: boolean;
  };
  addBookmark: (id: string) => void;
  removeBookmark: (id: string) => void;
}

// 使用
const { addBookmark, bookmarks } = useUserStore();
```

---

## 5. 组件开发

### 5.1 组件结构

每个 Astro 组件包含三个部分：

```astro
---
// 1. Frontmatter（服务器端）
import Component from './Component.astro';
const data = fetchData();
---

<!-- 2. Template（客户端渲染） -->
<div class="component">
  <h1>{data.title}</h1>
</div>

<style>
  /* 3. Styles（作用域样式） */
  .component {
    color: var(--color-primary);
  }
</style>

<script>
  // 客户端脚本
  document.querySelector('.component').addEventListener('click', () => {
    // 交互逻辑
  });
</script>
```

### 5.2 创建新组件

```astro
---
// src/components/ui/NewComponent.astro
export interface Props {
  title: string;
  content?: string;
  variant?: 'primary' | 'secondary';
}

const { 
  title, 
  content = '', 
  variant = 'primary' 
} = Astro.props;
---

<div class={`new-component variant-${variant}`}>
  <h2>{title}</h2>
  <p>{content}</p>
</div>

<style>
  .new-component {
    padding: 1.5rem;
    background: rgba(10, 10, 15, 0.9);
    border-radius: 8px;
  }
  
  .variant-primary {
    border: 1px solid var(--color-gold);
  }
</style>
```

### 5.3 组件使用

```astro
---
import NewComponent from '@components/ui/NewComponent.astro';
---

<NewComponent 
  title="示例标题"
  content="示例内容"
  variant="primary"
/>
```

---

## 6. 页面开发

### 6.1 页面路由

Astro 使用基于文件的路由：

| 文件路径 | 路由 |
|---------|------|
| `src/pages/index.astro` | `/` |
| `src/pages/home.astro` | `/home` |
| `src/pages/tian/index.astro` | `/tian` |
| `src/pages/tian/calendar.astro` | `/tian/calendar` |

### 6.2 创建新页面

```astro
---
// src/pages/[module]/new-page.astro
import BaseLayout from '@layouts/BaseLayout.astro';
import { withBase } from '@lib/utils';

export interface Props {
  title?: string;
}

const { title = '新页面' } = Astro.props;
---

<BaseLayout title={title}>
  <div class="new-page">
    <h1>{title}</h1>
    <p>页面内容</p>
  </div>
</BaseLayout>

<style>
  .new-page {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
  }
</style>
```

### 6.3 模块页面模板

使用 `ModuleLayout` 创建模块页面：

```astro
---
// src/pages/tian/new-feature.astro
import ModuleLayout from '@layouts/ModuleLayout.astro';

export interface Props {
  title?: string;
  description?: string;
}

const { 
  title = '新功能',
  description = '功能描述'
} = Astro.props;
---

<ModuleLayout moduleId="tian" title={title}>
  <section class="feature-section">
    <h2>{title}</h2>
    <p>{description}</p>
    
    <!-- 功能内容 -->
  </section>
</ModuleLayout>
```

---

## 7. 样式系统

### 7.1 Tailwind CSS 配置

```javascript
// tailwind.config.mjs
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#c9a227',
          light: '#e8d48b',
          dark: '#8b6914',
        },
      },
      fontFamily: {
        display: ['ZCOOL XiaoWei', 'Ma Shan Zheng', 'cursive'],
        serif: ['Noto Serif SC', 'Source Han Serif SC', 'serif'],
      },
    },
  },
  plugins: [],
};
```

### 7.2 CSS 变量

在 `global.css` 中定义的变量：

```css
:root {
  /* 颜色 */
  --color-primary: #c9a227;
  --color-accent: #e8d48b;
  --color-bg: #050505;
  
  /* 动画 */
  --duration-fast: 150ms;
  --duration-normal: 300ms;
  --duration-slow: 500ms;
  
  /* 缓动 */
  --ease-standard: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

### 7.3 组件样式

使用 `@layer components` 定义可复用样式：

```css
@layer components {
  .card {
    @apply bg-[#0d0d0d] border border-[#2a2a2a] rounded-xl;
    @apply transition-all duration-300;
  }
  
  .card:hover {
    @apply border-[#c9a227]/40 shadow-[0_0_30px_rgba(201,162,39,0.08)];
  }
}
```

---

## 8. 动画系统

### 8.1 动画类

在 `motion.css` 中定义的动画类：

| 类名 | 效果 |
|------|------|
| `.page-enter` | 页面入场 |
| `.module-enter` | 模块入场（传送门） |
| `.reveal-up` | 向上淡入（滚动触发） |
| `.reveal-scale` | 缩放淡入 |
| `.card-hover` | 卡片悬浮 |
| `.text-shimmer` | 文字流光 |
| `.icon-spin` | 图标旋转 |

### 8.2 使用动画

```astro
<div class="animate-element reveal-up">
  滚动显示的元素
</div>

<button class="btn-animated">
  带动画的按钮
</button>
```

### 8.3 自定义动画

```css
.custom-animation {
  animation: 
    customEnter 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards,
    customFloat 3s ease-in-out infinite 0.6s;
}

@keyframes customEnter {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes customFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
```

---

## 9. 状态管理

### 9.1 创建 Store

```typescript
// src/stores/contentStore.ts
import { create } from 'zustand';

interface ContentState {
  // 状态
  activeModule: string | null;
  expandedItems: string[];
  searchQuery: string;
  
  // Actions
  setActiveModule: (id: string | null) => void;
  toggleExpanded: (id: string) => void;
  setSearchQuery: (query: string) => void;
}

export const useContentStore = create<ContentState>((set) => ({
  activeModule: null,
  expandedItems: [],
  searchQuery: '',
  
  setActiveModule: (id) => set({ activeModule: id }),
  
  toggleExpanded: (id) => set((state) => ({
    expandedItems: state.expandedItems.includes(id)
      ? state.expandedItems.filter(i => i !== id)
      : [...state.expandedItems, id]
  })),
  
  setSearchQuery: (query) => set({ searchQuery: query }),
}));
```

### 9.2 使用 Store

```astro
<script>
  import { useContentStore } from '@stores/contentStore';
  
  const store = useContentStore();
  
  // 监听变化
  store.subscribe((state) => {
    console.log('Search query changed:', state.searchQuery);
  });
</script>
```

---

## 10. 国际化

### 10.1 多语言配置

```typescript
// src/lib/i18n.ts
export const locales = {
  zh: {
    name: '简体中文',
    nav: {
      home: '首页',
      about: '关于',
    },
  },
  en: {
    name: 'English',
    nav: {
      home: 'Home',
      about: 'About',
    },
  },
};

export type Locale = keyof typeof locales;
```

### 10.2 路由国际化

```
src/pages/
├── index.astro           # 默认语言
├── en/
│   └── index.astro       # 英文版
```

---

## 11. 部署流程

### 11.1 构建

```bash
npm run build
```

### 11.2 本地预览

```bash
npm run preview
```

### 11.3 GitHub Pages 部署

项目配置了 GitHub Actions，自动在推送到 `main` 分支时部署。

---

## 12. 常见问题

### Q: 如何添加新的模块页面？

1. 在 `src/pages/[module]/` 下创建 `.astro` 文件
2. 使用 `ModuleLayout` 组件
3. 在 `src/data/modules.ts` 的对应模块中添加子模块配置

### Q: 如何自定义动画效果？

1. 编辑 `src/lib/animations.ts` 添加新的动画配置
2. 或在 `src/styles/motion.css` 中添加新的 CSS 动画
3. 在组件中使用定义的类名

### Q: 如何调整主题色？

1. 修改 `src/data/modules.ts` 中的 `color` 字段
2. 或修改 `tailwind.config.mjs` 中的颜色配置
3. 动画主题色在 `src/lib/animations.ts` 的 `MODULE_THEMES` 中

### Q: 如何优化性能？

1. 使用 `<Image />` 组件优化图片
2. 懒加载非首屏内容
3. 减少客户端 JavaScript
4. 使用 CSS 动画代替 JS 动画

---

## 附录：贡献指南

详见 [CONTRIBUTING.md](./CONTRIBUTING.md)

---

**愿见者得度，闻者觉悟**

*May those who see find liberation, may those who hear attain enlightenment.*
