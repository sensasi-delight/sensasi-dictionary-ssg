'use client'

import {
    Experimental_CssVarsProvider as CssVarsProvider,
    useColorScheme,
} from '@mui/material/styles'

import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'

function Component() {
    const { mode, setMode } = useColorScheme()

    return (
        <FormGroup
            sx={{
                mt: 2,
                ml: 1,
            }}>
            <FormControlLabel
                control={
                    <Switch
                        size="small"
                        checked={mode === 'dark'}
                        onChange={() =>
                            setMode(mode === 'light' ? 'dark' : 'light')
                        }
                    />
                }
                label="Mode Gelap"
            />
        </FormGroup>
    )
}

export default function DarkModeSwitch() {
    return (
        <CssVarsProvider>
            <Component />
        </CssVarsProvider>
    )
}
