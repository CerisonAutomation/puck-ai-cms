import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    // Required for @puckeditor/core server-side rendering
    serverComponentsExternalPackages: [],
  },
}

export default nextConfig
