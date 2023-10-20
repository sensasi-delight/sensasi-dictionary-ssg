import NextLink from 'next/link'

import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

import ReportIcon from '@mui/icons-material/Report'

import RandomButton from '@/components/RandomButton'

export default function NotFound() {
    return (
        <Grid container alignItems="center" columnSpacing={4}>
            <Grid
                item
                xs={12}
                sm={4}
                sx={{
                    textAlign: {
                        sm: 'right',
                    },
                }}>
                <ReportIcon
                    sx={{
                        fontSize: '8rem',
                    }}
                    color="error"
                />
            </Grid>

            <Grid item xs={12} sm={8}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Sayang Sekali...
                </Typography>
                <Typography>Halaman yang kamu cari tidak ditemukan.</Typography>

                <div
                    style={{
                        marginTop: '1rem',
                        display: 'flex',
                        gap: '1rem',
                    }}>
                    <Link href="/" component={NextLink}>
                        Kembali ke Beranda
                    </Link>
                    <Divider orientation="vertical" flexItem />
                    <RandomButton />
                </div>
            </Grid>
        </Grid>
    )
}
