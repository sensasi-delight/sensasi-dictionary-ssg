import type { Components } from 'react-markdown'
import type { TypographyProps } from '@mui/material/Typography'

import NextLink from 'next/link'

import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import LinkIcon from '@mui/icons-material/Link'

import WordClass from '@/components/WordClass'
import isWordClass from '@/components/WordClass/isWordClass'
import isExternalUrl from '@/utils/isExternalUrl'

const HEADER_SX = {
    '& > svg': {
        visibility: 'hidden',
    },
    '&:hover': {
        '& > svg': {
            visibility: 'visible',
        },
    },
}

const HEADER_ANCHOR_STYLE = {
    textDecoration: 'none',
    color: 'inherit',
}

const HEADER_LINK_ICON_STYLE = {
    verticalAlign: 'middle',
    marginLeft: '.5rem',
    color: 'rgba(128, 128, 128, 0.8)',
}

const reactMarkdownComponents: Partial<Components> = {
    h1: ({ children, ...rest }) => {
        const id = (children as string).toLowerCase().replace(/\s/g, '-')

        const newProps = JSON.parse(JSON.stringify(rest))
        delete newProps.node

        return (
            <Typography
                id={id}
                mt={4}
                mb={2}
                variant="h2"
                component="h1"
                sx={HEADER_SX}
                {...(newProps as TypographyProps)}>
                <a href={`#${id}`} style={HEADER_ANCHOR_STYLE}>
                    {children}
                </a>
                <LinkIcon style={HEADER_LINK_ICON_STYLE} />
            </Typography>
        )
    },

    h2: ({ children, ...rest }) => {
        if (children === 'Footnotes') {
            children = 'Catatan Kaki'
        }

        const id = (children as string).toLowerCase().replace(/\s/g, '-')

        const newProps = JSON.parse(JSON.stringify(rest))
        delete newProps.node

        return (
            <Typography
                id={id}
                mt={4}
                mb={2}
                variant="h5"
                component="h2"
                sx={HEADER_SX}
                {...(newProps as TypographyProps)}>
                <a href={`#${id}`} style={HEADER_ANCHOR_STYLE}>
                    {children}
                </a>
                <LinkIcon style={HEADER_LINK_ICON_STYLE} />
            </Typography>
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
