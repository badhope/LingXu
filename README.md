# LingXu (灵墟)

**The Age of Declining Dharma · Archive of a Lost Cultivation Civilization**

> "The spiritual energy has decayed, and the transmission of dharma has been severed. Only the ancient texts remain, carrying the remnants."

---

## Project Overview

LingXu is an immersive digital archive dedicated to China's historical cultivation civilization (修行文明). Rather than treating these as fantasy or superstition, this project approaches them as genuine cultural phenomena that shaped Chinese history, religion, medicine, and literature.

### Core Positioning

- **Worldbuilding Framework**: The "Age of Declining Dharma" (末法纪) as the central concept
- **Content Scope**: Classical texts, religious philosophy, mythology, folklore, and xianxia literature
- **Narrative Stance**: Acknowledges uncertainty but maintains that these cultural remnants hold profound meaning
- **Language Rules**: Chinese-first public UI; English for code/routing

### Tech Stack

| Technology | Purpose |
|------------|---------|
| Astro | Static site framework |
| TypeScript | Type safety |
| Tailwind CSS | Styling system |
| MDX | Content authoring |
| GitHub Pages | Deployment |

---

## Handoff Readiness Checklist

This checklist verifies the project is ready for contributor handoff.

### Architecture Readiness

- [x] Framework architecture defined (Astro + Tailwind + MDX)
- [x] Base path configured in two locations (sync required)
- [x] Content collections schema defined
- [x] Component structure established
- [x] Build system configured
- [x] Deployment automated (GitHub Actions)

### Route Readiness

- [x] All top-level routes implemented (7 routes)
- [x] All section index routes implemented (5 routes)
- [x] All content entry routes implemented (20 entries)
- [x] 404 page created
- [x] Route naming conventions documented

### Template Readiness

- [x] BaseLayout for root HTML structure
- [x] PageLayout for section index pages
- [x] ArticleLayout for long-form content
- [x] 404 page template
- [x] Template extension guidelines documented

### Documentation Readiness

- [x] README.md (this file) - executive overview
- [x] docs/handoff.md - continuation guide
- [x] docs/architecture.md - technical architecture
- [x] docs/information-architecture.md - content organization
- [x] docs/content-model.md - content schema
- [x] docs/ui-principles.md - design decisions
- [x] docs/motion-principles.md - animation guidelines
- [x] docs/roadmap.md - future plans
- [x] docs/worldbuilding.md - lore and setting

### UI/Design System Readiness

- [x] Design tokens defined (colors, typography, spacing)
- [x] Section color palettes established (5 sections)
- [x] Typography system configured (Chinese fonts)
- [x] Component library documented
- [x] Mobile-first responsive structure

### Mobile Readiness

- [x] Responsive breakpoints defined
- [x] Mobile navigation implemented
- [x] Touch targets minimum 44px
- [x] No hover-dependent information
- [x] Fluid typography implemented

### Motion Foundation Readiness

- [x] CSS animation system defined
- [x] Ambient animations (twinkle, float, pulse)
- [x] Scroll-reveal component
- [x] ParticleField component
- [x] MistEffect component
- [x] Reduced motion support

### Content Model Readiness

- [x] Base schema defined (14 fields)
- [x] Collection-specific schemas (5 collections)
- [x] Status field (planned/draft/ready/published)
- [x] Related articles field
- [x] Content authoring conventions

### Deployment Readiness

- [x] GitHub Actions workflow configured
- [x] GitHub Pages deployment configured
- [x] Build verification passes (28 pages)
- [x] Base path configured for /LingXu

---

## Frozen Decisions (DO NOT CHANGE)

These are locked architectural decisions:

| Category | Decision | Why |
|----------|----------|-----|
| Project Identity | 灵墟 (LingXu) | Brand consistency |
| Sections | 5 fixed sections | Navigation hardcoded |
| Chronology | Six-era model | Worldbuilding foundation |
| Public UI | Chinese-first | Design direction |
| Code/Routing | English-first | Development consistency |
| Content Hierarchy | Section → Topic → Entry | Schema dependency |
| Base Path | /LingXu (two locations) | Deployment coupling |

