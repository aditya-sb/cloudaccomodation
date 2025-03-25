import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  transpilePackages: ['@stripe/stripe-js', '@stripe/react-stripe-js'],
  devDomains: ['localhost', 'cloudaccommodation.com'],
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@stripe/stripe-js': require.resolve('@stripe/stripe-js'),
    };
    return config;
  },
  images: {
    domains: ['localhost', 'cloudaccommodation.com'],
  },
};

export default nextConfig;

