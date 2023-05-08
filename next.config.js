const MS_PER_SECOND = 1000;
const SECONDS_PER_DAY = 86400;

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    onDemandEntries: {
        // https://github.com/vercel/next.js/issues/29184#issuecomment-938141139
        // period (in ms) where the server will keep pages in the buffer
        maxInactiveAge: SECONDS_PER_DAY * MS_PER_SECOND,
        // number of pages that should be kept simultaneously without being disposed
        pagesBufferLength: 1,
    },
    env: {
        NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
        NEXT_PUBLIC_SUPABASE_ANON_KEY:
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        NEXT_PUBLIC_GOOGLE_MAPS_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY,
        NEXT_PUBLIC_GOOGLE_MAPS_ID: process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '54321',
            },
        ],
    },
};

module.exports = nextConfig;
