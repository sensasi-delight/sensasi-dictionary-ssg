import fs from 'fs'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import reactMarkdownComponents from '@/components/reactMarkdownComponents'

export default function Home() {
    const readmePath = `${process.cwd()}/../README.md`
    const content = fs.readFileSync(readmePath, 'utf8')
    const contentWithoutComments = content.replace(/<!--[\s\S]*?-->/g, '')

    return (
        <ReactMarkdown
            remarkPlugins={[[remarkGfm]]}
            components={reactMarkdownComponents}>
            {contentWithoutComments}
        </ReactMarkdown>
    )
}
