/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  swcMinify: true,

  images: {
    unoptimized: true,
  },

  basePath: '/LingXu',
  assetPrefix: '/LingXu/',
  trailingSlash: true,

  output: 'export',

  experimental: {
    optimizePackageImports: ['framer-motion', 'echarts', 'echarts-for-react', 'three', '@react-three/fiber', '@react-three/drei'],
  },

  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        minSize: 20000,
        maxSize: 250000,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            priority: 10,
          },
          framer: {
            test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
            name: 'framer',
            chunks: 'all',
            priority: 20,
          },
          three: {
            test: /[\\/]node_modules[\\/](three|@react-three)[\\/]/,
            name: 'three',
            chunks: 'all',
            priority: 20,
          },
          echarts: {
            test: /[\\/]node_modules[\\/]echarts[\\/]/,
            name: 'echarts',
            chunks: 'all',
            priority: 20,
          },
          commons: {
            name: 'commons',
            minChunks: 2,
            priority: 5,
          },
        },
      }

      config.optimization.minimize = true
      
      config.optimization.minimizer = config.optimization.minimizer.map(minimizer => {
        if (minimizer.options?.terserOptions) {
          minimizer.options.terserOptions.compress = {
            ...minimizer.options.terserOptions.compress,
            drop_console: true,
          }
        }
        return minimizer
      })
    }
    
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        'three/addons/libs': false,
      }
    }
    
    return config
  },
}

module.exports = withBundleAnalyzer(nextConfig)
