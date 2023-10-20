'use client'

import { useState } from 'react'
import Link from '@mui/material/Link'
import { useRouter, useParams } from 'next/navigation'

import getBaseUrl from '@/utils/getBaseUrl'
import { CircularProgress } from '@mui/material'

let tempPaths: string[]

export default function RandomButton() {
    const router = useRouter()
    const { slug } = useParams()

    const [isLoading, setIsLoading] = useState(false)

    const handleClick = async () => {
        if (isLoading) return

        setIsLoading(true)

        if (tempPaths === undefined) {
            tempPaths = await fetch(`${getBaseUrl()}/term-paths.json`)
                .then(res => res.json())
                .catch(() => setIsLoading(false))
        }

        if (tempPaths.length === 0 || tempPaths.length === 1)
            setIsLoading(false)
        if (tempPaths.length === 0) return router.push(`/`)
        if (tempPaths.length === 1) return router.push(`/terms/${tempPaths[0]}`)

        let randomPath = slug

        while (randomPath === slug) {
            randomPath = tempPaths[Math.floor(Math.random() * tempPaths.length)]
        }

        setIsLoading(false)
        router.push(`/terms/${randomPath}`)
    }

    return (
        <Link
            disabled={isLoading}
            component="button"
            display="flex"
            sx={{
                textAlign: 'unset',
                '&[disabled]': {
                    color: 'GrayText',
                    cursor: 'default',
                    textDecoration: 'none',
                },
            }}
            onClick={handleClick}>
            {isLoading && <CircularProgress size={20} color="inherit" />}
            Tampilkan kata acak!
        </Link>
    )
}
