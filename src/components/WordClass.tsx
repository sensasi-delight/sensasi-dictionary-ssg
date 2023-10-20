'use client'

import blue from '@mui/material/colors/blue'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import WordClassesEnum from './WordClass/WordClassesEnum'

export default function WordClass(props: React.ComponentProps<'i'>) {
    const wordClass =
        WordClassesEnum[props.children as keyof typeof WordClassesEnum]

    return (
        <Tooltip
            title={
                <Button
                    color="inherit"
                    size="small"
                    sx={{
                        p: 0,
                    }}
                    onClick={() => {
                        window.open(
                            `https://kbbi.kemdikbud.go.id/entri/${wordClass.toLowerCase()}`,
                            '_BLANK',
                        )
                    }}>
                    {wordClass}
                </Button>
            }
            placement="top"
            arrow>
            <i style={{ color: blue[500] }} {...props} />
        </Tooltip>
    )
}
