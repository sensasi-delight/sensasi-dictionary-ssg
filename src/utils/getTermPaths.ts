import fs from 'fs'

export default function getTermPaths(): string[] {
    const termsPath = `${process.cwd()}/resources/docs`

    return fs
        .readdirSync(termsPath)
        .filter(file => file.length === 1)
        .map(letterPath =>
            fs
                .readdirSync(`${termsPath}/${letterPath}`)
                .filter(fileName => fileName.endsWith('.md'))
                .map(fileName => fileName.replace(/\.md$/, '')),
        )
        .flat()
}
