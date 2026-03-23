import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [mdx(), tailwind()],
  site: 'https://lingxu.xn--jbtt24bux6a.com',
  base: '/',
  output: 'static',
  vite: {
    esbuild: { target: 'es2020' }
  },
  build: {
    format: 'directory'
  }
});
