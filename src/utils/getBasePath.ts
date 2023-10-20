let BASE_PATH: string | undefined = undefined

if (!BASE_PATH) {
    BASE_PATH = (process.env.BASE_URL ?? process.env.NEXT_PUBLIC_BASE_URL)
        ?.split('/')
        .slice(3)
        .join('/')
}

export default function getBasePath() {
    return BASE_PATH ? `/${BASE_PATH}` : ''
}
