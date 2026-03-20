# Handoff Documentation

**Version**: 1.0.0
**Last Updated**: 2026-03-21
**Status**: Framework Complete, Handoff Ready

---

## 1. Project Purpose

LingXu (灵墟) is an immersive digital archive documenting China's historical cultivation civilization (修行文明) through the lens of the "Age of Declining Dharma" (末法纪) framework.

**Key Question**: Why does a once-genuine cultivation civilization leave only fragments in the modern world?

**Public UI Language**: Chinese-first
**Code/Routing Language**: English-first
**Deployment**: GitHub Pages (static)

---

## 2. Implementation Status

### 2.1 Completed Components

| Component | Status | Notes |
|-----------|--------|-------|
| Route Skeleton | ✅ Complete | 28 pages built |
| Template System | ✅ Complete | BaseLayout, PageLayout, ArticleLayout, 404 |
| Content Schema | ✅ Complete | 5 collections with base+collection-specific fields |
| Navigation | ✅ Complete | 5 sections with mobile support |
| Design Tokens | ✅ Complete | Section colors, typography, spacing |
| Motion Foundation | ✅ Complete | CSS animations, particle effects |
| Mobile Structure | ✅ Complete | Responsive, touch-friendly |
| Documentation | ⚠️ 90% | Missing motion-principles, handoff |
| Build System | ✅ Complete | Astro + Tailwind + MDX |

### 2.2 Content Status

| Section | Total | Published | Draft |
|---------|-------|-----------|-------|
| Archive | 4 | 1 | 3 |
| Medicine | 4 | 1 | 3 |
| Myth | 4 | 1 | 3 |
| Dharma | 4 | 1 | 3 |
| Realms | 4 | 1 | 3 |
| **Total** | **20** | **5** | **15** |

### 2.3 Known Gaps (Non-Blocking)

These are recommended improvements but do not block handoff:

- [ ] Component barrel exports (HIGH - recommend creating `src/components/index.ts`)
- [ ] ESLint/Prettier configuration (HIGH - recommend adding)
- [ ] CHANGELOG.md (MEDIUM - recommend creating)
- [ ] 500 error page (LOW - currently only 404 defined)
- [ ] Component duplicate colorClasses (LOW - low priority refactor)

---

## 3. Frozen Decisions (DO NOT CHANGE)

These decisions are architectural core. Changing them requires full project review.

### 3.1 Project Identity

| Decision | Value | Evidence |
|----------|-------|----------|
| Project Name | 灵墟 (LingXu) | SITE_CONFIG.name |
| Project Meaning | "灵炁墟烬" - Spiritual energy ashes | README.md |
| Core Premise | Age of Declining Dharma framework | worldbuilding.md |
| Public UI Language | Chinese-first | All visible content |

### 3.2 Structure (5 Top-Level Sections)

| Section | Chinese | Route | Color |
|---------|---------|-------|-------|
| Archive | 档案馆 | /archive | Gold |
| Medicine | 典籍 | /medicine | Jade |
| Myth | 神话 | /myth | Amethyst |
| Dharma | 法门 | /dharma | Sapphire |
| Realms | 境界 | /realms | Ochre |

**RULE**: DO NOT rename, reorder, add, or remove these five sections without updating:
- `src/data/navigation.ts` NAV_ITEMS
- `src/content/config.ts` sectionColors mapping
- `src/lib/constants.ts` SITE_CONFIG
- All layout color mappings
- All documentation referencing sections

### 3.3 Chronology (Six-Era Model)

| Era | Chinese | Period |
|-----|---------|--------|
| Primordial | 太初纪 | Cosmic origin |
| Divine | 神人纪 | Ancient times |
| Human Sovereign | 人皇纪 | Three Sovereigns |
| Dharma Lineage | 法脉纪 | Buddhist-Daoist |
| Withdrawal | 隐退纪 | Decline begins |
| Age of Declining Dharma | 末法纪 | Modern era |

**RULE**: DO NOT modify the era names or order without updating worldbuilding.md

### 3.4 Content Hierarchy

```
Section (板块) → Topic (主题) → Entry (条目)
```

