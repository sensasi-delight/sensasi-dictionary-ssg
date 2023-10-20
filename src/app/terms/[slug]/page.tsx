let GLOBAL_CONTENT: string
const TERMS_PATH = `${process.cwd()}/resources/docs`

import type { Metadata, ResolvingMetadata } from 'next'

import fs from 'fs'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import reactMarkdownComponents from '@/components/reactMarkdownComponents'

import getDictInfo from '@/utils/getDictInfo'
import getTermPaths from '@/utils/getTermPaths'

type Props = {
    params: { slug: string }
}

export async function generateStaticParams() {
    return getTermPaths().map((path: string) => ({
        slug: path,
    }))
}

export default function TermPage({ params }: Props) {
    const slug = params.slug.toLocaleLowerCase()

    const markdown_content = fs.readFileSync(
        `${TERMS_PATH}/${slug.charAt(0)}/${slug}.md`,
        'utf8',
    )

    GLOBAL_CONTENT = markdown_content

    return (
        <article>
            <ReactMarkdown
                remarkPlugins={[[remarkGfm]]}
                components={reactMarkdownComponents}>
                {markdown_content}
            </ReactMarkdown>
        </article>
    )
}

export async function generateMetadata(
    { params: { slug } }: Props,
    parent: ResolvingMetadata,
): Promise<Metadata> {
    const titleContent =
        (
            GLOBAL_CONTENT.split('\n').find(line => line.startsWith('# ')) || ''
        ).slice(2) || slug

    const title = `${titleContent} — ${getDictInfo().name}`
    const description =
        GLOBAL_CONTENT.split('\n')
            .find(line => line.startsWith('1. '))
            ?.slice(7) || ''.replace(/\n/g, ' ')

    const parentMetadata = await parent

    return {
        ...parentMetadata,
        title: title,
        description: description,
        // @ts-ignore
        openGraph: {
            ...parentMetadata.openGraph,
            title: title,
            description: description,
        },
        // @ts-ignore
        twitter: {
            ...parentMetadata.twitter,
            title: title,
            description: description,
        },
    }
}
