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
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@stripe/stripe-js': require.resolve('@stripe/stripe-js'),
    };
    return config;
  },
  images: {
    domains: ["145.223.23.97",'localhost', 'cloudaccommodation.com'],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "font-src 'self' https://js.stripe.com data:;"
          }
        ],
      },
    ];
  },
};

export default nextConfig;

