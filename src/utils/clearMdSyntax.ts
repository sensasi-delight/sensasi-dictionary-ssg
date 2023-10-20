export default function clearMdSyntax(strMd?: string) {
    if (!strMd) return undefined

    // Menghapus tautan
    strMd = strMd.replace(/\[([^\]]+)\]\(.*?\)/g, '$1')

    // Menghapus tanda berurutan
    strMd = strMd.replace(/^\s*[\-*+]\s+/gm, '')

    // Menghapus teks tebal, miring, dan garis bawah
    strMd = strMd.replace(/(\*{1,2}|_{1,2})(.*?)\1/g, '$2')

    // Menghapus kode dalam tanda kait
    strMd = strMd.replace(/`([^`]+)`/g, '$1')

    return strMd
}
