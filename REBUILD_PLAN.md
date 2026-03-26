# 灵墟 (LingXu) 重构与扩展方案

## 项目现状分析

### 技术栈
- **框架**: Astro 4.x + TypeScript
- **样式**: Tailwind CSS 3.x
- **动画**: Framer Motion + 原生 Canvas
- **状态**: Zustand
- **部署**: GitHub Pages

### 现有架构
```
入口 (Splash) → 传送门 (Portal) → 首页 (Home) → 八大模块
```

### 现有特点
✅ 太极旋转启动画面  
✅ 粒子效果背景  
✅ 传送门SVG动画  
✅ 暗色主题 + 金色配色  
✅ 响应式设计  

---

## 重构目标

### 核心目标
> **"每一次切换都有动画，所有文字和功能都是高级的"**

### 具体目标
1. **页面切换动画** - 路由级平滑过渡
2. **微交互动画** - 悬停、点击、滚动触发
3. **高级视觉效果** - 3D变换、视差、着色器
4. **功能扩展** - 从展示到交互
5. **性能优化** - 60fps动画，懒加载

---

## 重构方案

### Phase 1: 动画系统升级

#### 1.1 页面过渡系统
```typescript
// 实现页面切换动画
- 淡入淡出 (Fade)
- 滑动过渡 (Slide)
- 缩放过渡 (Zoom)
- 3D翻转 (Flip)
- 传送门特效 (Portal) - 品牌特色
```

**技术选型**:
- View Transitions API (原生)
- Framer Motion AnimatePresence
- 自定义 PageTransition 组件

#### 1.2 滚动触发动画
```typescript
// ScrollReveal 增强
- 文字逐字浮现
- 卡片依次进入
- 视差滚动效果
- 进度指示器
```

#### 1.3 微交互系统
```typescript
// 悬停效果
- 磁吸按钮 (Magnetic Button)
- 文字 scramble 效果
- 图片缩放 + 遮罩
- 光标跟随效果

// 点击反馈
- 涟漪效果 (Ripple)
- 粒子爆发
- 状态切换动画
```

### Phase 2: 视觉升级

#### 2.1 3D元素
```typescript
// Three.js / React Three Fiber
- 悬浮的八卦阵
- 3D神兽模型展示
- 粒子星云背景
- 法器3D查看器
```

#### 2.2 高级CSS效果
```css
/* 拟态设计 */
- 玻璃态 (Glassmorphism)
- 新拟态 (Neumorphism)
- 金属质感
- 水墨晕染效果
```

#### 2.3 着色器效果
```glsl
// WebGL Shaders
- 流动的金色纹理
- 灵气波动效果
- 阵法激活特效
- 时空扭曲过渡
```

### Phase 3: 功能扩展

#### 3.1 天时模块 (天)
**现有**: 静态展示  
**扩展**:
- 实时黄历 API 集成
- 八字排盘计算器
- 节气倒计时
- 每日运势生成

#### 3.2 地理模块 (地)
**现有**: 静态展示  
**扩展**:
- 交互式罗盘
- 风水计算器
- 洞天福地地图
- GPS方位检测

#### 3.3 玄学模块 (玄)
**现有**: 静态展示  
**扩展**:
- 易经占卜器 (随机+算法)
- 命理推演工具
- 符箓生成器
- 阵法模拟器

#### 3.4 历史模块 (黄)
**现有**: 静态展示  
**扩展**:
- 交互式时间轴
- 纪年转换器
- 人物关系图谱
- 历史事件地图

#### 3.5 空间模块 (宇)
**现有**: 静态展示  
**扩展**:
- 诸天万界可视化
- 空间层次3D展示
- 世界地图标记

#### 3.6 时间模块 (宙)
**现有**: 静态展示  
**扩展**:
- 历法对比工具
- 轮回计算器
- 因果时间轴

#### 3.7 洪荒模块 (洪)
**现有**: 静态展示  
**扩展**:
- 神兽图鉴 (3D展示)
- 神谱关系图
- 本命神兽测试

#### 3.8 失落模块 (荒)
**现有**: 静态展示  
**扩展**:
- 功法典籍阅读器
- 法器3D查看器
- 丹药配方计算器
- 遗迹探索地图

### Phase 4: 交互增强

#### 4.1 用户系统
```typescript
- 本地存储收藏
- 浏览历史
- 个人命盘保存
- 修炼进度追踪
```

#### 4.2 搜索系统
```typescript
- 全文搜索
- 智能推荐
- 标签过滤
- 语音搜索
```

#### 4.3 分享功能
```typescript
- 生成分享卡片
- 社交媒体分享
- 二维码生成
- 导出PDF
```

---

## 技术实现

### 新增依赖
```json
{
  "dependencies": {
    "@react-three/fiber": "^8.x",
    "@react-three/drei": "^9.x",
    "three": "^0.160.x",
    "gsap": "^3.12.x",
    "@gsap/react": "^2.x",
    "lenis": "^1.x",
    "split-type": "^0.3.x"
  }
}
```

