/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  turbopack: {
    root: process.cwd(),
  },
  outputFileTracingRoot: process.cwd(),
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8055',
        pathname: '/assets/**',
      },
      {
        protocol: 'https',
        hostname: 'cms.heyneighbor.org',
        pathname: '/assets/**',
      },
    ],
  },
}

export default nextConfig
