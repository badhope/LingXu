/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: '/LingXu',
  assetPrefix: '/LingXu/',
}

module.exports = nextConfig
