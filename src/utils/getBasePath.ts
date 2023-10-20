export default function getBasePath() {
    const BASE_PATH = process.env.BASE_URL?.split('/').slice(3).join('/')

    return BASE_PATH ? `/${BASE_PATH}` : ''
}
