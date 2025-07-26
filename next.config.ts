// ste_br/next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Add this line
  images: {
    unoptimized: true, // Add this line for static export
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;