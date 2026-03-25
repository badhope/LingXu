<div align="center">

# LingXu

**Tiān Dì Xuán Huáng · Yǔ Zhòu Hóng Huāng**

**Archive of a Lost Cultivation Civilization**

*失落修行文明档案馆*

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Astro](https://img.shields.io/badge/Astro-5.x-FF5D01?logo=astro)](https://astro.build)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-06B6D4?logo=tailwindcss)](https://tailwindcss.com)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Deployed-success?logo=github)](https://pages.github.com)

[Live Demo](https://lingxu.xn--jbtt24bux6a.com) · [中文文档](README.md) · [Changelog](CHANGELOG.md) · [Contributing](CONTRIBUTING.md)

</div>

---

## 📖 Overview

LingXu (灵墟) is an immersive digital archive exploring Chinese metaphysical culture and the rise and fall of cultivation civilization. The project adopts the "Tiān Dì Xuán Huáng, Yǔ Zhòu Hóng Huāng" (天地玄黄，宇宙洪荒) framework, organizing the knowledge system of cultivation civilization into eight major modules.

### Core Question

> Why has an ancient civilization with sophisticated spiritual technologies left only scattered traces in modern times?

We are not trying to prove that cultivation is real, but to understand why so many ancients believed it was real.

### ✨ Features

- 🎨 **Immersive Design** - Carefully crafted visual effects and interactive experiences
- 📚 **Eight Modules** - Heavenly Time, Geography, Metaphysics, History, Space, Time, Primordial, and Lost
- 🌙 **Dark Theme** - Mysterious atmosphere befitting cultivation culture
- ⚡ **Lightning Fast** - Static generation, instant first load
- 📱 **Responsive Design** - Perfect adaptation to all devices
- 🔍 **Full-text Search** - Quickly locate content of interest
- 💾 **Local Storage** - Bookmarks and history persisted locally

---

## 🗺️ Content Architecture

```
Portal (入口)
    │
    ▼
Homepage ─ Eight Module Navigation
    │
    ├── Tiān (天) ─ Heavenly Time
    │   ├── Almanac & Fortune
    │   ├── BaZi Analysis
    │   ├── Celestial Movements
    │   ├── Solar Terms
    │   └── Daily Wisdom
    │
    ├── Dì (地) ─ Geography
    │   ├── Compass Direction
    │   ├── Sacred Caves
    │   ├── Feng Shui
    │   ├── Geography Records
    │   └── Directional Fortune
    │
    ├── Xuán (玄) ─ Metaphysics
    │   ├── I Ching Divination
    │   ├── Destiny Analysis
    │   ├── Talisman Recognition
    │   ├── Formation Layout
    │   └── Metaphysical Classics
    │
    ├── Huáng (黄) ─ History
    │   ├── Historical Scrolls
    │   ├── Era Conversion
    │   ├── Notable Figures
    │   ├── Major Events
    │   └── Secret Archives
    │
    ├── Yǔ (宇) ─ Space
    │   ├── World Map
    │   ├── Spatial Layers
    │   ├── Myriad Realms
    │   └── Directional Worlds
    │
    ├── Zhòu (宙) ─ Time
    │   ├── Timeline
    │   ├── Eras
    │   ├── Reincarnation
    │   └── Calendar Systems
    │
    ├── Hóng (洪) ─ Primordial
    │   ├── Divine Beasts
    │   ├── Evil Beasts
    │   ├── Deity Genealogy
    │   ├── Auspicious Symbols
    │   └── Patron Beasts
    │
    └── Huāng (荒) ─ Lost
        ├── Cultivation Methods
        ├── Secret Techniques
        ├── Artifacts
        ├── Elixirs
        ├── Charms
        └── Ruins
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0 or pnpm >= 8.0.0

### Installation

```bash
# Clone the repository
git clone https://github.com/badhope/LingXu.git

# Navigate to directory
cd LingXu

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev

# Visit http://localhost:4321
```

### Build

```bash
# Production build
npm run build

# Preview build result
npm run preview
```

### Code Quality

```bash
# TypeScript type check
npm run typecheck

# ESLint check
npm run lint

# Format code
npm run format
```

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| [Astro](https://astro.build) | 5.x | Static Site Framework |
| [TypeScript](https://www.typescriptlang.org/) | 5.x | Type Safety |
| [Tailwind CSS](https://tailwindcss.com/) | 4.x | Styling System |
| [Zustand](https://zustand-demo.pmnd.rs/) | 5.x | State Management |
| [Vite](https://vitejs.dev/) | 6.x | Build Tool |

---

## 📁 Project Structure

```
LingXu/
├── .github/                    # GitHub Configuration
│   ├── workflows/              # GitHub Actions
│   ├── ISSUE_TEMPLATE/         # Issue Templates
│   └── PULL_REQUEST_TEMPLATE/  # PR Template
├── docs/                       # Documentation
│   ├── architecture.md         # Architecture Design
│   ├── content-model.md        # Content Model
│   ├── motion-principles.md    # Motion Principles
│   └── ...
├── public/                     # Static Assets
│   ├── favicon.svg
│   └── sitemap.xml
├── src/
│   ├── components/             # Components
│   │   ├── interactive/        # Interactive Components
│   │   ├── layout/             # Layout Components
│   │   ├── portal/             # Portal Components
│   │   ├── splash/             # Splash Screen
│   │   ├── ui/                 # UI Components
│   │   └── widgets/            # Widgets
│   ├── data/                   # Data Configuration
│   ├── layouts/                # Page Layouts
│   ├── lib/                    # Utilities
│   ├── pages/                  # Page Routes
│   ├── stores/                 # State Stores
│   └── styles/                 # Global Styles
├── astro.config.mjs            # Astro Configuration
├── tailwind.config.mjs         # Tailwind Configuration
├── tsconfig.json               # TypeScript Configuration
├── LICENSE                     # License
├── CHANGELOG.md                # Changelog
├── CONTRIBUTING.md             # Contributing Guide
├── CODE_OF_CONDUCT.md          # Code of Conduct
├── SECURITY.md                 # Security Policy
├── README.md                   # Chinese Documentation
└── README.en.md                # English Documentation
```

---

## 🎨 Design Principles

### Visual Style

- **Color**: Gold (#c9a227) as the primary color, symbolizing the mystery and solemnity of cultivation civilization
- **Typography**: Chinese serif fonts like "Source Han Serif" and "ZCOOL XiaoWei"
- **Motion**: Particle effects, Taiji rotation, portal animations for immersive experience

### Interaction Design

- **Ritualistic Entry**: Portal animation creates a sense of ceremony when entering the archive
- **Modular Navigation**: Eight-character framework clearly presents content structure
- **Progressive Exploration**: From overview to details, layer by layer

---

## 📊 Project Statistics

![GitHub repo size](https://img.shields.io/github/repo-size/badhope/LingXu)
![GitHub commit activity](https://img.shields.io/github/commit-activity/t/badhope/LingXu)
![GitHub last commit](https://img.shields.io/github/last-commit/badhope/LingXu)
![GitHub stars](https://img.shields.io/github/stars/badhope/LingXu?style=social)

---

## 🤝 Contributing

We welcome all forms of contribution!

### Ways to Contribute

- 🐛 [Report Bugs](https://github.com/badhope/LingXu/issues/new?template=bug_report.md)
- 💡 [Request Features](https://github.com/badhope/LingXu/issues/new?template=feature_request.md)
- 📝 Improve Documentation
- 🔧 Submit Code

### Contribution Process

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'feat: add some feature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

For detailed guidelines, see [Contributing Guide](CONTRIBUTING.md).

---

## 📜 License

This project is open-sourced under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

### Content Sources

- Taoist and Buddhist classics and related commentaries
- Pre-Qin and Han dynasty texts like "Huangdi Neijing", "Shan Hai Jing", "I Ching"
- Historical fantasy novels and immortal hero biographies
- Research findings by modern scholars

### Disclaimer

> The content collected in LingXu is for cultural research and appreciation purposes only. We do not provide any form of fortune-telling, divination, or ritual services, nor do we encourage any form of blind cultivation. The religious content involved is presented as cultural heritage and does not represent the position of this site.

---

## 📮 Contact

- **Website**: [https://lingxu.xn--jbtt24bux6a.com](https://lingxu.xn--jbtt24bux6a.com)
- **Issues**: [GitHub Issues](https://github.com/badhope/LingXu/issues)

---

<div align="center">

**愿见者得度，闻者觉悟**

*May those who see find liberation, may those who hear attain enlightenment.*

[⬆ Back to Top](#lingxu)

</div>
