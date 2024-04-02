/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "localhost",
                port: "1337",
                pathname: "/uploads/**",
            },
            {
                protocol: "https",
                hostname: "images.pexels.com",
            },
            {
                protocol: "https",
                hostname: "pretty-harmony-b2c4339f8a.media.strapiapp.com",
            },
        ],
    },
};

module.exports = nextConfig;