**See `docs/handoff.md` Section 3 for full frozen decisions list.**

---

## Flexible Areas

These can be extended freely:

- Content depth (expand articles)
- Article volume (add entries within sections)
- Visual ornamentation (add images, illustrations)
- Motion modules (add subtle animations)
- Atlas/glossary (add discovery features)
- Future i18n (infrastructure reserved)

**See `docs/handoff.md` Section 4 for full flexible areas list.**

---

## Current Architecture (V1.0.0)

### Repository Structure

```
LingXu/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── interactive/     # ParticleField, MistEffect, ScrollReveal
│   │   ├── layout/         # Header, Footer
│   │   ├── ui/             # Badge, Card, Timeline, Breadcrumbs
│   │   └── widgets/        # ArchiveCard, SectionNav
│   ├── content/
│   │   └── config.ts       # Collection schemas
│   ├── data/
│   │   └── navigation.ts   # Navigation structure
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   ├── PageLayout.astro
│   │   └── ArticleLayout.astro
│   ├── lib/
│   │   ├── constants.ts    # Site configuration
│   │   └── utils.ts
│   ├── pages/
│   │   ├── archive/        # 4 entries
│   │   ├── medicine/       # 4 entries
│   │   ├── myth/           # 4 entries
│   │   ├── dharma/         # 4 entries
│   │   ├── realms/         # 4 entries
│   │   ├── about.astro
│   │   ├── index.astro
│   │   └── 404.astro
│   └── styles/
│       └── global.css
├── docs/                   # Architecture documentation
├── astro.config.mjs
├── tailwind.config.mjs
└── package.json
```

---

## Routes

### Route Inventory

| Route | Title | Status |
|-------|-------|--------|
| `/` | Homepage | ✅ |
| `/archive` | Archive | ✅ |
| `/archive/end-of-dharma-age` | End of Dharma Age | Published |
| `/archive/six-eras` | Six Eras | Draft |
| `/archive/decline-of-lineages` | Decline of Lineages | Draft |
| `/archive/remnants-in-the-modern-world` | Remnants | Draft |
| `/medicine` | Medicine | ✅ |
| `/medicine/huangdi-neijing` | Huangdi Neijing | Published |
| `/medicine/essence-qi-spirit` | Essence-Qi-Spirit | Draft |
| `/medicine/meridians-and-body` | Meridians | Draft |
| `/medicine/five-phases-and-organs` | Five Phases | Draft |
| `/myth` | Mythology | ✅ |
| `/myth/shanhai-overview` | Classic of Mountains and Seas | Published |
| `/myth/strange-beasts` | Strange Beasts | Draft |
| `/myth/lost-geography` | Lost Geography | Draft |
| `/myth/sacred-mountains-and-sites` | Sacred Mountains | Draft |
| `/dharma` | Dharma | ✅ |
| `/dharma/buddhism-and-daoism` | Buddhism and Daoism | Published |
| `/dharma/end-of-dharma-in-buddhism` | End of Dharma | Draft |
| `/dharma/daoist-lineages` | Daoist Lineages | Draft |
| `/dharma/transmission-and-sects` | Transmission | Draft |
| `/realms` | Realms | ✅ |
| `/realms/cultivation-realm-system` | Cultivation Realm System | Published |
| `/realms/qi-refinement-to-nascent-soul` | Qi to Nascent Soul | Draft |
| `/realms/cultivation-paths` | Cultivation Paths | Draft |
| `/realms/literary-reconstruction-of-cultivation` | Literary Reconstruction | Draft |
| `/about` | About | ✅ |
| `/404` | Not Found | ✅ |

### Content Status

| Section | Entries | Published |
|---------|---------|-----------|
| Archive | 4 | 1 |
| Medicine | 4 | 1 |
| Myth | 4 | 1 |
| Dharma | 4 | 1 |
| Realms | 4 | 1 |
| **Total** | **20** | **5** (25%) |

---

## Template System

### Available Templates

