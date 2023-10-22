if (!process.env.NEXT_PUBLIC_BASE_URL) {
    throw new Error('NEXT_PUBLIC_BASE_URL is not defined')
}

export default function getBaseUrl() {
    return process.env.NEXT_PUBLIC_BASE_URL
}
