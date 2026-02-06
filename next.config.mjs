/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [],
    formats: ['image/webp'],
  },
  // Ensure static files are served correctly
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
}

export default nextConfig
