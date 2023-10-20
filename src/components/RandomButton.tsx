'use client'

import { Link } from '@mui/material'
import { useRouter, useParams } from 'next/navigation'

let tempPaths: string[]

export default function RandomButton() {
    const router = useRouter()
    const { slug } = useParams()

    const handleClick = async () => {
        if (tempPaths === undefined) {
            document.body.style.cursor = 'wait'
            tempPaths = await fetch('/term-paths.json').then(res => res.json())
        }

        let randomPath = slug

        while (randomPath === slug) {
            randomPath = tempPaths[Math.floor(Math.random() * tempPaths.length)]
        }
        document.body.style.cursor = ''

        router.push(`/terms/${randomPath}`)
    }

    return (
        <Link component="button" onClick={handleClick}>
            Tampilkan kata acak!
        </Link>
    )
}
