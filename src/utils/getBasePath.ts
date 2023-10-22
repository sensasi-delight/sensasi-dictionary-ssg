export default function getBasePath() {
    const basePath = process.env.NEXT_PUBLIC_BASE_URL?.split('/')
        .slice(3)
        .join('/')

    return basePath ? `/${basePath}` : ''
}
