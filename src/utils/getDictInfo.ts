import fs from 'fs'

const dictInfoTemp = {} as DictInfoType

export default function getDictInfo(): DictInfoType {
    if (dictInfoTemp.name) return dictInfoTemp

    const readmePath = `${process.cwd()}/../README.md`
    const fileContent = fs.readFileSync(readmePath, 'utf8')

    const nameMatch = fileContent.match(/# (.*)\n/)
    if (!nameMatch) throw new Error('README.md: Title (name) not found')
    const title = nameMatch[1]

    const descriptionMatch = fileContent.match(
        new RegExp(`# ${title}\n\n(.*)\n`),
    )
    const logoUrlMatch = fileContent.match(/!\[logo\]\((.*)\)/)

    if (!descriptionMatch) throw new Error('README.md: Description not found')

    dictInfoTemp.name = title
    dictInfoTemp.description = descriptionMatch[1]
    dictInfoTemp.logoUrl = logoUrlMatch ? logoUrlMatch[1] : undefined

    return dictInfoTemp
}

type DictInfoType = {
    name: string
    description: string
    logoUrl?: string
}
