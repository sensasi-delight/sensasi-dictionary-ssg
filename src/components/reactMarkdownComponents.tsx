import type { Components } from 'react-markdown'
import type { TypographyProps } from '@mui/material/Typography'

import NextLink from 'next/link'

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

    code: props => {
        const newProps = JSON.parse(JSON.stringify(props))

        delete newProps.node

        return (
            <Typography
                component="code"
                sx={{
                    fontFamily: 'monospace',
                    fontSize: '0.875rem',
                    px: 0.5,
                    py: 0.25,
                    borderRadius: 1,
                    bgcolor: 'grey.300',
                }}
                {...(newProps as TypographyProps)}
            />
        )
    },

    em: props => {
        delete props.node

        if (isWordClass((props.children || '') as string)) {
            return <WordClass {...props} />
        }

        return <i {...props} />
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
