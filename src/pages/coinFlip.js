import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
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
                            {/* {rows.map((row) => (
                        ))} */}
                            <TableRow
                                key={1}
                                style={{
                                    '&:last-child td, &:last-child th': {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell component="td" scope="row">
                                    0x1457d8DcD08f2865394949eCCE0b7Dd4D8c01697
                                </TableCell>
                                <TableCell align="right">
                                    <img src={silverCoin} width={75} />
                                </TableCell>
                                <TableCell align="right">Open</TableCell>
                                <TableCell align="right">
                                    <button className="gradient-btn">
                                        Join
                                    </button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    )
}
