export default function getBasePath() {
    if (isOnGithubPages()) {
        return `/${getBasePathGithubPages()}`
    }

    return ''
}

function isOnGithubPages() {
    return location?.hostname.includes('github.io')
}

function getBasePathGithubPages() {
    return location?.href.split('/')[3]
}
