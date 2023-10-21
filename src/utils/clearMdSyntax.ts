export default function clearMdSyntax(strMd?: string) {
    if (!strMd) return undefined

    // Menghapus nomor di depan, kata-kata italic, dan [^n]
    strMd = strMd.replace(/^\d+\.\s+|_([^_]+)_\s+|\[\^\d+\]/g, '')

    // Menghapus tautan
    strMd = strMd.replace(/\[([^\]]+)\]\(.*?\)/g, '$1')

    // Menghapus tanda berurutan
    strMd = strMd.replace(/^\s*[\-*+]\s+/gm, '')

    // Menghapus teks tebal, miring, dan garis bawah
    strMd = strMd.replace(/(\*{1,2}|_{1,2})(.*?)\1/g, '$2')

    // Menghapus kode dalam tanda kait
    strMd = strMd.replace(/`([^`]+)`/g, '$1')

    // Menghapus spasi ganda
    strMd = strMd.replace(/\s{2,}/g, ' ')

    // Menghapus spasi sebelum titik
    strMd = strMd.replace(/\s+\./g, '.')

    return strMd.trim()
}
