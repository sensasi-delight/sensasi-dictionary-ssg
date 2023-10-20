/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: { unoptimized: true },
    basePath: process.env.BASE_URL?.split('/').slice(3).join('/') || undefined,
}

module.exports = nextConfig
