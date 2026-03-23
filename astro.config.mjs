import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [
    mdx(),
    tailwind({
      applyBaseStyles: false
    })
  ],
  site: 'https://badhope.github.io/LingXu',
  base: '/LingXu',
  vite: {
    esbuild: {
      target: 'es2020',
      drop: ['console', 'debugger']
    }
  }
});
