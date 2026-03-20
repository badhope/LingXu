# Motion Principles Documentation

## Overview

LingXu's motion design serves the immersive archive aesthetic—mysterious, contemplative, and refined. Motion should evoke the feeling of ancient knowledge slowly revealing itself.

---

## Motion Philosophy

### Core Principles

1. **Subtle Atmosphere**: Motion enhances mood without demanding attention
2. **Contextual Meaning**: Animation direction aligns with content hierarchy
3. **Performance First**: CSS-first, GPU-accelerated, 60fps target
4. **Accessibility**: Respect `prefers-reduced-motion`

### Motion Hierarchy

| Level | Type | Example | Duration |
|-------|------|---------|----------|
| Ambient | Continuous | Particle float, mist drift | Infinite |
| Entrance | One-time | Fade-in, slide-up | 400-800ms |
| Interaction | Triggered | Hover scale, button press | 150-300ms |
| Transition | Navigation | Page element reveals | 300-500ms |

---

## Current Motion System

### Implemented Animations

#### Ambient Animations

**Twinkle** (global.css)
```css
@keyframes twinkle {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.8; }
}
```
- Used for: Sacred geometry decorative elements
- Duration: 3s
- Easing: ease-in-out

**Float Gentle** (global.css)
```css
@keyframes float-gentle {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
```
- Used for: Hero decorative elements, scroll indicators
- Duration: 4s
- Easing: ease-in-out

**Pulse Glow** (global.css)
```css
@keyframes pulse-glow {
  0%, 100% { opacity: 0.6; box-shadow: 0 0 20px rgba(201, 162, 39, 0.2); }
  50% { opacity: 1; box-shadow: 0 0 30px rgba(201, 162, 39, 0.4); }
}
```
- Used for: Active navigation indicators, featured badges
- Duration: 2s
- Easing: ease-in-out

#### Entrance Animations

**Fade In**
```css
.animate-fade-in {
  animation: fadeIn 600ms ease-out forwards;
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

**Slide Up**
```css
.animate-slide-up {
  animation: slideUp 600ms ease-out forwards;
}
@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
```

#### Interaction Animations

**Card Hover Scale**
```css
.active\:scale-\[0\.99\]:active {
  transform: scale(0.99);
}
.group:hover .group-hover\:scale-105 {
  transform: scale(1.05);
}
```

**Border Brighten** (via Tailwind arbitrary values)
```css
.hover\:border-\[d4af37\]\/60:hover {
  border-color: rgba(212, 175, 55, 0.6);
}
```

### Scroll-Triggered Animation

**ScrollReveal Component** (`src/components/interactive/ScrollReveal.astro`)

Uses Intersection Observer to trigger animations on scroll:

```astro
---
interface Props {
  delay?: number;
  duration?: number;
}
---
<div
  class="scroll-reveal"
  style={`--delay: ${delay || 0}ms; --duration: ${duration || 600}ms`}
>
  <slot />
</div>

<style>
  .scroll-reveal {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity var(--duration) ease-out, transform var(--duration) ease-out;
    transition-delay: var(--delay);
  }
  .scroll-reveal.revealed {
    opacity: 1;
    transform: translateY(0);
  }
</style>

<script>
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  });
  document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
