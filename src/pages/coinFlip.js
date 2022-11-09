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
import React, {useState} from 'react'
import PageHeader from '../components/PageHeader'
import silverCoin from '../assets/silvercoin.png'
import goldCoin from '../assets/goldCoin.png'
import coins from '../assets/coins.svg'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'
import useMediaQuery from '@mui/material/useMediaQuery'
import {useTheme} from '@mui/material/styles'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})
export default function CoinFlip() {
    const [openCreateDailog, setOpenCreateDailog] = useState(false)
    const [openWatchDailog, setOpenWatchDailog] = useState(false)
    const [openJoinDailog, setOpenJoinDailog] = useState(false)
    const [betAmount, setBetAmount] = useState('')
    const [selectedCoin, setSelectedCoin] = useState('')
    const [flipResult, setFlipResult] = useState('')

    const [watchModalDetails, setWatchModalDetails] = useState({
        coin: 'glod',
        amount: 10,
        address: '0x1457d8DcD08f2865394949eCCE0b7Dd4D8c01697',
    })
    const coin = {
        GOLD: 'gold',
        SILVER: 'silver',
    }
    const theme = useTheme()
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

    const coinToss = () => {
        if (Math.random() < 0.5) {
            setFlipResult('heads')
            console.log('heads')
        } else {
            setFlipResult('tails')
            console.log('tails')
        }
    }
    const createCoinFlipModal = () => {
        return (
            <Dialog
                fullScreen={fullScreen}
                open={openCreateDailog}
                onClose={() => setOpenCreateDailog(false)}
                aria-labelledby="responsive-dialog-title"
                TransitionComponent={Transition}
                PaperProps={{
                    style: {
                        borderRadius: '20px',
                        backgroundOrigin: 'border-box',
                        backgroundColor: '#000',
                        backgroundClip: 'content-box, border-box',
                        color: '#fff',

                        boxShadow:
                            'inset 0 1px 1px #00000014, 0 0 8px #66afe999',
                    },
                }}
                className="coin-flip"
                maxWidth="md"
            >
                <DialogTitle id="responsive-dialog-title">
                    {'Create Game'}
                </DialogTitle>
                <DialogContent>
                    <Grid container className="create-game" spacing={3}>
                        <Grid item lg={6} className="center">
                            <img
                                className={
                                    selectedCoin === coin.GOLD
                                        ? 'coin-img selected'
                                        : 'coin-img'
                                }
                                src={goldCoin}
                                alt="gold coin"
                                onClick={() => setSelectedCoin(coin.GOLD)}
                            />
                        </Grid>
                        <Grid item lg={6} className="center">
                            <img
                                className={
                                    selectedCoin === coin.SILVER
                                        ? 'coin-img selected'
                                        : 'coin-img'
                                }
                                src={silverCoin}
                                alt="silver coin"
                                onClick={() => setSelectedCoin(coin.SILVER)}
                            />
                        </Grid>
                        <Grid item lg={12}>
                            <Grid container>
                                <Grid item lg={4}>
                                    {/* <TextField label="Min Bet is 10" variant="standard" /> */}
                                    <input
                                        type="number"
                                        className="bet-input"
                                        placeholder="Min Bet is 10"
                                        value={betAmount}
                                        onChange={(e) => {
                                            setBetAmount(e.currentTarget.value)
                                        }}
                                    />
                                </Grid>
                                <Grid item lg={1}>
                                    <div
                                        className="btn-animate"
                                        onClick={() => {
                                            setBetAmount('')
                                        }}
                                    >
                                        <div className="text">clear</div>
                                    </div>
                                </Grid>
                                <Grid item lg={1}>
                                    <div
                                        className="btn-animate"
                                        onClick={() => {
                                            setBetAmount(10)
                                        }}
                                    >
                                        <div className="text">Min</div>
                                    </div>
                                </Grid>
                                <Grid item lg={1}>
                                    <div
                                        className="btn-animate"
                                        onClick={() => {
                                            const bet = parseInt(betAmount) || 0
                                            setBetAmount(bet + 10)
                                        }}
                                    >
                                        <div className="text">+10</div>
                                    </div>
                                </Grid>
                                <Grid item lg={1}>
                                    <div
                                        className="btn-animate"
                                        onClick={() => {
                                            const bet = parseInt(betAmount) || 0
                                            setBetAmount(bet + 50)
                                        }}
                                    >
                                        <div className="text">+50</div>
                                    </div>
                                </Grid>
                                <Grid item lg={1}>
                                    <div
                                        className="btn-animate"
                                        onClick={() => {
                                            const bet = parseInt(betAmount) || 0
                                            setBetAmount(bet + 100)
                                        }}
                                    >
                                        <div className="text">+100</div>
                                    </div>
                                </Grid>
                                <Grid item lg={1}>
                                    <div
                                        className="btn-animate"
                                        onClick={() => {
                                            const bet = parseInt(betAmount) || 0
                                            setBetAmount(bet + 500)
                                        }}
                                    >
                                        <div className="text">+500</div>
                                    </div>
                                </Grid>
                                <Grid item lg={1}>
                                    <div
                                        className="btn-animate"
                                        onClick={() => {
                                            const bet = parseInt(betAmount) || 0
                                            setBetAmount(bet + 1000)
                                        }}
                                    >
                                        <div className="text">+1000</div>
                                    </div>
                                </Grid>
                                <Grid item lg={1}>
                                    <div
                                        className="btn-animate"
                                        onClick={() => {
                                            setBetAmount(2000)
                                        }}
                                    >
                                        <div className="text">Max</div>
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item lg={12} className="center">
                            <button className="btn gradient-btn">
                                Create Game
                            </button>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        )
    }

    const watchModal = () => {
        return (
            <Dialog
                fullScreen={fullScreen}
                open={openWatchDailog}
                onClose={() => setOpenWatchDailog(false)}
                aria-labelledby="responsive-dialog-title"
                TransitionComponent={Transition}
                PaperProps={{
                    style: {
                        borderRadius: '20px',
                        backgroundOrigin: 'border-box',
                        backgroundColor: '#000',
                        backgroundClip: 'content-box, border-box',
                        color: '#fff',

                        boxShadow:
                            'inset 0 1px 1px #00000014, 0 0 8px #66afe999',
                    },
                }}
                className="coin-flip"
                maxWidth="md"
            >
                <DialogTitle id="responsive-dialog-title">
                    {'User Game'}
                </DialogTitle>
                <DialogContent>
                    <Grid container className="create-game" spacing={3}>
                        <Grid
                            item
                            lg={4}
                            className="center"
                            style={{flexDirection: 'column'}}
                        >
                            {watchModalDetails?.coin === coin.GOLD ? (
                                <img
                                    className={
                                        selectedCoin === coin.GOLD
                                            ? 'coin-img selected'
                                            : 'coin-img'
                                    }
                                    src={goldCoin}
                                    alt="gold coin"
                                />
                            ) : (
                                <img
                                    className={
                                        selectedCoin === coin.SILVER
                                            ? 'coin-img selected'
                                            : 'coin-img'
                                    }
                                    src={silverCoin}
                                    alt="silver coin"
                                />
                            )}
                            <Grid
                                container
                                style={{marginTop: '1rem'}}
                                spacing={2}
                            >
                                <Grid item style={{textAlign: 'right'}} lg={6}>
                                    <img src={coins} width={50} />
                                </Grid>
                                <Grid
                                    item
                                    style={{alignItems: 'center'}}
                                    lg={6}
                                >
                                    {watchModalDetails.amount}
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item lg={8} className="center">
                            {watchModalDetails.address}
                        </Grid>
                        <Grid item lg={12} className="center">
                            <button
                                onClick={() => setOpenWatchDailog(false)}
                                className="btn gradient-btn"
                            >
                                close
                            </button>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        )
    }

    const joinModal = () => {
        return (
            <Dialog
                fullScreen={fullScreen}
                open={openJoinDailog}
                onClose={() => setOpenJoinDailog(false)}
                aria-labelledby="responsive-dialog-title"
                TransitionComponent={Transition}
                PaperProps={{
                    style: {
                        borderRadius: '20px',
                        backgroundOrigin: 'border-box',
                        backgroundColor: '#000',
                        backgroundClip: 'content-box, border-box',
                        color: '#fff',

                        boxShadow:
                            'inset 0 1px 1px #00000014, 0 0 8px #66afe999',
                    },
                }}
                className="coin-flip"
                maxWidth="md"
            >
                <DialogTitle id="responsive-dialog-title">
                    {'User Game'}
                </DialogTitle>
                <DialogContent>
                    <Grid container className="create-game" spacing={3}>
                        <Grid
                            item
                            lg={4}
                            className="center"
                            style={{
                                flexDirection: 'column',
                                wordBreak: 'break-all',
                                textAlign: 'center',
                            }}
                        >
                            {watchModalDetails.address}
                            <Grid
                                container
                                style={{marginTop: '1rem'}}
                                spacing={2}
                            >
                                <Grid item style={{textAlign: 'right'}} lg={6}>
                                    <img src={coins} width={50} />
                                </Grid>
                                <Grid
                                    item
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'flex-start',
                                    }}
                                    lg={6}
                                >
                                    {watchModalDetails.amount}
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid
                            item
                            lg={4}
                            className="center"
                            style={{flexDirection: 'column'}}
                        >
                            <div id="coin" className={flipResult}>
                                <div class="side-a">
                                    <img
                                        width="100"
                                        src={goldCoin}
                                        alt="gold-coin"
                                    />
                                </div>
                                <div class="side-b">
                                    <img
                                        width="100"
                                        src={silverCoin}
                                        alt="gold-coin"
                                    />
                                </div>
                            </div>
                            <button
                                className="btn gradient-btn"
                                style={{marginTop: '0.5rem'}}
                                onClick={coinToss}
                            >
                                Coin Toss
                            </button>
                        </Grid>
                        <Grid
                            item
                            lg={4}
                            className="center"
                            style={{
                                flexDirection: 'column',
                                wordBreak: 'break-all',
                                textAlign: 'center',
                            }}
                        >
                            {watchModalDetails.address}
                            <Grid
                                container
                                style={{marginTop: '1rem'}}
                                spacing={2}
                            >
                                <Grid item style={{textAlign: 'right'}} lg={6}>
                                    <img src={coins} width={50} />
                                </Grid>
                                <Grid
                                    item
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'flex-start',
                                    }}
                                    lg={6}
                                >
                                    {watchModalDetails.amount}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        )
    }
    return (
        <Box sx={{p: 5}} className="coin-flip">
            {createCoinFlipModal()}
            {watchModal()}
            {joinModal()}
            <PageHeader
                title="Coin Flip"
                btnTitle="Create Match"
                btnMethod={() => setOpenCreateDailog(true)}
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
                            <TableRow key={1} className="table-row">
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
                                            <button
                                                className="btn gradient-btn w-100"
                                                onClick={() => {
                                                    setOpenJoinDailog(true)
                                                }}
                                            >
                                                Join
                                            </button>
                                        </Grid>
                                        <Grid item lg={6} md={12}>
                                            <button
                                                className="btn border-gradient border-gradient-secondary w-100"
                                                onClick={() =>
                                                    setOpenWatchDailog(true)
                                                }
                                            >
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
