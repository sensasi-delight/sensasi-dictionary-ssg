import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'

import MenuIcon from '@mui/icons-material/Menu'

export default function Topbar() {
    return (
        <AppBar color="transparent" elevation={0}>
            <Toolbar
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}>
                <Typography variant="h6" color="inherit" component="div">
                    Glosari Pengembang Web
                </Typography>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}
