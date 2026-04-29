/** @type {import('next').NextConfig} */
const isGitHubPages = process.env.NEXT_PUBLIC_BASE_PATH === '/LingXu'
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
  reactStrictMode: true,

  
  compress: true,
  poweredByHeader: false,
  
  images: {
    unoptimized: true,
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  basePath: isGitHubPages ? '/LingXu' : '',
  assetPrefix: isGitHubPages ? '/LingXu/' : '',
  trailingSlash: true,

  output: 'export',

  // 优化构建
  experimental: {
    optimizePackageImports: ['framer-motion', 'echarts', 'echarts-for-react', 'three', '@react-three/fiber', '@react-three/drei'],
  },

  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // 优化代码分割
      config.optimization.splitChunks = {
        chunks: 'all',
        minSize: 20000,
        maxSize: 250000,
        cacheGroups: {
          // 第三方库分离
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            priority: 10,
          },
          // Framer Motion 单独分包
          framer: {
            test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
            name: 'framer',
            chunks: 'all',
            priority: 20,
          },
          // Three.js 单独分包（体积最大）
          three: {
            test: /[\\/]node_modules[\\/](three|@react-three)[\\/]/,
            name: 'three',
            chunks: 'all',
            priority: 20,
          },
          // ECharts 单独分包
          echarts: {
            test: /[\\/]node_modules[\\/]echarts[\\/]/,
            name: 'echarts',
            chunks: 'all',
            priority: 20,
          },
          // 共享模块
          commons: {
            name: 'commons',
            minChunks: 2,
            priority: 5,
          },
        },
      }

      // 压缩优化
      config.optimization.minimize = true
      
      // 移除 console.log (生产环境)
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
    
    // 排除未使用的 three.js 模块
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
