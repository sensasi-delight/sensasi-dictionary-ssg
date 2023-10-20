let GLOBAL_CONTENT: string
const TERMS_PATH = `${process.cwd()}/resources/docs`

import type { Metadata, ResolvingMetadata } from 'next'

import fs from 'fs'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import reactMarkdownComponents from '@/components/reactMarkdownComponents'

import getTermPaths from '@/utils/getTermPaths'
import clearMdSyntax from '@/utils/clearMdSyntax'

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
    _: Props,
    parent: ResolvingMetadata,
): Promise<Metadata> {
    const parentMetadata = await parent

    const titleContent = clearMdSyntax(
        GLOBAL_CONTENT.split('\n').find(line => line.startsWith('# ')),
    )

    const title = `${titleContent} — ${parentMetadata.title}`
    const description =
        clearMdSyntax(
            GLOBAL_CONTENT.split('\n')
                .find(line => line.startsWith('1. '))
                ?.slice(7),
        ) ||
        parentMetadata.description ||
        undefined

    return {
        title: title,
        description: description,
        openGraph: {
            ...parentMetadata.openGraph,
            // TODO: accomodate basePath
            // url: parentMetadata.openGraph?.url + `/terms/${slug}`,
            url: undefined,
            title: title,
            description: description,
        },
        twitter: {
            title: title,
            description: description,
            images: parentMetadata.twitter?.images,
        },
    }
}
