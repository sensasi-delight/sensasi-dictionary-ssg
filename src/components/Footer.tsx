import Image from 'next/image'
import NextLink from 'next/link'
import ReactMarkdown from 'react-markdown'

import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import getDictInfo from '@/utils/getDictInfo'
import RandomButton from './RandomButton'
import LastVisitTermList from './LastVisitTermList'
import remarkGfm from 'remark-gfm'
import reactMarkdownComponents from './reactMarkdownComponents'

import GitHubIcon from '@mui/icons-material/GitHub'

import dynamic from 'next/dynamic'
const DarkModeSwitch = dynamic(
    () => import('@/clientComponents/DarkModeSwitch'),
    { ssr: false },
)

import appInfo from '@/../package.json'

const { name: dictName, description: dictDesc, logoUrl } = getDictInfo()

export default function Footer() {
    return (
        <>
            <Divider sx={{ mt: 8, mb: 4 }} component="div" />

            <Grid
                container
                component="footer"
                px={2}
                spacing={4}
                sx={{
                    flexWrap: {
                        xs: 'wrap-reverse',
                    },
                }}>
                <Grid item xs={12} sm={6}>
                    <Box
                        display="flex"
                        gap={2}
                        alignItems="center"
                        mb={1}
                        component={NextLink}
                        color="inherit"
                        style={{ textDecoration: 'none' }}
                        href="/">
                        {logoUrl !== undefined && (
                            <Image
                                src={logoUrl}
                                width="50"
                                height="50"
                                alt="logo"
                            />
                        )}

                        <ReactMarkdown
                            remarkPlugins={[[remarkGfm]]}
                            components={{
                                ...reactMarkdownComponents,
                                p: ({ children }) => (
                                    <Typography
                                        variant="h6"
                                        fontWeight="bold"
                                        textTransform="uppercase">
                                        {children}
                                    </Typography>
                                ),
                            }}>
                            {dictName}
                        </ReactMarkdown>
                    </Box>

                    <ReactMarkdown
                        remarkPlugins={[[remarkGfm]]}
                        components={{
                            ...reactMarkdownComponents,
                            p: ({ children }) => (
                                <Typography variant="body2">
                                    {children}
                                </Typography>
                            ),
                        }}>
                        {dictDesc}
                    </ReactMarkdown>
                </Grid>

                <Grid item xs={6} sm={3}>
                    <Typography
                        fontWeight="bold"
                        textTransform="uppercase"
                        mb={1}>
                        Navigasi
                    </Typography>
                    <nav>
                        <ul
                            style={{
                                listStyle: 'none',
                                padding: 0,
                                margin: 0,
                            }}>
                            <li>
                                <Link href="/" component={NextLink}>
                                    Beranda
                                </Link>
                            </li>

                            <li>
                                Glosari <i>(akan datang)</i>
                                {/* <Link href="/glosary" component={NextLink}>
                                Glosari <i>(akan datang)</i>
                                </Link> */}
                            </li>
                            <li>
                                <RandomButton />
                            </li>
                            <li>
                                Kontribusi <i>(akan datang)</i>
                                {/* <Link href="/contribution" component={NextLink}>
                                    Kontribusi
                                </Link> */}
                            </li>
                        </ul>
                    </nav>

                    <DarkModeSwitch />
                </Grid>

                <Grid item xs={6} sm={3}>
                    <Typography
                        fontWeight="bold"
                        textTransform="uppercase"
                        mb={1}>
                        Terakhir dilihat
                    </Typography>

                    <LastVisitTermList />
                </Grid>
            </Grid>

            <Typography
                mt={4}
                mb={2}
                variant="caption"
                component="div"
                color="GrayText"
                textAlign="center">
                <Link
                    href={appInfo.repository.url}
                    display="inline-flex"
                    gap={0.5}>
                    {appInfo.name
                        .split('-')
                        .map(
                            word =>
                                word.charAt(0).toUpperCase() + word.slice(1),
                        )
                        .join(' ')}{' '}
                    v{appInfo.version}
                    <GitHubIcon fontSize="small" />
                </Link>{' '}
                oleh{' '}
                <Link href={appInfo.author.url} display="inline-flex" gap={0.5}>
                    {appInfo.author.name}
                    <GitHubIcon fontSize="small" />
                </Link>
            </Typography>
        </>
    )
}
