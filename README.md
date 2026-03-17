# 天机 (TianJi) - 玄学主题静态网站

<p align="center">
  <img src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>☯</text></svg>" alt="天机 Logo" width="120">
</p>

<p align="center">
  <a href="https://badhope.github.io/TianJi/">
    <img src="https://img.shields.io/badge/访问网站-c9a227?style=for-the-badge&logo=github" alt="Website">
  </a>
  <a href="LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-c9a227?style=for-the-badge" alt="License">
  </a>
</p>

---

## 📖 项目简介

**天机** 是一个综合性玄学主题的 GitHub Pages 静态网站，整合了中国传统玄学文化的核心内容，包括：

- 🏮 **天**：运势预测、黄历查询、八字命理、易经解读、占卜预测
- 🏔️ **地**：风水堪舆、山海经、神兽异兽、神话传说、民俗文化
- 🔮 **玄**：奇经八脉、内功修炼、道法符咒、丹道筑基、周易精解
- 🌿 **黄**：八字命理、黄帝内经、养生导引、气功养生、姓名学

---

## 🛠️ 技术架构

- **前端框架**：原生 HTML5 + CSS3 + JavaScript
- **部署平台**：GitHub Pages
- **动画库**：CSS Animations + 原生 JavaScript 实现交互动画
- **字体**：Google Fonts (ZCOOL XiaoWei, Noto Serif SC, Ma Shan Zheng)

### 核心特性

- ✅ 响应式布局，适配桌面端、平板和移动设备
- ✅ 丰富多样的动画效果（悬停、滚动、加载动画）
- ✅ 本地数据存储，保存用户历史记录和收藏
- ✅ 传统中国风设计配色

---

## 📁 项目结构

```
TianJi/
├── index.html              # 入口页面（太极八卦动画）
├── pages/
│   ├── main.html          # 主界面（四大板块导航）
│   ├── fortune.html       # 每日运势
│   ├── calendar.html      # 黄历查询
│   ├── bazi.html          # 八字命理
│   ├── yijing.html        # 易经解读
│   ├── divination.html    # 占卜预测
│   ├── shanhai.html       # 山海经
│   ├── meridians.html     # 奇经八脉
│   ├── wellness.html      # 养生导引
│   └── ...
├── css/
│   ├── entrance.css       # 入口页面样式
│   ├── main.css          # 主界面样式
│   ├── page.css          # 通用页面样式
│   ├── fortune.css       # 运势页面样式
│   ├── calendar.css      # 黄历样式
│   ├── bazi.css          # 八字样式
│   ├── yijing.css        # 易经样式
│   ├── shanhai.css       # 山海经样式
│   ├── meridians.css     # 奇经八脉样式
│   └── wellness.css      # 养生样式
├── js/
│   ├── entrance.js        # 入口页面脚本
│   ├── main.js           # 主界面脚本
│   ├── fortune.js        # 运势脚本
│   ├── calendar.js       # 黄历脚本
│   ├── bazi.js           # 八字脚本
│   ├── yijing.js         # 易经脚本
│   ├── divination.js     # 占卜脚本
│   ├── shanhai.js        # 山海经脚本
│   ├── meridians.js      # 奇经八脉脚本
│   └── wellness.js       # 养生脚本
└── README.md
```

---

## 🚀 部署指南

### 方法一：GitHub Pages 自动部署

1. **Fork 本仓库** 或将代码推送到你的 GitHub 仓库

2. **设置 GitHub Pages**：
   - 进入仓库 Settings → Pages
   - Source 选择 `main` branch
   - 点击 Save

3. **访问网站**：
   - 等待几分钟后访问 `https://yourusername.github.io/TianJi/`

### 方法二：本地预览

```bash
# 使用 Python 启动本地服务器
python -m http.server 8000

# 或使用 PHP
php -S localhost:8000

# 访问 http://localhost:8000
```

---

## 📚 内容说明

### 入口页面
- 太极八卦缓缓旋转的动画效果
- 点击后带有爆炸粒子特效进入主界面

### 四大板块

| 板块 | 内容 |
|------|------|
| 天 | 每日运势、黄历查询、八字命理、易经解读、占卜预测、面相手相 |
| 地 | 风水堪舆、山海经、神兽异兽、神话传说、民俗文化、地理龙脉 |
| 玄 | 奇经八脉、内功修炼、道法符咒、丹道筑基、周易精解、玄学知识 |
| 黄 | 八字命理、黄帝内经、养生导引、气功养生、姓名学、八字合婚 |

### 数据存储
- 使用浏览器 LocalStorage 保存用户数据
- 支持历史记录和收藏功能

---

## ⚠️ 免责声明

本网站所有内容仅供**娱乐参考**，请勿过分迷信。

- 运势、命理等内容仅为娱乐性质
- 占卜结果仅供参考，人生决定需理性思考
- 养生知识仅供参考，具体健康问题请咨询专业医师

---

## 📄 开源许可

本项目基于 **MIT License** 开源。

---

## 🙏 致谢

- Google Fonts 提供的字体支持
- 中国传统文化的深厚底蕴

---

<p align="center">
  <strong>探索玄妙 · 洞察天机</strong><br>
  © 2024 天机 · TianJi
</p>
