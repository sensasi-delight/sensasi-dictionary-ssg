'use client'

import { useRouter } from 'next/navigation'

import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'

import SearchIcon from '@mui/icons-material/Search'

export default function SearchBar() {
    const router = useRouter()

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const formEl = event.currentTarget

        // validation
        if (!formEl.checkValidity()) {
            return
        }

        const formData = new FormData(formEl)
        const search = formData.get('search')

        return router.push(`/terms/${search}`)
    }

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                autoComplete="off"
                required
                name="search"
                fullWidth
                size="small"
                margin="dense"
                placeholder="Cari kata atau istilah"
                onChange={() => null}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton type="submit">
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </form>
    )
}
