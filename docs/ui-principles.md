# UI Principles Documentation

## Design Philosophy

LingXu's UI embodies the aesthetic of ancient cultivation civilization—mysterious, contemplative, and refined. The design should evoke the feeling of discovering forgotten knowledge in an ancient archive.

### Core Principles

1. **Immersive Atmosphere**: Dark, atmospheric backgrounds create a sense of mystery and discovery
2. **Chinese-First Typography**: Chinese characters as the primary visual language
3. **Restrained Elegance**: Minimal decoration, maximum clarity
4. **Cultural Authenticity**: Visual references drawn from traditional Chinese aesthetics

## Color System

### Background Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Deep Black | `#080808` | Primary background |
| Pure Black | `#050505` | Hero backgrounds |
| Dark Surface | `#0d0d0d` | Cards, elevated surfaces |

### Section Colors

Each section has a unique color identity:

| Section | Primary | Light | Usage |
|---------|---------|-------|-------|
| Archive | `#c9a227` | `#d4af37` | Gold tones, historical gravitas |
| Medicine | `#2d8a8a` | `#5ababa` | Jade tones, health/vitality |
| Myth | `#6b4a8a` | `#a878b8` | Amethyst tones, mystery |
| Dharma | `#2d4a6b` | `#6b9ad4` | Sapphire tones, depth |
| Realms | `#8a4a2d` | `#ba7a5a` | Ochre tones, earthiness |

### Text Colors

| Purpose | Color | Notes |
|---------|-------|-------|
| Primary Text | `#e8e8e8` | Main body text |
| Secondary Text | `#b8b8b8` | Emphasized body |
| Muted Text | `#888888` | Descriptions, metadata |
| Disabled Text | `#555555` | Tertiary information |

### Accent Colors

| Usage | Color |
|-------|-------|
| Gold Accent | `#d4af37` |
| Gold Highlight | `#e8d48b` |
| Link Hover | `#c9a227` |
| Border Subtle | `#333333` |

## Typography

### Font Families

**Chinese Display**
```
'ZCOOL XiaoWei', 'Ma Shan Zheng', cursive
```

**Chinese Body**
```
'Noto Serif SC', 'Source Han Serif SC', 'STSong', 'SimSun', serif
```

**System Fallback**
```
serif
```

### Type Scale

| Element | Size | Weight | Font |
|---------|------|--------|------|
| H1 (Page Title) | 4-6xl (responsive) | Normal | Display |
| H2 (Section) | 1.375-1.75rem | Normal | Display |
| H3 (Subsection) | 1.125-1.375rem | Normal | Display |
| H4 | 1-1.125rem | 600 | Body |
| Body | 0.875-1rem | Normal | Body |
| Small | 0.75rem | Normal | Body |
| Caption | 0.625rem | Normal | Body |

### Line Height

- Headings: 1.3-1.5
- Body: 1.8
- Tight contexts: 1.5

### Letter Spacing

| Element | Value |
|---------|-------|
| Display text | 0.15-0.3em |
| Headings | 0.05em |
| Body | 0.02em |

## Spacing System

### Base Unit

Base unit: 4px

### Spacing Scale

| Token | Value | Usage |
|-------|-------|-------|
| `space-1` | 0.25rem | Tight spacing |
| `space-2` | 0.5rem | Component internal |
| `space-4` | 1rem | Related elements |
| `space-6` | 1.5rem | Section spacing |
| `space-8` | 2rem | Major sections |
| `space-12` | 3rem | Page sections |
| `space-16` | 4rem | Major divisions |
| `space-24` | 6rem | Hero spacing |

## Layout Patterns

### Page Structure

```
┌─────────────────────────────────────┐
│           Header (fixed)            │
├─────────────────────────────────────┤
│                                     │
│           Hero Section               │
│        (min-height: 100vh)          │
│                                     │
├─────────────────────────────────────┤
│                                     │
│          Content Section             │
│         (max-width: 5xl)            │
│                                     │
├─────────────────────────────────────┤
│             Footer                   │
└─────────────────────────────────────┘
```

### Content Width

| Context | Max Width |
|---------|-----------|
| Article content | 65ch (4xl) |
| Page content | 64rem (5xl) |
| Wide content | 72rem (6xl) |

### Grid System

- Mobile: Single column
- Tablet (md): 2 columns for cards
- Desktop (lg): 3 columns for cards

## Component Styles

### Cards

**ArchiveCard**
- Background: `#0d0d0d/50`
- Border: 1px section color at 30% opacity
- Hover: Border brightens to 60%
- Padding: 1.25rem
- Border radius: 0.5rem

**Generic Card**
- Similar to ArchiveCard
- No category badge
- Used for non-archive content

### Buttons

**Primary Button**
- Background: gradient from section color
- Border: section color
- Text: section color
- Hover: scale 1.05

**Secondary Button**
- Background: transparent
- Border: `#333333`
- Text: `#666666`
- Hover: border/text become section color

### Badges

- Padding: 0.25rem 0.75rem
- Font size: 0.75rem
- Border radius: full (pill shape)
- Border: 1px section color at 40%
- Text: section color

### Dividers

**Gold Line**
- Height: 1px
- Background: gradient from transparent → `#c9a227` → transparent
- Max width: varies by context

## Visual Effects

### Background Effects

**Noise Texture**
```css
background-image: url("data:image/svg+xml,...");
```

**Gradient Overlays**
- Top gradient for scroll hint
- Bottom gradient for footer fade
- Section-specific accent gradients

### Animations

**Twinkle**
```css
@keyframes twinkle {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.8; }
}
```

**Float Gentle**
```css
@keyframes float-gentle {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
```

**Fade In / Slide Up**
- Used for scroll reveals
- 400-600ms duration
- Ease-out timing

### Sacred Geometry

Decorative elements with subtle animation:
- Positioned absolutely
- Low opacity (20-30%)
- Twinkle animation

## Responsive Behavior

### Breakpoints

| Breakpoint | Width | Context |
|------------|-------|---------|
| sm | 640px | Large phones |
| md | 768px | Tablets |
| lg | 1024px | Desktop |
| xl | 1280px | Large desktop |

### Mobile Considerations

- Touch targets minimum 44px
- No hover-dependent information
- Collapsible navigation
- Fluid typography (clamp)
- Reduced motion option respected

## Accessibility

### Color Contrast

- Primary text on background: 12.8:1 (AAA)
- Muted text on background: 5.9:1 (AA)
- Section colors on dark: minimum 4.5:1

### Focus States

- Visible focus rings on interactive elements
- Focus color matches section accent

### Screen Readers

- Semantic HTML throughout
- ARIA labels on navigation
- Alt text on decorative elements (empty for pure decoration)

## Future Considerations

### Potential Enhancements

- Light mode option
- Reduced motion toggle
- Print stylesheets
- High contrast mode
- Font size adjustment