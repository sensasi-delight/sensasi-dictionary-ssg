import fs from 'fs'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import reactMarkdownComponents from '@/components/reactMarkdownComponents'

const README_PATH = `${process.cwd()}/resources/docs/README.md`

export default function Home() {
    const content = fs.readFileSync(README_PATH, 'utf8')
    const contentWithoutComments = content.replace(/<!--[\s\S]*?-->/g, '')

    return (
        <ReactMarkdown
            remarkPlugins={[[remarkGfm]]}
            components={reactMarkdownComponents}>
            {contentWithoutComments}
        </ReactMarkdown>
    )
}
