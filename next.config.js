/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // 网站直接部署在域名根路径，不需要 basePath
  basePath: '',
  assetPrefix: '',
}

module.exports = nextConfig
