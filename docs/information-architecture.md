# Information Architecture

## Content Organization

### Three-Level Hierarchy

LingXu content is organized in three levels:

```
Section (板块) → Topic (主题) → Entry (条目)
```

### Sections (Top Level)

| Section | Chinese | Description |
|---------|---------|-------------|
| Archive | 档案馆 | Historical era studies |
| Medicine | 典籍 | Classical medical texts |
| Myth | 神话 | Mythology and legends |
| Dharma | 法门 | Buddhist and Daoist teachings |
| Realms | 境界 | Cultivation realm system |

### Content Flow

```
Homepage
├── Section Indexes (5)
│   ├── Entry Pages (20)
│   └── Related Entries
└── About Page
```

## Navigation Structure

### Primary Navigation

Located in `src/data/navigation.ts`, defines the five main sections:

```typescript
export const NAV_ITEMS = [
  { label: '档案馆', href: '/archive', description: '...' },
  { label: '典籍', href: '/medicine', description: '...' },
  { label: '神话', href: '/myth', description: '...' },
  { label: '法门', href: '/dharma', description: '...' },
  { label: '境界', href: '/realms', description: '...' },
];
```

### Section Navigation

Each section index provides:
- Section overview
- Topic grouping
- Featured entries
- Quick links

### Breadcrumb Navigation

Breadcrumbs appear on all pages except homepage:
- Home → Section → Entry
- Implemented via `Breadcrumbs.astro` component

## URL Structure

### Route Patterns

| Pattern | Example | Type |
|---------|---------|------|
| `/` | Homepage | Landing |
| `/[section]` | /archive | Section index |
| `/[section]/[entry]` | /archive/end-of-dharma-age | Entry page |
| `/about` | About | Information |
| `/404` | Not found | Error |

### URL Guidelines

- Use lowercase slugs
- Use hyphens between words
- Chinese content uses pinyin transliteration
- Maintain consistency with existing routes

## Cross-Linking Framework

### Related Articles

Each entry can specify related articles:

```yaml
related:
  - title: Related Entry
    href: /section/entry-slug
    description: Why related
```

### Section Linking

Section indexes link to:
- Featured entries
- Topic categories
- Related sections

## Content Types

### Long-form Article

Primary content type:
- Detailed exploration of topic
- Multiple sections with headings
- Quote citations
- Related articles

### Section Index

Overview pages:
- Section introduction
- Topic listing
- Featured content
- Navigation to entries

### Atlas/Index

Topic summaries (future):
- Quick overview
- Key points
- Links to detailed entries

## Taxonomy

### Tags

Tags provide cross-cutting categorization:
- Historical eras
- Philosophical concepts
- Religious traditions
- Geographic regions
- Literary works

### Era Classification

Each entry can specify era:
- 太初纪 (Primordial Era)
- 神人纪 (Divine Era)
- 人皇纪 (Human Sovereign Era)
- 法脉纪 (Dharma Lineage Era)
- 隐退纪 (Withdrawal Era)
- 末法纪 (Age of Declining Dharma)
- 现代 (Modern)

### Status Classification

Content status indicates maturity:
- `planned`: Concept exists, not started
- `draft`: Initial content written
- `ready`: Complete, needs review
- `published`: Live on site

## Information Flow

### User Paths

**Exploratory Path**
1. Homepage → Section → Entry → Related Entry

**Research Path**
1. Homepage → Specific Entry

**Discovery Path**
1. Homepage → Featured Content → Entry

### Content Gaps

Current missing content types:
- Atlas/index pages for topics
- Comparative articles (e.g., "Buddhism vs Daoism")
- Timeline integration
- Visual maps/diagrams

## Accessibility

- Semantic HTML structure
- ARIA labels on navigation
- Keyboard navigable
- Screen reader friendly
- High contrast maintained