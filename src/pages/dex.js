import {Box, Grid} from '@mui/material'
import React from 'react'
import PageHeader from '../components/PageHeader'

export default function dex() {
    return (
        <Box sx={{p: 5}} className="dex">
            <PageHeader title={`Dex`} />
            <Box>
                <Grid container spacing={3}></Grid>
            </Box>
        </Box>
    )
}
