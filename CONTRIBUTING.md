# 灵墟 (LingXu) 贡献指南

> **失落修行文明档案馆** · 探索中国玄学文化的数字殿堂

---

## 📋 目录

- [🤝 欢迎贡献](#-欢迎贡献)
- [🔧 开发环境](#-开发环境)
- [📁 项目结构](#-项目结构)
- [🎨 设计规范](#-设计规范)
- [✨ 动画系统](#-动画系统)
- [📝 内容规范](#-内容规范)
- [🔄 提交流程](#-提交流程)
- [❓ 问题反馈](#-问题反馈)

---

## 🤝 欢迎贡献

灵墟是一个开放的中文玄学文化数字档案项目，欢迎任何形式的贡献：

- 🐛 **Bug 修复** - 报告和修复问题
- 💡 **新功能** - 提出和改进功能
- 📝 **内容完善** - 补充和修正文化内容
- 🎨 **设计优化** - 提升视觉效果和交互体验
- 📖 **文档编写** - 完善项目文档

---

## 🔧 开发环境

### 环境要求

```yaml
Node.js: >= 18.0.0
npm: >= 9.0.0 或 pnpm >= 8.0.0
Git: 最新版本
```

### 安装步骤

```bash
# 1. 克隆仓库
git clone https://github.com/badhope/LingXu.git

# 2. 进入目录
cd LingXu

# 3. 安装依赖
npm install

# 4. 启动开发服务器
npm run dev

# 5. 访问 http://localhost:4321
```

### 可用命令

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 生产构建 |
| `npm run preview` | 预览构建结果 |
| `npm run typecheck` | TypeScript 类型检查 |
| `npm run lint` | ESLint 代码检查 |
| `npm run format` | 代码格式化 |

---

## 📁 项目结构

```
LingXu/
├── src/
│   ├── components/           # 组件目录
│   │   ├── interactive/     # 交互组件（动画、特效）
│   │   │   ├── DynamicBackground.astro  # 动态背景
│   │   │   ├── MistEffect.astro         # 薄雾效果
│   │   │   ├── MouseEffects.astro        # 鼠标交互
│   │   │   ├── PageTransition.astro      # 页面过渡
│   │   │   ├── ParticleField.astro       # 粒子场
│   │   │   ├── ScrollReveal.astro        # 滚动显示
│   │   │   └── Typewriter.astro          # 打字机效果
│   │   ├── layout/          # 布局组件
│   │   │   ├── Header.astro             # 页头
│   │   │   └── Footer.astro             # 页脚
│   │   ├── portal/          # 入口组件
│   │   │   ├── Portal.astro              # 传送门
│   │   │   └── PortalParticles.astro     # 传送门粒子
│   │   ├── splash/           # 启动画面
│   │   │   └── SplashScreen.astro        # 启动屏幕
│   │   └── ui/              # UI 组件
│   │       ├── ModuleCard.astro          # 模块卡片
│   │       ├── Card.astro                # 通用卡片
│   │       ├── Badge.astro              # 标签徽章
│   │       └── ...
│   ├── data/                 # 数据配置
│   │   ├── modules.ts        # 八大模块配置
│   │   ├── navigation.ts     # 导航配置
│   │   └── timeline.ts       # 时间线数据
│   ├── layouts/              # 页面布局
│   │   ├── BaseLayout.astro  # 基础布局
│   │   └── ModuleLayout.astro # 模块布局
│   ├── lib/                  # 工具库
│   │   ├── animations.ts     # 动画配置
│   │   ├── constants.ts      # 常量定义
│   │   ├── portal.ts        # 传送门逻辑
│   │   └── utils.ts         # 通用工具
│   ├── pages/                # 页面路由
│   │   ├── index.astro       # 入口页面
│   │   ├── home.astro        # 首页
│   │   ├── intro.astro       # 介绍页
│   │   ├── about.astro       # 关于页
│   │   ├── search.astro      # 搜索页
│   │   ├── bookmarks.astro   # 收藏页
│   │   ├── profile.astro     # 个人页
│   │   ├── tian/            # 天时模块
│   │   ├── di/              # 地理模块
│   │   ├── xuan/            # 玄学模块
│   │   ├── huang/           # 历史模块
│   │   ├── yu/              # 空间模块
│   │   ├── zhou/            # 时间模块
│   │   ├── hong/            # 洪荒模块
│   │   └── huang-lost/      # 失落模块
│   ├── stores/               # 状态管理
│   │   └── userStore.ts     # 用户状态
│   └── styles/               # 样式文件
│       ├── global.css       # 全局样式
│       └── motion.css       # 动画样式
├── public/                  # 静态资源
│   ├── favicon.svg
│   └── sitemap.xml
├── docs/                    # 项目文档
│   ├── architecture.md      # 架构设计
│   ├── content-model.md     # 内容模型
│   └── motion-principles.md # 动效原则
├── astro.config.mjs        # Astro 配置
├── tailwind.config.mjs     # Tailwind 配置
└── package.json
```

---

## 🎨 设计规范

### 色彩系统

灵墟使用独特的金色主题，灵感来自古典文献和修行文化：

```css
/* 主色调 */
--color-gold: #c9a227;          /* 金色 - 主色 */
--color-gold-light: #e8d48b;    /* 浅金 - 高亮 */
--color-gold-dark: #8b6914;     /* 暗金 - 深色 */

/* 功能色 */
--color-primary: #c9a227;       /* 主要交互 */
--color-secondary: #6b4a2d;     /* 次要元素 */
--color-accent: #d4af37;        /* 强调色 */
--color-background: #050505;    /* 背景色 */
--color-surface: #0d0d0d;       /* 表面色 */
--color-text: #e8d48b;          /* 文字色 */
--color-muted: #666666;         /* 次要文字 */

/* 模块色彩 */
--color-tian: #f0c040;          /* 天 - 金黄 */
--color-di: #40b040;            /* 地 - 翠绿 */
--color-xuan: #8040f0;          /* 玄 - 紫 */
--color-huang: #c08040;          /* 黄 - 琥珀 */
--color-yu: #4080f0;            /* 宇 - 碧蓝 */
--color-zhou: #f04080;           /* 宙 - 桃红 */
--color-hong: #f06040;           /* 洪 - 朱红 */
--color-huang-lost: #806040;     /* 荒 - 褐色 */
```

### 字体系统

```css
/* 中文正文 - 思源宋体 */
font-family: 'Noto Serif SC', 'Source Han Serif SC', 'STSong', serif;

/* 标题装饰 - 站酷小薇体 */
font-family: 'ZCOOL XiaoWei', 'Ma Shan Zheng', cursive;

/* 代码/数据 - 等宽字体 */
font-family: 'SF Mono', 'Fira Code', monospace;
```

### 间距系统

```css
--spacing-xs: 0.25rem;   /* 4px */
--spacing-sm: 0.5rem;    /* 8px */
--spacing-md: 1rem;      /* 16px */
--spacing-lg: 1.5rem;    /* 24px */
--spacing-xl: 2rem;      /* 32px */
--spacing-2xl: 3rem;     /* 48px */
--spacing-3xl: 4rem;      /* 64px */
```

### 圆角系统

```css
--radius-sm: 4px;         /* 小圆角 */
--radius-md: 8px;         /* 中圆角 */
--radius-lg: 12px;        /* 大圆角 */
--radius-xl: 16px;        /* 超大圆角 */
--radius-full: 9999px;    /* 全圆角 */
```

---

## ✨ 动画系统

### 动画配置

所有动画配置统一在 `src/lib/animations.ts` 管理：

```typescript
// 动画时长
export const DURATIONS = {
  fast: 150,      // 快速交互
  normal: 300,    // 标准过渡
  page: 600,      // 页面切换
  enter: 800,     // 入场动画
  complex: 1200,  // 复杂动画
  epic: 2000,     // 史诗动画
};

// 缓动函数
export const EASINGS = {
  standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
  enter: 'cubic-bezier(0, 0, 0.2, 1)',
  exit: 'cubic-bezier(0.4, 0, 1, 1)',
  bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  mystical: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
};
```

### 页面过渡类型

```typescript
export type TransitionType = 
  | 'fade'           // 淡入淡出
  | 'slide-up'       // 上滑
  | 'slide-down'     // 下滑
  | 'portal'         // 传送门效果
  | 'dissolve'       // 溶解
  | 'vortex'         // 漩涡
  | 'revelation';    // 启示录
```

### 使用示例

```astro
---
import PageTransition from '@components/interactive/PageTransition.astro';
---

<!-- 基础过渡 -->
<PageTransition type="fade" />

<!-- 模块专属过渡 -->
<PageTransition type="portal" moduleId="tian" />
```

### CSS 动画类

```css
/* 入场动画 */
.page-enter          { animation: pageEnter 0.6s ease forwards; }
.module-enter        { animation: moduleEnter 1.2s ease forwards; }

/* 滚动触发 */
.reveal-up           { /* 向上淡入 */ }
.reveal-left         { /* 向左淡入 */ }
.reveal-scale        { /* 缩放淡入 */ }

/* 卡片动画 */
.card-hover          { /* 悬浮效果 */ }
.card-glow-border    { /* 发光边框 */ }
```

---

## 📝 内容规范

### 文字内容

1. **语言风格**
   - 使用典雅的中文表达
   - 避免口语化、俚语
   - 适当使用古文引用

2. **标点符号**
   - 使用中文标点（，。：；？！""）
   - 专有名词使用正确写法

3. **格式规范**
   - 标题使用标准层级
   - 段落首行缩进
   - 列表使用 ◆ 或 一二三

### 内容来源

所有内容应基于可靠的学术资料：

- 📜 **经典文献** - 《易经》《黄帝内经》《山海经》等
- 🏛️ **学术研究** - 引用学者研究成果
- 🎭 **文化传承** - 非遗项目、民俗记录

### 免责声明

涉及宗教、迷信内容时，添加免责声明：

```html
<p class="disclaimer">
  灵墟收录的内容仅供文化研究与欣赏之用。
  我们不提供任何形式的算命、占卜服务。
</p>
```

---

## 🔄 提交流程

### 分支命名

```bash
feature/xxx          # 新功能
bugfix/xxx           # Bug 修复
content/xxx          # 内容更新
design/xxx           # 设计改进
docs/xxx             # 文档更新
```

### 提交规范

```bash
# 功能提交
git commit -m "feat: 添加天时模块八字排盘功能"

# Bug 修复
git commit -m "fix: 修复首页动画卡顿问题"

# 内容更新
git commit -m "docs: 补充洪荒模块神兽资料"

# 样式调整
git commit -m "style: 优化模块卡片交互效果"
```

### Pull Request 流程

1. Fork 仓库
2. 创建特性分支
3. 提交更改
4. 推送到远程
5. 创建 Pull Request
6. 等待代码审查
7. 合并到主分支

---

## ❓ 问题反馈

### 报告 Bug

请在 GitHub Issues 中报告，包含：

- 🐛 清晰的标题描述
- 📝 详细的问题描述
- 🖥️ 复现步骤
- 🎯 预期行为 vs 实际行为
- 🖼️ 截图或录屏（如果适用）

### 功能建议

欢迎提出新功能建议，请在 Issues 中：

- 💡 描述功能需求
- 🎯 说明使用场景
- ✨ 描述预期效果

### 联系方式

- 🌐 网站: https://lingxu.xn--jbtt24bux6a.com
- 🐛 Issues: https://github.com/badhope/LingXu/issues

---

<div align="center">

**愿见者得度，闻者觉悟**

*May those who see find liberation, may those who hear attain enlightenment.*

</div>
