/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  compress: true,
  poweredByHeader: false,
  
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