| Template | File | Purpose |
|----------|------|---------|
| BaseLayout | `layouts/BaseLayout.astro` | Root HTML, global styles, Header/Footer |
| PageLayout | `layouts/PageLayout.astro` | Section indexes with hero headers |
| ArticleLayout | `layouts/ArticleLayout.astro` | Long-form content with quote, related |
| 404 | `pages/404.astro` | Branded not-found page |

### Component Library

| Component | Purpose |
|-----------|---------|
| Badge | Status/category labels |
| Card | Content preview cards |
| SectionHeader | Section titles with decoration |
| Timeline | Historical timeline display |
| Breadcrumbs | Navigation breadcrumb trail |
| ArchiveCard | Archive entry cards |
| SectionNav | Section navigation sidebar |
| ParticleField | Background particle effect |
| MistEffect | Atmospheric mist overlay |
| ScrollReveal | Scroll-triggered reveals |

---

## Content Model

### Base Schema Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | Entry title |
| `description` | string | Yes | Brief summary |
| `section` | string | Yes | Top-level section |
| `status` | enum | Yes | planned/draft/ready/published |
| `tags` | string[] | No | Content tags |
| `era` | string | No | Historical era |
| `featured` | boolean | No | Featured content flag |
| `order` | number | No | Sort order |
| `related` | Related[] | No | Related articles |

### Status Values

- `planned`: Concept approved, not started
- `draft`: Initial content created
- `ready`: Content complete, needs review
- `published`: Live and visible

---

## Governance Rules

### MUST NOT DO (Without Full Review)

1. Rename or reorder the 5 top-level sections
2. Change the six-era chronology names
3. Modify base path in only one location
4. Add content outside defined hierarchy without updating docs
5. Create page-specific patterns instead of extending templates
6. Add heavy animations without graceful degradation
7. Change public UI language without i18n strategy

### SHOULD DO (Every Contribution)

1. Update docs when changing architecture
2. Update roadmap when adding features
3. Run `npm run build` before committing
4. Use existing color palettes for new sections
5. Maintain Chinese punctuation in content
6. Follow frontmatter template for new entries

---

## Next Steps for Contributors

### Phase 1: Stabilization (Do First)

1. Run `npm run build` to verify build passes
2. Read `docs/handoff.md` for frozen/flexible decisions
3. Read `docs/architecture.md` for technical overview
4. Read `docs/worldbuilding.md` for lore consistency

### Phase 2: Content Expansion (V1.1.0)

1. Complete all 15 draft entries
2. Add featured images (requires schema update)
3. Implement search functionality (Pagefind)
4. Create topic index pages

### Phase 3: Enhanced Navigation (V1.2.0)

1. Interactive timeline component
2. Cross-linking system
3. Era-based filtering
4. Reading path recommendations

### Phase 4: Interactive Features (V1.3.0)

1. Realm comparison tool
2. Visual maps
3. Interactive diagrams
4. Progress tracking

---

## Quick Reference

### Key Files

| File | Purpose |
|------|---------|
| `src/lib/constants.ts` | Site configuration (base path here too) |
| `src/data/navigation.ts` | Navigation structure |
| `src/content/config.ts` | Content schema |
| `src/styles/global.css` | Global styles, animations |
| `astro.config.mjs` | Astro configuration (base path here too) |

### Emergency Rollback

```bash
git log --oneline -10  # Find recent changes
git checkout -- .      # Discard all changes
npm run build          # Rebuild
```

---

## Documentation Index

| Document | Purpose |
|----------|---------|
| README.md (this) | Executive overview, checklist |
| docs/handoff.md | Practical continuation guide |
| docs/architecture.md | Technical architecture |
| docs/information-architecture.md | Content organization |
| docs/content-model.md | Content schema details |
| docs/ui-principles.md | Design decisions |
| docs/motion-principles.md | Animation guidelines |
| docs/roadmap.md | Future plans |
| docs/worldbuilding.md | Lore and setting |

---

## License

This project is dedicated to the public domain for educational and cultural preservation purposes.

---

**Last Updated**: 2026-03-21
**Version**: 1.0.0
**Status**: Framework Complete, Handoff Ready
**Build**: 28 pages, passing