import type { NextConfig } from "next";

const nextConfig: NextConfig = {
output: "export",
  typescript:
   {
    ignoreBuildErrors: true,
  },

  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
   domains: ["images.unsplash.com"],  
  }
};

export default nextConfig;
