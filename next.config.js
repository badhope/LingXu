/** @type {import('next').NextConfig} */
const isGitHubPages = process.env.NEXT_PUBLIC_BASE_PATH === '/LingXu'
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  httpAgentOptions: {
    keepAlive: true,
  },
  onDemandEntries: {
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 5,
  },

  images: {
    unoptimized: true,
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 86400,
  },

  basePath: isGitHubPages ? '/LingXu' : '',
  assetPrefix: isGitHubPages ? '/LingXu/' : '',
  trailingSlash: true,
  output: 'export',
  distDir: 'out',
  cleanDistDir: true,

  experimental: {
    optimizePackageImports: ['framer-motion', 'three', '@react-three/fiber', '@react-three/drei', 'lodash-es'],
    serverMinification: true,
    serverSourceMaps: false,
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  },

  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        minSize: 20000,
        maxSize: 200000,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        cacheGroups: {
          default: false,
          defaultVendors: false,
          framework: {
            test: /[\\/]node_modules[\\/](react|react-dom|next)[\\/]/,
            name: 'framework',
            chunks: 'all',
            priority: 40,
            enforce: true,
          },
          framer: {
            test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
            name: 'framer',
            chunks: 'all',
            priority: 30,
            enforce: true,
          },
          threejs: {
            test: /[\\/]node_modules[\\/](three|@react-three)[\\/]/,
            name: 'threejs',
            chunks: 'async',
            priority: 25,
            enforce: true,
          },
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            priority: 10,
          },
          commons: {
            name: 'commons',
            minChunks: 2,
            chunks: 'all',
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      }
    }

    if (!dev) {
      config.optimization.minimize = true
    }

    return config
  },
}

module.exports = withBundleAnalyzer(nextConfig)
