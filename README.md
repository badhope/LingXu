# 灵墟 · LingXu

<div align="center">
  
  ![灵墟 Logo](./docs/images/logo.png)
  
  **末法时代 · 失落修行文明档案馆**
  
  *Archive of a Lost Cultivation Civilization*
  
  [![GitHub](https://img.shields.io/badge/GitHub-badhope%2FLingXu-181717?style=flat&logo=github)](https://github.com/badhope/LingXu)
  [![License](https://img.shields.io/badge/License-MIT-c9a227?style=flat)](./LICENSE)
  [![Version](https://img.shields.io/badge/Version-2.0.0-c9a227?style=flat)](./CHANGELOG.md)
  [![Stars](https://img.shields.io/github/stars/badhope/LingXu?style=flat&color=c9a227)](https://github.com/badhope/LingXu/stargazers)
  
</div>

---

## 🌟 项目简介

**灵墟**是一个沉浸式的中国玄学文化数字档案，探索修行文明的兴衰变迁。

公元2026年，末法时代。万年来灵气衰落，历史被封锁，世人忘却了那些曾是真实的奇人异事——老子飞升、庄子化蝶、列子御风...那些不是神话，而是真实存在的修行者。

灵墟档案馆致力于记录这些被遗忘的修行文明，探索天地玄黄、宇宙洪荒的奥秘。

### ✨ 特色功能

- 🌌 **沉浸式体验** - WebGL 3D 星空、粒子系统、水墨动态背景
- ☯️ **玄学工具** - 易经八卦、八字命理、风水罗盘、符箓生成
- 📜 **丰富内容** - 八大模块、数百个子页面、详尽解读
- 🎮 **交互功能** - 每日签到、占卜大厅、修炼模拟器
- 🌙 **神秘玄幻** - 仙侠风格界面，深邃的文化氛围

---

## 🗺️ 八大模块

| 模块 | 描述 | 内容 |
|------|------|------|
| **天** | 天道运行，星辰变化 | 星宿、运势、节气、占卜 |
| **地** | 山川地理，风水堪舆 | 风水、罗盘、龙脉、地理 |
| **玄** | 易经八卦，符箓命理 | 易经、八字、占卜、符箓 |
| **黄** | 千古兴亡，秘辛档案 | 朝代、人物、秘辛、文献 |
| **宇** | 万界苍茫，空间层次 | 三界、洞天、维度、秘界 |
| **宙** | 时间长河，轮回因果 | 轮回、因果、时光、预言 |
| **洪** | 神怪异兽，洪荒神话 | 神兽、妖魔、传说、图腾 |
| **荒** | 失传秘术，失落文明 | 功法、丹药、法宝、秘室 |

---

## 🚀 快速开始

### 在线访问

[https://badhope.github.io/LingXu](https://badhope.github.io/LingXu)

### 本地运行

```bash
# 克隆仓库
git clone https://github.com/badhope/LingXu.git
cd LingXu

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建静态网站
pnpm build

# 导出静态文件
pnpm export
```

### 技术栈

- **框架**: Next.js 14 (React 18)
- **语言**: TypeScript 5
- **样式**: Tailwind CSS + SCSS Modules
- **动画**: Framer Motion
- **3D 渲染**: Three.js + React Three Fiber
- **状态管理**: Zustand
- **图表**: ECharts
- **农历计算**: lunar-javascript

---

## 📖 项目结构

```
LingXu/
├── src/
│   ├── components/          # 组件
│   │   ├── background/      # 背景组件（星空、轨道）
│   │   ├── interactive/     # 交互组件（太极、八卦）
│   │   ├── layout/          # 布局组件
│   │   └── splash/          # 启动页
│   ├── hooks/               # 自定义 Hooks
│   ├── lib/                 # 工具库
│   │   ├── constants.ts     # 常量配置
│   │   └── utils.ts         # 工具函数
│   ├── pages/               # 页面路由
│   │   ├── index.tsx        # 入口页
│   │   ├── home.tsx         # 主页
│   │   ├── tian.tsx         # 天时模块
│   │   ├── di.tsx           # 地理模块
│   │   ├── xuan.tsx         # 玄学模块
│   │   ├── huang.tsx        # 历史模块
│   │   ├── yu.tsx           # 空间模块
│   │   ├── zhou.tsx         # 时间模块
│   │   ├── hong.tsx         # 洪荒模块
│   │   └── huang-lost.tsx   # 失落模块
│   ├── stores/              # 状态管理
│   └── styles/              # 全局样式
├── public/                  # 静态资源
├── docs/                    # 文档
└── [配置文件]
```

---

## 🎨 设计理念

### 视觉风格

- **主题色**: 金色 (#c9a227) + 玄色 (#1a1a2e)
- **点缀**: 发光星辰效果
- **氛围**: 神秘、深邃、仙侠

### 动画系统

- 粒子系统: 星空、光粒子、龙形粒子
- 轨道系统: 旋转轨道、符号环绕
- 太极图: 旋转、发光、交互
- 过渡动画: 页面切换、元素入场

### 响应式设计

- 桌面端: 完整体验
- 平板端: 自适应布局
- 移动端: 简化动画、触控优化

---

## 🌐 API 集成

灵墟整合了多个免费开源 API：

| 类型 | API | 用途 |
|------|-----|------|
| 天文 | NASA API | 每日天文图片、星图数据 |
| 天气 | 和风天气 | 节气、天气查询 |
| 日历 | 公共日历 API | 节假日、农历转换 |
| 星座 | 内置算法 | 星座计算、运势生成 |

> 注：部分功能使用本地算法实现，无需外部 API

---

## 🤝 参与贡献

欢迎所有形式的贡献！

### 贡献方式

1. **内容贡献** - 添加玄学知识、历史资料、神话故事
2. **代码贡献** - 修复 Bug、添加功能、优化性能
3. **设计贡献** - 改进 UI、添加动画、设计素材
4. **翻译贡献** - 翻译成其他语言

### 贡献流程

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add amazing feature'`)
4. 推送分支 (`git push origin feature/amazing-feature`)
5. 提交 Pull Request

---

## 📄 许可证

本项目基于 [MIT 许可证](./LICENSE) 开源。

**注意**: 
- 本项目仅供娱乐和学习，不构成任何形式的预测或建议
- 玄学内容源自传统文化，不代表科学观点
- 如有侵权，请联系作者删除

---

## 📞 联系方式

- **GitHub**: [https://github.com/badhope/LingXu](https://github.com/badhope/LingXu)
- **问题反馈**: [Issues](https://github.com/badhope/LingXu/issues)
- **功能建议**: [Discussions](https://github.com/badhope/LingXu/discussions)

---

<div align="center">
  
  **愿你在灵墟中找到属于自己的修行之路**
  
  *May you find your own path of cultivation in LingXu*
  
  ![Star](https://img.shields.io/github/stars/badhope/LingXu?style=social)
  
</div>
