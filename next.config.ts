import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: 'export',
  images: {
    loader: 'custom',
    loaderFile: './lib/sanity-loader.ts',
  },
  typescript: {
    ignoreBuildErrors: true,
  }
};

export default nextConfig;
