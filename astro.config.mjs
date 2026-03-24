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
  site: isGitHubPages ? 'https://x1882.github.io' : 'http://localhost:4321',
  base: isGitHubPages ? '/LingXu' : '/',
  output: 'static',
  vite: {
    resolve: {
      alias,
    },
  },
});
