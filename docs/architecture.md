# Architecture Documentation

## Overview

LingXu is a static website built with Astro, designed as an immersive digital archive for China's historical cultivation civilization.

## Technology Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| Framework | Astro 4.x | Static site generation |
| Language | TypeScript | Type safety |
| Styling | Tailwind CSS | Utility-first styling |
| Content | MDX | Markdown + components |
| Deployment | GitHub Pages | Free hosting |
| CI/CD | GitHub Actions | Automated builds |

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── interactive/  # Animation/effect components
│   ├── layout/       # Layout components (Header, Footer)
│   ├── ui/          # Base UI components
│   └── widgets/      # Complex composed components
├── content/          # Content collection definitions
├── data/            # Static data (navigation)
├── layouts/         # Page layout templates
├── lib/             # Utility functions/constants
├── pages/           # Route pages
└── styles/          # Global styles
```

## Routing Strategy

Astro uses file-based routing. Each `.astro` or `.mdx` file in `src/pages/` becomes a route.

### Route Categories

1. **Top-level pages**: `index.astro`, `about.astro`, `404.astro`
2. **Section indexes**: `[section]/index.astro`
3. **Content pages**: `[section]/[slug].mdx`

### Base Path

The site is deployed under `/LingXu` base path. This is configured in:
- `astro.config.mjs` (site configuration)
- `src/lib/constants.ts` (base constant)
- Used in layouts via `import.meta.env.BASE_URL`

## Layout Architecture

### BaseLayout

The root layout providing:
- HTML document structure
- Global CSS import
- Header and Footer
- Mist effect layer
- Meta tags

### PageLayout

Section page layout with:
- Hero section with gradient
- Breadcrumb navigation
- Section-specific color theming
- Content slot

### ArticleLayout

Content page layout with:
- Article header (title, subtitle, metadata)
- Quote display
- Table of contents (future)
- Related articles section

## Component System

### Component Categories

**Interactive Components**
- `ParticleField.astro`: Background particle animation
- `MistEffect.astro`: Atmospheric mist overlay
- `ScrollReveal.astro`: Scroll-triggered animations

**Layout Components**
- `Header.astro`: Site header with navigation
- `Footer.astro`: Site footer

**UI Components**
- `Badge.astro`: Status/category labels
- `Card.astro`: Content preview cards
- `SectionHeader.astro`: Section titles
- `Timeline.astro`: Historical timeline
- `Breadcrumbs.astro`: Navigation breadcrumbs

**Widget Components**
- `ArchiveCard.astro`: Archive entry preview
- `SectionNav.astro`: Section navigation

### Component Props Pattern

All components use TypeScript interfaces for props:

```typescript
interface Props {
  title: string;
  description: string;
  // ...
}
```

## Content Collections

Astro content collections provide type-safe content management.

### Collection Definitions

Located in `src/content/config.ts`:

- `archive`: Era studies, historical content
- `medicine`: Medical classics, health
- `myth`: Mythology, supernatural
- `dharma`: Religious teachings
- `realms`: Cultivation realms

### Schema Extension Pattern

Each collection extends a base schema:

```typescript
const archiveCollection = defineCollection({
  type: 'content',
  schema: baseSchema.extend({
    category: z.enum(['era', 'cultivation', 'theory']),
  }),
});
```

## State Management

No client-side state management needed. This is a static site.

Static data is stored in:
- `src/data/navigation.ts` - Navigation structure
- `src/lib/constants.ts` - Site configuration

## Build Process

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

### Deployment

GitHub Actions automatically builds and deploys on push to main branch.

## Performance Considerations

1. **Static Generation**: All pages pre-rendered at build time
2. **Component Islands**: Interactive components use minimal JS
3. **CSS Animations**: Prefer CSS animations over JS
4. **Image Optimization**: Astro's built-in image optimization
5. **Font Loading**: Google Fonts with display=swap

## Future Extensibility

### i18n Infrastructure

The architecture supports future i18n:
- Content organization allows for language-based routing
- UI strings centralized in constants
- Translation keys pattern can be added

### Additional Features

The modular architecture supports adding:
- Search (Algolia, Pagefind)
- Comments (Giscus, utterances)
- Analytics (Plausible, Umami)
- CMS integration (Sanity, Contentful)