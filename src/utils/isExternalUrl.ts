import getBaseUrl from './getBaseUrl'

export default function isExternalUrl(url: string): boolean {
    return url.includes('//') && !url.includes(getBaseUrl() || '//localhost')
}
