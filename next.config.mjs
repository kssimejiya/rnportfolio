/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
  },
  transpilePackages: ['three'],
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;