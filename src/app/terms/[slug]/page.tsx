let CONTENT_LINES: string[]
const TERMS_PATH = `${process.cwd()}/../`

import type { Metadata, ResolvingMetadata } from 'next'

import fs from 'fs'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import reactMarkdownComponents from '@/components/reactMarkdownComponents'

import clearMdSyntax from '@/utils/clearMdSyntax'
import getBaseUrl from '@/utils/getBaseUrl'
import getTermPaths from '@/utils/getTermPaths'

type Props = {
    params: { slug: string }
}

// Error when slug not found instead of 404
// https://github.com/vercel/next.js/issues/54393

export function generateStaticParams() {
    return getTermPaths().map((path: string) => ({
        slug: path,
    }))
}

export default function TermPage({ params }: Props) {
    const slug = params.slug.toLocaleLowerCase()

    const markdownContent = fs.readFileSync(
        `${TERMS_PATH}/${slug.charAt(0)}/${slug}.md`,
        'utf8',
    )

    const contentWithoutComments = markdownContent.replace(
        /<!--[\s\S]*?-->/g,
        '',
    )

    CONTENT_LINES = contentWithoutComments.split('\n')

    return (
        <article>
            <ReactMarkdown
                remarkPlugins={[[remarkGfm]]}
                components={reactMarkdownComponents}>
                {contentWithoutComments}
            </ReactMarkdown>
        </article>
    )
}

export async function generateMetadata(
    { params: { slug } }: Props,
    parent: ResolvingMetadata,
): Promise<Metadata> {
    const parentMetadata = await parent

    const titleContent = clearMdSyntax(
        CONTENT_LINES.find(line => line.startsWith('# '))?.slice(2),
    )

    const metaTitle = `${titleContent} — ${parentMetadata.title?.absolute}`
    const metaDesc =
        clearMdSyntax(CONTENT_LINES.find(line => line.startsWith('1. '))) ||
        parentMetadata.description ||
        undefined

    return {
        title: metaTitle,
        description: metaDesc,
        openGraph: {
            ...parentMetadata.openGraph,
            url: `${getBaseUrl()}/terms/${slug}`,
            title: metaTitle,
            description: metaDesc,
        },
        twitter: {
            title: metaTitle,
            description: metaDesc,
            images: parentMetadata.twitter?.images,
        },
    }
}
