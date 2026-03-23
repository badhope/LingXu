# LingXu · 灵墟

**天地玄黄 · 宇宙洪荒 · Archive of a Lost Cultivation Civilization**

*A Digital Archive Exploring the Ancient Art of Cultivation*

[![Version](https://img.shields.io/badge/version-v2.0-gold)](CHANGELOG.md)
[![Framework](https://img.shields.io/badge/framework-Astro-ff5d01)](https://astro.build)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

---

## 🎯 Project Overview

LingXu is a digital archive exploring China's ancient cultivation civilization—where practitioners achieved extraordinary abilities through spiritual refinement, breathwork, and meditative practices.

Using the framework of 「天地玄黄，宇宙洪荒」(Heaven, Earth, Mystery, History, Space, Time, Primordial Chaos, Lost), we organize all knowledge of the cultivation world into eight distinct modules.

### The Central Question

**Why does a civilization with sophisticated spiritual technologies only leave scattered traces in the modern world?**

---

## 🏛️ Eight Modules

| Module | Chinese | Focus |
|--------|---------|-------|
| **天** | Tian | Celestial timing, star movements, calendar systems |
| **地** | Di | Geography, fengshui, blessed caves and lands |
| **玄** | Xuan | Esoteric arts, Yijing, talismans, formations |
| **黄** | Huang | History, secrets, era conversions |
| **宇** | Yu | Space, realms, multi-dimensional structure |
| **宙** | Zhou | Time, reincarnation, cause and effect |
| **洪** | Hong | Primordial myth, divine beasts, totems |
| **荒** | Lost | Lost arts, ancient ruins, civilization fragments |

---

## 🏗️ Technical Architecture

### Core Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| [Astro](https://astro.build) | Static site framework | ^4.x |
| [Tailwind CSS](https://tailwindcss.com) | Utility-first styling | ^3.x |
| [TypeScript](https://typescriptlang.org) | Type safety | ^5.x |

### Project Structure

```
lingxu/
├── public/                    # Static assets
├── src/
│   ├── components/            # Astro components
│   │   ├── interactive/       # Motion, scroll effects
│   │   ├── layout/            # Header, Footer
│   │   ├── portal/            # Entry portal system
│   │   └── ui/                # Reusable UI components
│   ├── data/
│   │   ├── modules.ts         # Eight modules configuration
│   │   └── navigation.ts      # Navigation data
│   ├── layouts/               # Page templates
│   ├── lib/                   # Utilities, constants
│   ├── pages/                 # File-based routing
│   │   ├── tian/             # Celestial module
│   │   ├── di/               # Geography module
│   │   ├── xuan/             # Esoteric module
│   │   ├── huang/            # History module
│   │   ├── yu/               # Space module
│   │   ├── zhou/             # Time module
│   │   ├── hong/             # Primordial module
│   │   └── huang-lost/       # Lost civilization module
│   └── styles/                # Global styles
├── astro.config.mjs           # Astro configuration
├── tailwind.config.mjs        # Tailwind configuration
└── tsconfig.json              # TypeScript configuration
```

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Production build
npm run build
```

---

## 📜 Disclaimer

The content in LingXu is for cultural research and appreciation purposes only. We do not provide fortune-telling, divination, or ritual services, nor do we encourage any form of blind practice. All religious content is presented as cultural heritage and does not represent the position of this site.

---

## 📄 License

MIT License - See [LICENSE](LICENSE) for details.