### 目录结构调整
```
src/
├── animations/          # 动画配置
│   ├── transitions.ts
│   ├── scroll.ts
│   └── pageTransitions.ts
├── components/
│   ├── 3d/             # 3D组件
│   │   ├── Bagua.tsx
│   │   ├── StarField.tsx
│   │   └── Artifact3D.tsx
│   ├── effects/        # 特效组件
│   │   ├── ParticleField.tsx
│   │   ├── ShaderBackground.tsx
│   │   └── RippleEffect.tsx
│   ├── transitions/    # 过渡组件
│   │   ├── PageTransition.tsx
│   │   ├── PortalTransition.tsx
│   │   └── FadeTransition.tsx
│   └── interactive/    # 交互组件
│       ├── MagneticButton.tsx
│       ├── ScrambleText.tsx
│       └── ScrollReveal.tsx
├── hooks/              # 自定义Hooks
│   ├── useScrollProgress.ts
│   ├── useMousePosition.ts
│   ├── useInView.ts
│   └── useSmoothScroll.ts
├── lib/
│   ├── animations/     # 动画工具
│   ├── shaders/        # GLSL着色器
│   └── utils/
└── stores/
    └── uiStore.ts      # UI状态管理
```

---

## 开发计划

### Week 1: 基础动画系统
- [ ] 集成 GSAP + Lenis 平滑滚动
- [ ] 实现页面过渡组件
- [ ] 创建 ScrollReveal 系统
- [ ] 优化现有粒子效果

### Week 2: 视觉升级
- [ ] 实现玻璃态UI组件
- [ ] 添加磁吸按钮效果
- [ ] 文字 scramble 动画
- [ ] 水墨晕染效果

### Week 3: 3D元素
- [ ] 集成 Three.js
- [ ] 创建悬浮八卦阵
- [ ] 3D粒子星云背景
- [ ] 法器3D查看器基础

### Week 4: 功能模块
- [ ] 八字排盘计算器
- [ ] 交互式罗盘
- [ ] 易经占卜器
- [ ] 神兽图鉴3D展示

### Week 5: 性能优化
- [ ] 代码分割
- [ ] 懒加载实现
- [ ] 动画性能优化
- [ ] 移动端适配

---

## 设计规范

### 色彩系统
```css
/* 主色调 */
--gold-primary: #c9a227;
--gold-light: #d4af37;
--gold-dark: #a08220;

/* 背景色 */
--bg-primary: #0a0a0f;
--bg-secondary: #12121a;
--bg-tertiary: #1a1a24;

/* 文字色 */
--text-primary: #e8d48b;
--text-secondary: #c9a227;
--text-muted: #888888;
```

### 动画规范
```typescript
// 缓动函数
const easings = {
  portal: [0.25, 0.46, 0.45, 0.94],    // 传送门专用
  reveal: [0.22, 1, 0.36, 1],          // 揭示效果
  smooth: [0.4, 0, 0.2, 1],            // 平滑过渡
  bounce: [0.68, -0.55, 0.265, 1.55],  // 弹性效果
};

// 时长规范
const durations = {
  instant: 0.1,    // 即时反馈
  fast: 0.3,       // 快速过渡
  normal: 0.5,     // 标准动画
  slow: 0.8,       // 慢速强调
  dramatic: 1.2,   // 戏剧性效果
};
```

### 间距系统
```css
--space-xs: 0.25rem;   /* 4px */
--space-sm: 0.5rem;    /* 8px */
--space-md: 1rem;      /* 16px */
--space-lg: 1.5rem;    /* 24px */
--space-xl: 2rem;      /* 32px */
--space-2xl: 3rem;     /* 48px */
--space-3xl: 4rem;     /* 64px */
```

---

## 性能预算

### 目标指标
- **FCP**: < 1.5s
- **LCP**: < 2.5s
- **CLS**: < 0.1
- **FID**: < 100ms
- **动画帧率**: 60fps

### 优化策略
- 图片使用 WebP + 懒加载
- 3D模型使用 LOD
- 动画使用 transform/opacity
- 代码分割按路由
- Service Worker 缓存

---

## 风险评估

| 风险 | 概率 | 影响 | 缓解措施 |
|------|------|------|----------|
| 3D性能问题 | 中 | 高 | 使用LOD，移动端降级 |
| 动画卡顿 | 中 | 中 | 使用will-change，减少同时动画 |
| 包体积过大 | 低 | 中 | 代码分割，懒加载 |
| 浏览器兼容 | 低 | 中 | 渐进增强，降级方案 |

---

## 下一步行动

1. **确认需求**: 你希望优先实现哪些功能？
2. **技术选型**: 是否需要 Three.js 或保持轻量？
3. **开发启动**: 从 Phase 1 开始逐步实现

---

*方案制定: 2026-03-26*  
*版本: v1.0*
