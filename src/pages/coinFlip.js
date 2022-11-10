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
import React, {useState, useEffect} from 'react'
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
import {getGameData, resetGameData} from '../redux/actions/coin-flip-action'
import {useDispatch, useSelector} from 'react-redux'
import {useSnackbar} from 'notistack'
import {createGame, startTossingGame} from '../utils/contractMethods/coinFlip'
import {setLoaderDisplay} from '../redux/actions/master-actions'

let dataInterval
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})
export default function CoinFlip() {
    const {enqueueSnackbar} = useSnackbar()

    const [openCreateDailog, setOpenCreateDailog] = useState(false)
    const [openWatchDailog, setOpenWatchDailog] = useState(false)
    const [openJoinDailog, setOpenJoinDailog] = useState({
        gameCount: null,
        isOpen: false,
    })
    const [betAmount, setBetAmount] = useState(0)
    const [selectedCoin, setSelectedCoin] = useState(null)
    const [flipResult, setFlipResult] = useState(null)

    const [watchModalDetails, setWatchModalDetails] = useState([])
    const dispatch = useDispatch()
    const {walletAddress} = useSelector((state) => state.wallet)
    const {userTokenBal, coinFlipTableData} = useSelector(
        (state) => state.conFlipReducer
    )

    useEffect(() => {
        if (walletAddress) {
            dataInterval = setInterval(() => {
                dispatch(getGameData(walletAddress))
            }, 2000)
        } else {
            clearInterval(dataInterval)
            dispatch(resetGameData())
        }
        return () => {
            clearInterval(dataInterval)
        }
    }, [walletAddress])

    const coin = {
        GOLD: true,
        SILVER: false,
    }

    const theme = useTheme()
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

    const coinToss = async (gameCount) => {
        try {
            const result = await startTossingGame(gameCount, walletAddress)
            console.log('result', result)
            setOpenJoinDailog({
                gameCount: null,
                isOpen: false,
            })
        } catch (err) {
            console.log('err', err)
            enqueueSnackbar('Something went wrong', {
                variant: 'error',
            })
        }
        // if (Math.random() < 0.5) {
        //     setFlipResult('heads')
        //     console.log('heads')
        // } else {
        //     setFlipResult('tails')
        //     console.log('tails')
        // }
    }

    const createBet = async () => {
        try {
            if (selectedCoin === null) {
                enqueueSnackbar('Please select coin', {
                    variant: 'error',
                })
                return
            }
            if (!betAmount) {
                enqueueSnackbar('please select Amount', {
                    variant: 'error',
                })
                return
            }
            if (betAmount > userTokenBal) {
                enqueueSnackbar('Bet Amout is more than users balance', {
                    variant: 'error',
                })
                return
            }
            dispatch(setLoaderDisplay(true, true))
            let result = await createGame(
                selectedCoin,
                betAmount,
                walletAddress
            )
            dispatch(setLoaderDisplay(true, true))
            enqueueSnackbar('Bet Placed Successfully', {
                variant: 'success',
            })
        } catch (error) {
            console.log('%c Line:82 🍉 error', 'color:#f5ce50', error)
            dispatch(setLoaderDisplay(true, true))
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
                                            setBetAmount(userTokenBal)
                                        }}
                                    >
                                        <div className="text">Max</div>
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item lg={12} className="center">
                            <button
                                className="btn gradient-btn"
                                onClick={createBet}
                            >
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
                            {watchModalDetails[4] === coin.GOLD ? (
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
                                    <img
                                        src={coins}
                                        width={50}
                                        alt="coin img"
                                    />
                                </Grid>
                                <Grid
                                    item
                                    style={{alignItems: 'center'}}
                                    lg={6}
                                >
                                    {watchModalDetails[3] / 10 ** 18} ASC
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item lg={8} className="center">
                            {watchModalDetails[0]}
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
                open={openJoinDailog.isOpen}
                onClose={() =>
                    setOpenJoinDailog({gameCount: null, isOpen: false})
                }
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
                            {watchModalDetails[0]}
                            <Grid
                                container
                                style={{marginTop: '1rem'}}
                                spacing={2}
                            >
                                <Grid item style={{textAlign: 'right'}} lg={6}>
                                    <img
                                        src={coins}
                                        width={50}
                                        alt="coin img"
                                    />
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
                                    {watchModalDetails[3] / 10 ** 18} ASC
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
                                <div className="side-a">
                                    <img
                                        width="100"
                                        src={goldCoin}
                                        alt="gold-coin"
                                    />
                                </div>
                                <div className="side-b">
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
                                onClick={() =>
                                    coinToss(openJoinDailog.gameCount)
                                }
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
                            {walletAddress}
                            <Grid
                                container
                                style={{marginTop: '1rem'}}
                                spacing={2}
                            >
                                <Grid item style={{textAlign: 'right'}} lg={6}>
                                    <img
                                        src={coins}
                                        width={50}
                                        alt="coin img"
                                    />
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
                                    {watchModalDetails[3] / 10 ** 18} ASC
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
                                    Amount
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
                            {coinFlipTableData && coinFlipTableData.length
                                ? coinFlipTableData.map((cp, index) => (
                                      <TableRow
                                          key={index}
                                          className="table-row"
                                      >
                                          <TableCell
                                              className="table-row"
                                              component="td"
                                              scope="row"
                                          >
                                              {cp[0]}
                                          </TableCell>
                                          <TableCell
                                              className="table-row"
                                              align="center"
                                          >
                                              <img
                                                  src={
                                                      cp[4]
                                                          ? goldCoin
                                                          : silverCoin
                                                  }
                                                  width={75}
                                                  alt="user coin"
                                              />
                                          </TableCell>
                                          <TableCell
                                              className="table-row"
                                              align="right"
                                          >
                                              {cp[3] / 10 ** 18}
                                          </TableCell>
                                          <TableCell
                                              className="table-row"
                                              align="right"
                                          >
                                              <Grid container spacing={2}>
                                                  <Grid item lg={6} md={12}>
                                                      <button
                                                          className="btn gradient-btn w-100"
                                                          onClick={() => {
                                                              setWatchModalDetails(
                                                                  cp
                                                              )
                                                              setOpenJoinDailog(
                                                                  {
                                                                      gameCount:
                                                                          index,
                                                                      isOpen: true,
                                                                  }
                                                              )
                                                          }}
                                                      >
                                                          Join
                                                      </button>
                                                  </Grid>
                                                  <Grid item lg={6} md={12}>
                                                      <button
                                                          className="btn border-gradient border-gradient-secondary w-100"
                                                          onClick={() => {
                                                              setWatchModalDetails(
                                                                  cp
                                                              )
                                                              setOpenWatchDailog(
                                                                  true
                                                              )
                                                          }}
                                                      >
                                                          Watch
                                                      </button>
                                                  </Grid>
                                              </Grid>
                                          </TableCell>
                                      </TableRow>
                                  ))
                                : null}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    )
}
