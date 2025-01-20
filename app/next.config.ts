import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  typescript: {

    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        hostname: 'images.unsplash.com',
      },
    ]
  }
};

export default nextConfig;
