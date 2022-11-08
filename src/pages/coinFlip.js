import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Grid,
} from '@material-ui/core'
import React from 'react'
import PageHeader from '../components/PageHeader'
import silverCoin from '../assets/silvercoin.png'

export default function CoinFlip() {
    const openCoinFlipModal = () => {}
    return (
        <Box sx={{p: 5}} className="coin-flip">
            <PageHeader
                title="Coin Flip"
                btnTitle="Create Match"
                btnMethod={openCoinFlipModal}
            />
            <Box>
                <TableContainer component={Box} className="title-div">
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell
                                    component="th"
                                    className="table-header"
                                    align="center"
                                >
                                    Player
                                </TableCell>
                                <TableCell
                                    component="th"
                                    className="table-header"
                                    align="center"
                                >
                                    Side
                                </TableCell>
                                <TableCell
                                    component="th"
                                    className="table-header"
                                    align="center"
                                >
                                    Status
                                </TableCell>
                                <TableCell
                                    component="th"
                                    className="table-header"
                                    align="center"
                                >
                                    Action
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow
                                key={1}
                                style={{
                                    '&:last-child td, &:last-child th': {
                                        border: '0px',
                                    },
                                }}
                                className="table-row"
                            >
                                <TableCell
                                    className="table-row"
                                    component="td"
                                    scope="row"
                                >
                                    0x1457d8DcD08f2865394949eCCE0b7Dd4D8c01697
                                </TableCell>
                                <TableCell className="table-row" align="center">
                                    <img src={silverCoin} width={75} />
                                </TableCell>
                                <TableCell className="table-row" align="right">
                                    Open
                                </TableCell>
                                <TableCell className="table-row" align="right">
                                    <Grid container spacing={2}>
                                        <Grid item lg={6} md={12}>
                                            <button className="btn gradient-btn w-100">
                                                Join
                                            </button>
                                        </Grid>
                                        <Grid item lg={6} md={12}>
                                            <button className="btn border-gradient border-gradient-secondary w-100">
                                                Watch
                                            </button>
                                        </Grid>
                                    </Grid>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    )
}
