export default function getBasePath() {
    return process.env.BASE_URL?.split('/').slice(3).join('/')
}
