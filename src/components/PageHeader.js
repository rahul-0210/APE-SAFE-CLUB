import {Box, Grid, Typography} from '@material-ui/core'
import React from 'react'

export default function PageHeader({title, btnTitle, btnMethod, userTokenBal}) {
    return (
        <Box className="title-div">
            <Grid container spacing={2}>
                <Grid item lg={6} sm={12}>
                    <Typography component="h1" className="title">
                        {title} {userTokenBal ? `(${userTokenBal} ASC)` : null}
                    </Typography>
                </Grid>
                <Grid item lg={6} sm={12} className="btn-div">
                    {btnTitle && (
                        <button
                            className="btn gradient-btn"
                            onClick={btnMethod}
                        >
                            {btnTitle}
                        </button>
                    )}
                </Grid>
            </Grid>
        </Box>
    )
}
