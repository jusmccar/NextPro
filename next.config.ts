import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  images: {
    remotePatterns: [
      {
        hostname: "images.unsplash.com",
        protocol: "https",
        port: "",
      },
      {
        hostname: "wandering-orca-547.convex.cloud",
        protocol: "https",
        port: "",
      },
    ],
  },
};

export default nextConfig;
