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

export const metadata: Metadata = {
    metadataBase: new URL('https://acme.com'),
    title: getDictInfo().name,
    description: getDictInfo().description,
    openGraph: {
        type: 'website',
        locale: 'id_ID',
        siteName: getDictInfo().name,
        title: getDictInfo().name,
        description: getDictInfo().description,
        images: [
            {
                url: 'logo.png',
                alt: 'logo',
            },
        ],
    },
    twitter: {
        title: getDictInfo().name,
        description: getDictInfo().description,
        images: [
            {
                url: '/logo.png',
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
                <link rel="icon" href="/logo.png" sizes="any" />
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