**RULE**: Content must use the defined schema. Any new fields require updating `src/content/config.ts`

### 3.5 Route Naming Conventions

| Content Type | Pattern | Example |
|--------------|---------|---------|
| Section Index | `/[section]` | /archive |
| Entry Page | `/[section]/[slug]` | /archive/end-of-dharma-age |
| Static Pages | `/[page]` | /about |

**RULE**:
- Use lowercase slugs
- Use hyphens between words
- Use pinyin transliteration for Chinese content
- Match file name to URL slug

### 3.6 Template Categories

| Template | File | Purpose |
|----------|------|---------|
| BaseLayout | `BaseLayout.astro` | Root HTML, global styles |
| PageLayout | `PageLayout.astro` | Section index pages |
| ArticleLayout | `ArticleLayout.astro` | Long-form content |
| 404 | `404.astro` | Not found page |

**RULE**: New page types should extend these layouts, not create one-offs

### 3.7 Design System Direction

| Element | Standard | Location |
|---------|----------|----------|
| Background | #080808 dark | global.css |
| Typography | Noto Serif SC (body), ZCOOL XiaoWei (display) | global.css |
| Section Colors | 5 fixed palettes | navigation.ts SECTION_COLORS |
| Motion | CSS-first, subtle, ambient | global.css animations |

### 3.8 Base Path Configuration

Base path is defined in TWO places and MUST be kept in sync:

1. `astro.config.mjs` → `base: '/LingXu'`
2. `src/lib/constants.ts` → `base: '/LingXu'`

**RULE**: If changing deployment path, update BOTH files

---

## 4. Flexible Areas (May Extend Freely)

### 4.1 Content Depth

- Expand draft entries with more sections
- Add subsections within existing entries
- Develop topic-specific deep dives
- Create comparative articles (cross-section)

### 4.2 Article Volume

- Add new entries within existing sections
- Create new topics within sections
- Expand related articles array
- Add more tags for cross-referencing

### 4.3 Visual Ornamentation

- Add featured images (requires schema update)
- Create section-specific decorative SVGs
- Add inline diagrams or infographics
- Develop illustration style guide

### 4.4 Motion Modules

- Add scroll-triggered reveals to new components
- Create section-specific particle effects
- Add hover micro-interactions
- Implement loading animations

### 4.5 Bilingual UI (Future)

- i18n infrastructure is structurally reserved
- Translation keys pattern can be added later
- Content locale field can be added to schema

### 4.6 Atlas/Search Features

- Glossary pages
- Topic index pages
- Search functionality (Pagefind)
- Tag-based navigation

---

## 5. Route and Template Conventions

### 5.1 Adding New Content

**Step 1**: Create MDX file in appropriate section
```
src/pages/[section]/[slug].mdx
```

**Step 2**: Use frontmatter template:
```yaml
---
title: Entry Title
subtitle: Optional Subtitle
description: Brief summary for cards/meta
section: Section Chinese Name
category: section-specific-category
order: number
featured: boolean
status: planned|draft|ready|published
tags: [tag1, tag2]
era: Era Name
quote: "Notable quote"
quoteSource: Attribution
updatedAt: YYYY年M月
related:
  - title: Related Entry
    href: /section/slug
    description: Why related
---
```

**Step 3**: Import and use ArticleLayout
```mdx
import ArticleLayout from '../../layouts/ArticleLayout.astro';

<ArticleLayout
  title="Entry Title"
  section="Section"
  sectionColor="gold"
  ...
>
## Content
</ArticleLayout>
```

### 5.2 Adding New Section Pages

**Step 1**: Create index page
```
src/pages/[section]/index.astro
```

**Step 2**: Use PageLayout
```astro
import PageLayout from '../../layouts/PageLayout.astro';

<PageLayout
  title="Section Name"
  description="Section description"
  section="档案馆"
  sectionColor="gold"
>
```

### 5.3 Extending Templates

**DO**: Add props to existing layouts
**DO**: Create new layouts that import BaseLayout
**DO NOT**: Copy-paste BaseLayout code into new pages

---

## 6. Content Authoring Conventions

### 6.1 Tone Guidelines

