import type { NextConfig } from 'next'
import withNextIntl from 'next-intl/plugin'

const nextConfig: NextConfig = withNextIntl()({
  /* config options here */
  images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: '**', // This allows any hostname
            port: '',
            pathname: '/**', // This allows any path
          },
        ],
      },
  eslint:{
    ignoreDuringBuilds: true,
  },
})

export default nextConfig
