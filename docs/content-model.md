# Content Model Documentation

## Overview

LingXu uses Astro Content Collections to manage content with type-safe schemas. All content is authored in MDX format.

## Schema Architecture

### Base Schema

All content collections extend a base schema:

```typescript
const baseSchema = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  description: z.string(),
  section: z.string(),
  topic: z.string().optional(),
  tags: z.array(z.string()).default([]),
  era: z.string().optional(),
  featured: z.boolean().default(false),
  order: z.number().optional(),
  updatedAt: z.string().optional(),
  quote: z.string().optional(),
  quoteSource: z.string().optional(),
  status: z.enum(['planned', 'draft', 'ready', 'published']).default('draft'),
  related: z.array(z.object({
    title: z.string(),
    href: z.string(),
    description: z.string(),
  })).optional(),
});
```

## Field Specifications

### Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `title` | string | Entry title, used in page title and headers |
| `description` | string | Brief summary, used in meta tags and cards |
| `section` | string | Must match parent section name exactly |

### Optional Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `subtitle` | string | - | Secondary title/alternative heading |
| `topic` | string | - | Topic within section for grouping |
| `tags` | string[] | [] | Array of tag strings |
| `era` | string | - | Historical era classification |
| `featured` | boolean | false | Show in featured sections |
| `order` | number | - | Sort order within section/topic |
| `updatedAt` | string | - | Last modification date |
| `quote` | string | - | Featured quote text |
| `quoteSource` | string | - | Quote attribution |
| `status` | enum | 'draft' | Content maturity level |
| `related` | Related[] | - | Array of related article links |

## Status Values

| Status | Meaning | Visibility |
|--------|---------|------------|
| `planned` | Approved concept, not started | Hidden |
| `draft` | Initial content exists | Hidden (dev) |
| `ready` | Complete but unreviewed | Hidden (dev) |
| `published` | Approved for public | Visible |

## Collection-Specific Schemas

### Archive Collection

```typescript
const archiveCollection = defineCollection({
  type: 'content',
  schema: baseSchema.extend({
    category: z.enum(['era', 'cultivation', 'theory']),
  }),
});
```

**Categories:**
- `era`: Historical era studies
- `cultivation`: Cultivation civilization topics
- `theory`: Theoretical frameworks

### Medicine Collection

```typescript
const medicineCollection = defineCollection({
  type: 'content',
  schema: baseSchema.extend({
    category: z.enum(['classic', 'theory', 'practice']),
  }),
});
```

**Categories:**
- `classic`: Classical text commentary
- `theory`: Theoretical concepts
- `practice`: Practical applications

### Myth Collection

```typescript
const mythCollection = defineCollection({
  type: 'content',
  schema: baseSchema.extend({
    category: z.enum(['beast', 'deity', 'place', 'event']),
  }),
});
```

**Categories:**
- `beast`: Mythical creatures
- `deity`: Divine beings
- `place`: Mythical locations
- `event`: Mythical events

### Dharma Collection

```typescript
const dharmaCollection = defineCollection({
  type: 'content',
  schema: baseSchema.extend({
    tradition: z.enum(['buddhism', 'daoism', 'both']),
  }),
});
```

**Traditions:**
- `buddhism`: Buddhist content only
- `daoism`: Daoist content only
- `both`: Content covering both

### Realms Collection

```typescript
const realmsCollection = defineCollection({
  type: 'content',
  schema: baseSchema.extend({
    realmType: z.enum(['qi', 'body', 'spirit', 'combined']),
  }),
});
```

**Realm Types:**
- `qi`: Qi cultivation focused
- `body`: Body cultivation focused
- `spirit`: Spirit cultivation focused
- `combined`: Integrated cultivation

## Frontmatter Example

```yaml
---
title: 末法纪总论
subtitle: 末法纪的形成、三重含义及其对修行文明的影响
description: 阐释末法纪的形成原因、三重含义及其对修行文明的深远影响。
section: 档案馆
category: era
order: 1
featured: true
tags: [末法, 文明演变, 修行衰落, 历史分期, 宗教, 法脉]
era: 末法纪
quote: 真法未必尽失，或仅是不再被今人所识。
quoteSource: 灵墟档案馆
updatedAt: 2026年3月
status: published
related:
  - title: 修行境界概述
    href: /realms/cultivation-realm-system
    description: 从炼气到渡劫，了解修行文明的核心境界体系
---
```

## Content Authoring Guidelines

### File Naming

- Use lowercase
- Use hyphens to separate words
- Match the slug in URL
- Example: `end-of-dharma-age.mdx` → `/archive/end-of-dharma-age`

### Writing Style

- Use Chinese punctuation throughout (，。：；？！""『』)
- First mention of English terms: include in parentheses
- Maintain heading hierarchy (h2 → h3 → h4)
- Use blockquotes for quotes and callouts

### Frontmatter Requirements

1. Always include `title`, `description`, `section`
2. Set `status` appropriately
3. Use `tags` for cross-referencing
4. Include `related` entries when applicable

## Querying Content

### Get All Entries in Collection

```typescript
import { getCollection } from 'astro:content';

const allArchive = await getCollection('archive');
```

### Get Entries by Status

```typescript
const published = allArchive.filter(entry => entry.data.status === 'published');
```

### Get Featured Entries

```typescript
const featured = allArchive.filter(entry => entry.data.featured);
```

### Sort by Order

```typescript
const sorted = allArchive.sort((a, b) => (a.data.order || 999) - (b.data.order || 999));
```

## Future Schema Extensions

Potential additions for future versions:
- `featuredImage`: Hero image support
- `readingTime`: Estimated reading time
- `difficulty`: Content difficulty level
- `prerequisites`: Required prior knowledge
- `locale`: Language variant (for i18n)