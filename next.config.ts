import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  reactStrictMode: true,
    images: {
        domains: [
            "localhost",
            "cdn.dummyjson.com"
        ],
    },
  
};

export default nextConfig;
