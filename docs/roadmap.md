# Roadmap Documentation

## Version Overview

| Version | Focus | Status |
|---------|-------|--------|
| V1.0.0 | Framework Completion | ✅ Complete |
| V1.1.0 | Content Expansion | Planned |
| V1.2.0 | Enhanced Navigation | Planned |
| V1.3.0 | Interactive Features | Planned |

---

## V1.0.0 - Framework Completion

### Completed Features

- [x] Repository structure stabilization
- [x] Route skeleton completion (20 routes)
- [x] Reusable template system
- [x] Content schema with status tracking
- [x] Navigation system with mobile support
- [x] Design token stabilization
- [x] Motion/interaction foundations
- [x] Mobile-first structural readiness
- [x] English-first README
- [x] Handoff documentation (6 docs)

### Route Inventory

**Top-Level Routes (7)**
- `/` - Homepage
- `/archive` - Archive section
- `/medicine` - Medicine section
- `/myth` - Myth section
- `/dharma` - Dharma section
- `/realms` - Realms section
- `/about` - About page

**Content Routes (20)**

| Section | Published | Draft |
|---------|-----------|-------|
| Archive | 1 | 3 |
| Medicine | 1 | 3 |
| Myth | 1 | 3 |
| Dharma | 1 | 3 |
| Realms | 1 | 3 |
| **Total** | **5** | **15** |

### Content Status

| Status | Count | Description |
|--------|-------|-------------|
| Published | 5 | Live content |
| Draft | 15 | Framework skeletons |

---

## V1.1.0 - Content Expansion

### Goals

Complete all content drafts and add supporting features for content discovery.

### Content Tasks

- [ ] Complete 15 remaining entry drafts
- [ ] Add featured images for all entries
- [ ] Create topic index pages for each section
- [ ] Develop cross-linking between related entries
- [ ] Add reading time estimates

### Feature Tasks

- [ ] Implement search functionality (Pagefind or similar)
- [ ] Add reading progress indicator
- [ ] Create "related readings" sidebar component
- [ ] Add era-based filtering on section pages
- [ ] Implement tag cloud/category pages

### Entry Details

**Archive Section**
- [x] end-of-dharma-age (published)
- [ ] six-eras (draft - expand content)
- [ ] decline-of-lineages (draft - expand content)
- [ ] remnants-in-the-modern-world (draft - expand content)

**Medicine Section**
- [x] huangdi-neijing (published)
- [ ] essence-qi-spirit (draft - expand content)
- [ ] meridians-and-body (draft - expand content)
- [ ] five-phases-and-organs (draft - expand content)

**Myth Section**
- [x] shanhai-overview (published)
- [ ] strange-beasts (draft - expand content)
- [ ] lost-geography (draft - expand content)
- [ ] sacred-mountains-and-sites (draft - expand content)

**Dharma Section**
- [x] buddhism-and-daoism (published)
- [ ] end-of-dharma-in-buddhism (draft - expand content)
- [ ] daoist-lineages (draft - expand content)
- [ ] transmission-and-sects (draft - expand content)

**Realms Section**
- [x] cultivation-realm-system (published)
- [ ] qi-refinement-to-nascent-soul (draft - expand content)
- [ ] cultivation-paths (draft - expand content)
- [ ] literary-reconstruction-of-cultivation (draft - expand content)

---

## V1.2.0 - Enhanced Navigation

### Goals

Improve content discovery through better navigation, cross-linking, and recommendation systems.

### Navigation Improvements

- [ ] Interactive timeline component for Six Eras
- [ ] "Reading path" recommendations (e.g., "Start here for beginners")
- [ ] Era-based filtering across sections
- [ ] Quick-jump navigation for long articles
- [ ] Previous/Next article navigation

### Cross-Linking System

- [ ] Automatic related articles based on tags
- [ ] "See also" sections on relevant entries
- [ ] Section-to-section references
- [ ] Visual connection map between entries

### Search & Discovery

- [ ] Full-text search
- [ ] Filter by section, era, tags
- [ ] Sort by date, order, alphabetical
- [ ] "Recently updated" section
- [ ] "Featured content" rotator

---

## V1.3.0 - Interactive Features

### Goals

Add interactive elements that enhance the reading experience without compromising the static nature of the site.

### Interactive Components

- [ ] Interactive timeline (zoom, hover details)
- [ ] Realm comparison tool (side-by-side)
- [ ] Cultivation calculator (theoretical progression)
- [ ] Quiz/assessment features
- [ ] Visual maps for mythical geography

### Multimedia

- [ ] Embedded video/audio for select content
- [ ] Image galleries for mythical creatures, places
- [ ] Interactive diagrams for body/meridian systems
- [ ] Animated realm progression visualizations

### User Engagement

- [ ] "Mark as read" functionality (localStorage)
- [ ] Reading lists/collections
- [ ] Progress tracking across sections
- [ ] Share functionality for entries

---

## Future Considerations

### Technical Enhancements

**i18n Infrastructure**
- Structure already reserved in content model
- Would require routing changes
- Translation workflow needed
- Priority: Low (Chinese-first stance)

**Performance**
- Image optimization improvements
- Bundle analysis and optimization
- Core Web Vitals optimization
- Offline support (PWA)

**Platform Integration**
- API endpoints for external access
- Content export (JSON/Markdown)
- Third-party embeds support
- Analytics integration

### Content Expansions

**New Sections (Future)**
- Literature section (仙侠小说 analysis)
- Geography section (detailed maps)
- Biography section (historical figures)

**Deep Dives**
- Comparative studies (Buddhism vs Daoism)
- Regional variations
- Specific lineage histories
- Archaeological evidence

**Modern Content**
- Contemporary practitioners (if available)
- Academic perspectives
- Scientific investigations
- Personal narratives

### Community Features

- [ ] Comments (Giscus/utterances)
- [ ] Contribution guidelines
- [ ] Style guide enforcement
- [ ] Automated content checks

---

## Release Process

### Version Numbering

- Major version: Breaking changes
- Minor version: New features, content
- Patch version: Bug fixes, documentation

### Current Version

```
Version: 1.0.0
Released: 2026-03-21
Status: Framework Complete
```

### Changelog Maintenance

All significant changes should be recorded in:
- Git commit messages
- GitHub releases
- CHANGELOG.md (future)

---

## Dependencies & Risks

### External Dependencies

| Dependency | Purpose | Risk |
|------------|---------|------|
| Astro | Framework | Low (stable) |
| Tailwind | Styling | Low (stable) |
| GitHub Pages | Hosting | Low |
| Google Fonts | Typography | Low |

### Project Risks

| Risk | Mitigation |
|------|------------|
| Content bottlenecks | Clear guidelines, templates |
| Contributor retention | Good documentation, welcoming |
| Scope creep | Strict version milestones |
| Technical debt | Regular refactoring, cleanup |

---

## Contribution Guidelines

### Priority Areas for Contributors

1. Content expansion (V1.1.0)
2. Documentation improvements
3. Bug fixes
4. UI refinements

### Getting Started

See README.md "Next Steps for Contributors" section.

### Code Standards

- TypeScript strict mode
- ESLint/Prettier formatting
- Component props interfaces
- Meaningful commit messages

---

**Document Version**: 1.0.0
**Last Updated**: 2026-03-21
**Maintainer**: Project Lead