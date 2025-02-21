import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devDomains: ['localhost', 'cloudaccommodation.com'],
  images: {
    domains: ['localhost', 'cloudaccommodation.com'],
  },
};

export default nextConfig;

