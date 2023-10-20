'use client'

import getBasePath from '@/utils/getBasePath'
import Link from '@mui/material/Link'
import { useRouter, useParams } from 'next/navigation'

let tempPaths: string[]
const BASE_PATH = getBasePath() ?? ''

export default function RandomButton() {
    const router = useRouter()
    const { slug } = useParams()

    const handleClick = async () => {
        document.body.style.cursor = 'wait'

        if (tempPaths === undefined) {
            tempPaths = await fetch(`${BASE_PATH}/term-paths.json`).then(res =>
                res.json(),
            )
        }

        let randomPath = slug

        while (randomPath === slug) {
            randomPath = tempPaths[Math.floor(Math.random() * tempPaths.length)]
        }
        document.body.style.cursor = ''

        router.push(`/terms/${randomPath}`)
    }

    return (
        <Link
            component="button"
            sx={{
                textAlign: 'unset',
            }}
            onClick={handleClick}>
            Tampilkan kata acak!
        </Link>
    )
}
