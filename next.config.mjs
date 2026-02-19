/** @type {import('next').NextConfig} */
const nextConfig = {
    // Explicitly NOT using output: 'export' — we use a custom build-static.js script
    // that copies .next/server/app HTML files into /out for GitHub Pages.
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.sanity.io',
                pathname: '/images/**',
            },
            {
                protocol: 'https',
                hostname: 'cdn.sanity.io',
                pathname: '/files/**',
            },
        ],
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
