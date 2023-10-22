if (!process.env.NEXT_PUBLIC_BASE_URL) {
    throw new Error('NEXT_PUBLIC_BASE_URL is not set')
}

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: { unoptimized: true },
}

const basePath =
    '/' + process.env.NEXT_PUBLIC_BASE_URL.split('/').slice(3).join('/')

if (basePath !== '/') {
    nextConfig.basePath = basePath
}

module.exports = nextConfig
