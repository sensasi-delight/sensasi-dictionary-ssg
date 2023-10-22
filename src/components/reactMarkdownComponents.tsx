import type { Components } from 'react-markdown'
import type { TypographyProps } from '@mui/material/Typography'

import NextLink from 'next/link'

import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

import OpenInNewIcon from '@mui/icons-material/OpenInNew'

import WordClass from '@/components/WordClass'
import isWordClass from '@/components/WordClass/isWordClass'
import isExternalUrl from '@/utils/isExternalUrl'

const reactMarkdownComponents: Partial<Components> = {
    h1: props => {
        const newProps = JSON.parse(JSON.stringify(props))
        delete newProps.node

        return (
            <Typography
                id={(newProps.children as string)
                    .toLowerCase()
                    .replace(/\s/g, '-')}
                mt={4}
                mb={2}
                variant="h2"
                component="h1"
                {...(newProps as TypographyProps)}
            />
        )
    },

    h2: props => {
        const newProps = JSON.parse(JSON.stringify(props))
        delete newProps.node

        if (newProps.children === 'Footnotes') {
            newProps.children = 'Catatan Kaki'
        }

        return (
            <Typography
                id={(newProps.children as string)
                    .toLowerCase()
                    .replace(/\s/g, '-')}
                mt={4}
                mb={2}
                variant="h5"
                component="h2"
                {...(newProps as TypographyProps)}
            />
        )
    },

    pre: props => {
        const newProps = JSON.parse(JSON.stringify(props))
        delete newProps.node

        const { children, ...rest } = newProps

        return (
            <Typography
                component="pre"
                sx={{
                    fontSize: '0.875rem',
                    p: 1,
                    borderRadius: 1,
                    backgroundColor: 'rgba(128, 128, 128, 0.15)',
                }}
                {...(rest as TypographyProps)}>
                <code {...children.props} />
            </Typography>
        )
    },

    code: props => {
        const newProps = JSON.parse(JSON.stringify(props))
        delete newProps.node

        return (
            <Box
                component="code"
                sx={{
                    fontSize: '0.875rem',
                    px: 0.8,
                    py: 0.25,
                    borderRadius: 1,
                    backgroundColor: 'rgba(128, 128, 128, 0.15)',
                }}
                {...newProps}
            />
        )
    },

    em: props => {
        const newProps = JSON.parse(JSON.stringify(props))
        delete newProps.node

        if (isWordClass((newProps.children || '') as string)) {
            return <WordClass {...newProps} />
        }

        return <i {...newProps} />
    },

    a: ({ href, children }) => {
        const isExternal = isExternalUrl(href as string)

        return (
            <Link
                component={NextLink}
                href={href as string}
                target={isExternal ? '_blank' : undefined}>
                {children}
                {isExternal ? (
                    <OpenInNewIcon
                        sx={{
                            verticalAlign: 'middle',
                            ml: 0.2,
                        }}
                        fontSize="inherit"
                    />
                ) : undefined}
            </Link>
        )
    },
}

export default reactMarkdownComponents
