export default function getBaseUrl() {
    return process.env.BASE_URL ?? process.env.NEXT_PUBLIC_BASE_URL ?? ''
}