</script>
```

---

## Component Motion Specifications

### ParticleField

**File**: `src/components/interactive/ParticleField.astro`

| Property | Value |
|----------|-------|
| Type | Ambient background |
| Canvas | Yes (performance) |
| Particle Count | 50 |
| Particle Size | 1-3px |
| Motion | Float upward, slight horizontal drift |
| Opacity | 0.3-0.6 |
| Color | #c9a227 (gold) |
| Performance | RequestAnimationFrame, throttled |

**Usage**: Homepage hero background
**Performance Note**: Canvas-based, GPU accelerated

### MistEffect

**File**: `src/components/interactive/MistEffect.astro`

| Property | Value |
|----------|-------|
| Type | Ambient overlay |
| Implementation | CSS gradient animation |
| Motion | Slow drift, opacity fluctuation |
| Duration | 20s cycle |
| Opacity | 0.1-0.3 |
| Color | Gradient from #c9a227 to transparent |

**Usage**: BaseLayout mist-layer div
**Performance Note**: CSS-only, minimal GPU impact

### Header Navigation

| State | Animation |
|-------|-----------|
| Hover | Color transition 300ms, underline fade |
| Active | Bottom line, scale dot indicator |
| Mobile Open | Height transition 300ms, stagger children |

### Cards (ArchiveCard, Card)

| State | Animation |
|-------|-----------|
| Hover | Border brighten, subtle scale 1.02, background shift |
| Active/Press | Scale 0.99 |
| Focus | Ring outline fade-in |

---

## Performance Guidelines

### DO

- [ ] Use CSS transforms and opacity (GPU-accelerated)
- [ ] Use `will-change` sparingly for complex animations
- [ ] Throttle scroll listeners to 60fps
- [ ] Use `IntersectionObserver` instead of scroll events
- [ ] Test on low-performance devices
- [ ] Respect `prefers-reduced-motion`

### DON'T

- [ ] Animate layout properties (width, height, margin, padding)
- [ ] Use JavaScript animations for simple transitions
- [ ] Create animations that run continuously without pausing
- [ ] Use excessive blur or shadow animations
- [ ] Block main thread with animation calculations

### Reduced Motion

All animations should respect user preferences:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Adding New Animations

### Guidelines

1. **CSS-First**: Always prefer CSS animations over JavaScript
2. **Meaningful Motion**: Animation should communicate something (hierarchy, state change, feedback)
3. **Subtle**: Err on the side of too subtle rather than too dramatic
4. **Consistent**: Match existing animation timing/duration patterns

### Pattern: New CSS Animation

```css
@layer components {
  .animate-[name] {
    animation: [name] [duration] [easing] [count];
  }

  @keyframes [name] {
    from { /* start state */ }
    to { /* end state */ }
  }
}
```

### Pattern: Scroll-Revealed Content

```astro
<ScrollReveal delay={200} duration={600}>
  <section class="content">
    <!-- Revealed on scroll -->
  </section>
</ScrollReveal>
```

### Pattern: Hover Micro-interaction

```css
.interactive-card {
  transition: transform 300ms ease, border-color 300ms ease, background-color 300ms ease;
}
.interactive-card:hover {
  transform: scale(1.02);
  border-color: var(--section-color-light);
}
```

---

## Accessibility

### Motion Safety

| Guideline | Implementation |
|-----------|----------------|
| No flashing | No animations that flash more than 3 times per second |
| No autoplay video | No video with motion without user control |
| No scroll jacking | Always allow natural scroll |
| No excessive motion | Keep animations subtle |

### Prefers Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  .particle-field { display: none; }
  .mist-layer { display: none; }
  .animate-twinkle,
  .animate-float-gentle,
  .animate-pulse-glow { animation: none; }
}
```

---

## Future Motion Extensions

### Planned (V1.3.0)

- [ ] Interactive timeline with zoom
- [ ] Realm comparison hover states
- [ ] Scroll progress indicator
- [ ] Page transition animations

### Considered but Not Planned

- [ ] Parallax scrolling (can cause motion sickness)
- [ ] 3D transforms (overkill for content site)
- [ ] Video backgrounds (performance concern)

---

## Quick Reference

| Animation | Duration | Easing | Use |
|-----------|----------|--------|-----|
| Twinkle | 3s | ease-in-out | Decorative |
| Float | 4s | ease-in-out | Hero elements |
| Pulse | 2s | ease-in-out | Active states |
| Fade in | 600ms | ease-out | Entrance |
| Slide up | 600ms | ease-out | Entrance |
| Hover | 300ms | ease | Interaction |
| Press | 150ms | ease | Interaction |

---

**Last Updated**: 2026-03-21