| Do | Don't |
|----|-------|
| Use formal Chinese literary style | Use casual internet slang |
| Acknowledge uncertainty in claims | Make absolute statements |
| Reference classical texts | Cite modern popular fiction as authority |
| Connect to worldbuilding framework | Introduce contradictory lore |
| Use Chinese punctuation throughout | Mix English and Chinese punctuation |

### 6.2 Frontmatter Requirements

| Field | Required | Notes |
|-------|----------|-------|
| title | YES | Used in page title, headers, cards |
| description | YES | Used in meta, cards, SEO |
| section | YES | Must match parent section exactly |
| status | YES | Controls visibility |
| category | Collection-specific | Required for archive/medicine/myth |
| order | NO | Controls sort order within section |

### 6.3 Writing Structure

```
## 导言 (Introduction)
- Context and significance
- Connection to worldbuilding

## Main Sections (h2)
### Subsection (h3)
#### Detail (h4)

## Related Content
- Cross-references to other entries
```

---

## 7. Design and Tone Constraints

### 7.1 Visual Constraints

| Element | Constraint |
|---------|-------------|
| Background | Must remain dark (#080808 base) |
| Primary Text | Must maintain readability contrast |
| Section Colors | Must use defined palettes only |
| Animations | Must be subtle, not distracting |
| Mobile | Must work without hover states |

### 7.2 Worldbuilding Constraints

| Element | Constraint |
|---------|-------------|
| Core Premise | Must align with Age of Declining Dharma |
| Era Names | Must use defined six-era names exactly |
| Section Scope | Must relate to defined section themes |
| Remnant Theory | All content should connect to remnant categories |

---

## 8. Mobile and Motion Quality Gates

### 8.1 Mobile Quality Checklist

- [ ] All touch targets minimum 44x44px
- [ ] No hover-dependent information
- [ ] Navigation works without hover
- [ ] Typography readable on small screens
- [ ] Horizontal scroll does not occur
- [ ] Images scale appropriately
- [ ] Performance acceptable on 3G

### 8.2 Motion Quality Checklist

- [ ] Animations respect `prefers-reduced-motion`
- [ ] No motion that causes discomfort
- [ ] Performance: 60fps target
- [ ] CSS-first: only use JS for complex animations
- [ ] Loading states have motion feedback
- [ ] Scroll reveals are subtle (fade, slide, not bounce)

---

## 9. Release Priorities After Handoff

### Phase 1: Stabilization (Do First)

1. [ ] Create `docs/motion-principles.md`
2. [ ] Create `docs/handoff.md` (this file)
3. [ ] Add ESLint/Prettier configuration
4. [ ] Create component barrel export
5. [ ] Run full build verification

### Phase 2: Content Expansion (V1.1.0)

1. [ ] Complete all 15 draft entries
2. [ ] Add featured images (requires schema update)
3. [ ] Implement search functionality
4. [ ] Create topic index pages

### Phase 3: Enhanced Navigation (V1.2.0)

1. [ ] Interactive timeline
2. [ ] Cross-linking system
3. [ ] Era-based filtering
4. [ ] Reading path recommendations

### Phase 4: Interactive Features (V1.3.0)

1. [ ] Realm comparison tool
2. [ ] Visual maps
3. [ ] Interactive diagrams
4. [ ] Progress tracking

---

## 10. Governance Rules Summary

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

## 11. Quick Reference

### Key Files

| File | Purpose |
|------|---------|
| `src/lib/constants.ts` | Site configuration |
| `src/data/navigation.ts` | Navigation structure |
| `src/content/config.ts` | Content schema |
| `src/styles/global.css` | Global styles |
| `astro.config.mjs` | Astro configuration |

### Key Directories

| Directory | Purpose |
|----------|---------|
| `src/pages/` | All routes |
| `src/layouts/` | Page templates |
| `src/components/` | Reusable components |
| `docs/` | All documentation |

### Emergency Rollback

If something breaks:
1. `git log --oneline -10` to find recent changes
2. `git diff HEAD~1` to see specific changes
3. `git checkout -- .` to discard all changes
4. Rebuild with `npm run build`

---

**End of Handoff Document**
For questions, refer to docs/architecture.md and docs/worldbuilding.md