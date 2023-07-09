/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        DB_LOCAL_URI: 'mongodb://localhost:27017/bookit'
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: "res.cloudinary.com",
            },
        ],
    },
}

module.exports = nextConfig
