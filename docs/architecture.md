# Architecture Documentation

## Overview

LingXu is a static website built with Astro, designed as an immersive digital archive for China's historical cultivation civilization. **V2.0** introduces the Eight Module System (天地玄黄，宇宙洪荒).

## Technology Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| Framework | Astro 4.x | Static site generation |
| Language | TypeScript | Type safety |
| Styling | Tailwind CSS | Utility-first styling |
| Deployment | GitHub Pages | Free hosting |
| CI/CD | GitHub Actions | Automated builds |

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── interactive/  # Animation/effect components
│   ├── layout/       # Layout components (Header, Footer)
│   ├── portal/       # Entry portal components
│   └── ui/          # Base UI components
├── data/            # Static data
│   ├── modules.ts    # Eight modules configuration
│   └── navigation.ts # Navigation items
├── layouts/         # Page layout templates
│   ├── BaseLayout.astro    # Root layout
│   └── ModuleLayout.astro  # Module page layout
├── lib/             # Utility functions/constants
├── pages/           # Route pages (八大模块)
│   ├── tian/        # Celestial module
│   ├── di/          # Geography module
│   ├── xuan/        # Esoteric module
│   ├── huang/       # History module
│   ├── yu/          # Space module
│   ├── zhou/        # Time module
│   ├── hong/        # Primordial module
│   └── huang-lost/ # Lost civilization module
└── styles/          # Global styles
```

## Module System

### Module Configuration

Each module is configured in `src/data/modules.ts`:

```typescript
interface ModuleConfig {
  id: string;           // Module identifier (e.g., 'tian', 'di')
  char: string;         // Single character (e.g., '天')
  name: string;         // Full name (e.g., '天时')
  pinyin: string;       // Pinyin romanization
  description: string;  // Module description
  href: string;         // Module URL path
  color: string;        // Primary color hex
  bgGradient: string;   // Background gradient
  theme: {              # Color theme
    primary: string;
    secondary: string;
    accent: string;
    bg: string;
    text: string;
    muted: string;
  };
  subModules: SubModule[]; // List of submodules
}
```

### Eight Modules

| Module | ID | Description | Submodules |
|--------|-----|-------------|------------|
| 天 | tian | Celestial timing | calendar, bazi, stars, solar-terms, daily-quote |
| 地 | di | Geography & fengshui | compass, caves, fengshui, geography, directions |
| 玄 | xuan | Esoteric arts | yijing, destiny, talismans, formations, classics |
| 黄 | huang | History | scrolls, era-convert, figures, events, secrets |
| 宇 | yu | Space & realms | world-map, layers, realms, directions-world |
| 宙 | zhou | Time & reincarnation | reincarnation, calendar-system, eras, timeline |
| 洪 | hong | Primordial myth | divine-beasts, evil-beasts, birth-match, deity-tree, auspicious |
| 荒 | huang-lost | Lost civilization | techniques, medicine, artifacts, charms, ruins |

## Routing Strategy

Astro uses file-based routing. Each `.astro` file in `src/pages/` becomes a route.

### Route Categories

1. **Entry**: `/` → Portal entrance
2. **Module indexes**: `/[module]/` (e.g., `/tian/`, `/di/`)
3. **Submodule pages**: `/[module]/[submodule]` (e.g., `/tian/calendar/`)

### Base Path

The site is deployed under `/LingXu` base path. This is configured in:
- `astro.config.mjs` (site configuration)
- `src/lib/constants.ts` (base constant)

## Layout Architecture

### BaseLayout

The root layout providing:
- HTML document structure
- Global CSS import
- Header and Footer
- Mist effect layer
- Interactive effects (ParticleField, MouseEffects, etc.)

### ModuleLayout

Module page layout with:
- Module-specific color theming
- Breadcrumb navigation
- Back to home link
- Module content slot

## Component System

### Interactive Components
- `ParticleField.astro`: Background particle animation
- `MistEffect.astro`: Atmospheric mist overlay
- `MouseEffects.astro`: Cursor effects
- `DynamicBackground.astro`: Dynamic gradient background
- `ScrollReveal.astro`: Scroll-triggered animations
- `Typewriter.astro`: Typewriter text effect

### Layout Components
- `Header.astro`: Site header with navigation
- `Footer.astro`: Site footer
- `Portal.astro`: Entry portal gate

### UI Components
- `Badge.astro`: Status/category labels
- `Card.astro`: Content preview cards
- `SectionHeader.astro`: Section titles
- `Timeline.astro`: Historical timeline
- `Breadcrumbs.astro`: Navigation breadcrumbs
- `SettingsPanel.astro`: User preferences panel
