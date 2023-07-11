/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        DB_LOCAL_URI: 'mongodb://localhost:27017/bookit',
        CLOUDINARY_CLOUD_NAME: 'sky111',
        CLOUDINARY_API_KEY: '363245883758189',
        CLOUDINARY_API_SECRET: 'EGhC6fCDjOW7TqP5JRUsBd-BxhQ'
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
