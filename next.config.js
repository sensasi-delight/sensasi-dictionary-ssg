const BASE_PATH = process.env.BASE_URL?.split('/').slice(3).join('/')

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: { unoptimized: true },
    basePath: BASE_PATH ? `/${BASE_PATH}` : '',
}

module.exports = nextConfig
