import fs from 'fs'

export default function getTermPaths(): string[] {
    const baseMdsPath = `${process.cwd()}/../`

    return fs
        .readdirSync(baseMdsPath)
        .filter(file => file.length === 1)
        .map(letterPath =>
            fs
                .readdirSync(`${baseMdsPath}/${letterPath}`)
                .filter(fileName => fileName.endsWith('.md'))
                .map(fileName => fileName.replace(/\.md$/, '')),
        )
        .flat()
}
