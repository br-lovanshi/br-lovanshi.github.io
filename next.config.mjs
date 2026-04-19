/** @type {import('next').NextConfig} */
const nextConfig = {
    trailingSlash: true,
    images: {
        // Required for static GitHub Pages — no server to run /_next/image optimization
        unoptimized: true,
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
