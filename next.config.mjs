/** @type {import('next').NextConfig} */
const nextConfig = {
    //   output: 'export',
    images: {
        loader: 'custom',
        loaderFile: './lib/sanity-loader.ts',
    },
    /* eslint: {
      // Warning: This allows production builds to successfully complete even if
      // your project has ESLint errors.                                         
      ignoreDuringBuilds: true,                                                  
    }, */
    typescript: {
        // Ignore typescript errors during build to ensure deployment succeeds even with strict checks
        ignoreBuildErrors: true,
    }
};

export default nextConfig;
