import type { Components } from 'react-markdown'
import type { TypographyProps } from '@mui/material/Typography'

import NextLink from 'next/link'

import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

import OpenInNewIcon from '@mui/icons-material/OpenInNew'

import WordClass from '@/components/WordClass'
import isWordClass from '@/components/WordClass/isWordClass'

const reactMarkdownComponents: Partial<Components> = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    h1: ({ node, ...rest }) => (
        <Typography
            mt={4}
            mb={2}
            variant="h2"
            component="h1"
            {...(rest as TypographyProps)}
        />
    ),

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    h2: ({ node, ...rest }) => {
        if (rest.children === 'Footnotes') {
            rest.children = 'Catatan Kaki'
        }

        return (
            <Typography
                mt={4}
                mb={2}
                variant="h5"
                component="h2"
                {...(rest as TypographyProps)}
            />
        )
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    em: ({ node, ...rest }) => {
        if (isWordClass((rest.children || '') as string)) {
            return <WordClass {...rest} />
        }

        return <i {...rest} />
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    a: ({ node, href, children }) => {
        let isExternal = false

        try {
            new URL(href as string)
            isExternal = true
        } catch (error) {
            isExternal = false
        }

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
