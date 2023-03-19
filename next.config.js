/** @type {import('next').NextConfig} */

const nextConfig = {
  // Your existing module.exports
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["storage.googleapis.com"]
  }
}

module.exports = nextConfig
