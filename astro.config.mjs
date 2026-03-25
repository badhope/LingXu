import { defineConfig } from 'astro/config';
import path from 'path';

const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';

const alias = {
  '@components': path.resolve('./src/components'),
  '@lib': path.resolve('./src/lib'),
  '@data': path.resolve('./src/data'),
  '@stores': path.resolve('./src/stores'),
  '@layouts': path.resolve('./src/layouts'),
};

export default defineConfig({
  site: 'https://lingxu.xn--jbtt24bux6a.com',
  base: '/',
  output: 'static',
  vite: {
    resolve: {
      alias,
    },
  },
});
