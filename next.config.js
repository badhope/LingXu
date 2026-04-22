/** @type {import('next').NextConfig} */
const isGitHubPages = process.env.NEXT_PUBLIC_BASE_PATH === '/LingXu'

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  compress: true,
  poweredByHeader: false,
  
  images: {
    unoptimized: true,
  },

  basePath: isGitHubPages ? '/LingXu' : '',
  assetPrefix: isGitHubPages ? '/LingXu/' : '',
  trailingSlash: true,

  output: 'export',
}

module.exports = nextConfig
