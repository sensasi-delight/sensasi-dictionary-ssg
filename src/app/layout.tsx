import type { Metadata } from 'next'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'

import Footer from '@/components/Footer'
import getDictInfo from '@/utils/getDictInfo'
import SearchBar from '@/components/SearchBar'

const { description, name, logoUrl } = getDictInfo()
const strDesc = description.replaceAll(/[*_]/g, '')

export const metadata: Metadata = {
    title: name,
    description: strDesc,
    openGraph: {
        type: 'website',
        locale: 'id_ID',
        siteName: name,
        title: name,
        description: strDesc,
        images: [
            {
                url: logoUrl ?? '',
                alt: 'logo',
            },
        ],
    },
    twitter: {
        title: name,
        description: strDesc,
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
