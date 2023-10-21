import type { Metadata } from 'next'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import Script from 'next/script'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'

import Footer from '@/components/Footer'
import getDictInfo from '@/utils/getDictInfo'
import SearchBar from '@/components/SearchBar'
import clearMdSyntax from '@/utils/clearMdSyntax'

const { description, name, logoUrl } = getDictInfo()
const titleMeta = clearMdSyntax(name)
const strDescMeta = clearMdSyntax(description)

const BASE_URL = process.env.BASE_URL

export const metadata: Metadata = {
    metadataBase: BASE_URL ? new URL(BASE_URL) : undefined,
    title: titleMeta,
    description: strDescMeta,
    openGraph: {
        type: 'website',
        locale: 'id_ID',
        siteName: titleMeta,
        title: titleMeta,
        description: strDescMeta,
        images: [
            {
                url: logoUrl ?? '',
                alt: 'logo',
            },
        ],
    },
    twitter: {
        title: titleMeta,
        description: strDescMeta,
        creator: '@sensasi_delight',
        images: [
            {
                url: logoUrl ?? '',
                alt: 'logo',
            },
        ],
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="id">
            <head>
                <link rel="icon" href={logoUrl} sizes="any" />
                <Script src="script.js" />
            </head>

            <CssBaseline />

            <Container
                maxWidth="md"
                component="body"
                sx={{
                    pt: 2,
                }}>
                <SearchBar />
                <Box component="main" px={3} mt={4}>
                    {children}
                </Box>
                <Footer />
            </Container>
        </html>
    )
}
