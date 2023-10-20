import fs from 'fs'

const README_PATH = `${process.cwd()}/resources/docs/README.md`

const dictInfoTemp = {} as DictInfoType

export default function getDictInfo(): DictInfoType {
    if (dictInfoTemp.name) return dictInfoTemp

    const fileContent = fs.readFileSync(README_PATH, 'utf8')

    const nameMatch = fileContent.match(/# (.*)\n/)
    if (!nameMatch) throw new Error('README.md: Title (name) not found')
    const title = nameMatch[1]

    const descriptionMatch = fileContent.match(
        new RegExp(`# ${title}\n\n(.*)\n`),
    )
    const versionMatch = fileContent.match(/`Version: (.*)\n/)
    const dateMatch = fileContent.match(/`Date: (.*)\n/)
    const logoUrlMatch = fileContent.match(/!\[logo\]\((.*)\)/)

    if (!descriptionMatch) throw new Error('README.md: Description not found')
    if (!versionMatch) throw new Error('README.md: Version not found')
    if (!dateMatch) throw new Error('README.md: Date not found')

    dictInfoTemp.name = title
    dictInfoTemp.description = descriptionMatch[1]
    dictInfoTemp.version = versionMatch[1]
    dictInfoTemp.date = dateMatch[1]
    dictInfoTemp.logoUrl = logoUrlMatch ? logoUrlMatch[1] : undefined

    return dictInfoTemp
}

type DictInfoType = {
    name: string
    description: string
    version: string
    date: string
    logoUrl?: string
}
