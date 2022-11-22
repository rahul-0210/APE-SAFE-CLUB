import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Grid,
    Tab,
} from '@material-ui/core'
import {TabContext, TabList, TabPanel} from '@mui/lab'
import React, {useState, useEffect} from 'react'
import PageHeader from '../components/PageHeader'
import silverCoin from '../assets/silvercoin.png'
import goldCoin from '../assets/goldCoin.png'
import coins from '../assets/coins.svg'
import coinBlue from '../assets/coins-blue.svg'
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
import LoaderComponent from '../components/loaderComponent.js'

let dataInterval
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})
export default function CoinFlip() {
    const {enqueueSnackbar} = useSnackbar()

    const [openCreateDailog, setOpenCreateDailog] = useState(false)
    const [openWatchDailog, setOpenWatchDailog] = useState(false)
    const [openJoinDailog, setOpenJoinDailog] = useState({
        gameData: null,
        isOpen: false,
    })
    const [betAmount, setBetAmount] = useState(0)
    const [selectedCoin, setSelectedCoin] = useState(null)
    const [flipResult, setFlipResult] = useState(null)
    const [isGameCreated, setIsGameCreated] = useState(false)

    const [watchModalDetails, setWatchModalDetails] = useState([])
    const [value, setValue] = React.useState('active')
    const dispatch = useDispatch()
    const {walletAddress} = useSelector((state) => state.wallet)
    const {userTokenBal, coinFlipTableData, inactiveCoinFlipTableData} =
        useSelector((state) => state.conFlipReducer)

    useEffect(() => {
        if (walletAddress || isGameCreated) {
            dispatch(getGameData(walletAddress))
            setIsGameCreated(false)
        } else {
            dispatch(resetGameData())
        }
        return () => {
            clearInterval(dataInterval)
        }
    }, [walletAddress, isGameCreated])

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    const coin = {
        GOLD: true,
        SILVER: false,
    }

    const theme = useTheme()
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

    const coinToss = async (gameData) => {
        try {
            dispatch(setLoaderDisplay(true, true))
            const result = await startTossingGame(
                gameData.gameCount,
                walletAddress
            )
            dispatch(setLoaderDisplay(false, false))
            if (result) setIsGameCreated(true)
            if (result.winner === gameData.player1) {
                if (gameData.coinSide) setFlipResult('heads')
                else if (!gameData.coinSide) setFlipResult('tails')
                setTimeout(() => {
                    enqueueSnackbar('Sorry! Try your luck again.', {
                        variant: 'error',
                    })
                }, 3000)
            } else if (result.winner === walletAddress) {
                if (gameData.coinSide) setFlipResult('heads')
                else if (!gameData.coinSide) setFlipResult('tails')
                setTimeout(() => {
                    enqueueSnackbar('Congratulations! You won the game.', {
                        variant: 'success',
                    })
                }, 3000)
            }
        } catch (err) {
            console.log('err', err)
            dispatch(setLoaderDisplay(false, false))
            enqueueSnackbar('Something went wrong', {
                variant: 'error',
            })
        }
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
            if (betAmount < 10) {
                enqueueSnackbar('Minimum bet amount is 10', {
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
            if (result) setIsGameCreated(true)
            dispatch(setLoaderDisplay(false, false))
            setOpenCreateDailog(false)
            enqueueSnackbar('Bet Placed Successfully', {
                variant: 'success',
            })
            setSelectedCoin(null)
            setBetAmount(0)
        } catch (error) {
            console.log('%c Line:82 🍉 error', 'color:#f5ce50', error)
            dispatch(setLoaderDisplay(false, false))
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
                <LoaderComponent />
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
                                    src={
                                        watchModalDetails.coinSide
                                            ? goldCoin
                                            : silverCoin
                                    }
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
                                    {+watchModalDetails?.betAmount / 10 ** 18}{' '}
                                    ASC
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
                onClose={() => {
                    setOpenJoinDailog({
                        gameData: null,
                        isOpen: false,
                        isActive: false,
                    })
                    setFlipResult(null)
                }}
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
                <LoaderComponent />
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
                                color:
                                    openJoinDailog?.gameData?.winner ===
                                    watchModalDetails[0]
                                        ? '#398df5'
                                        : '#fff',
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
                                        src={
                                            openJoinDailog?.gameData?.winner ===
                                            watchModalDetails[0]
                                                ? coinBlue
                                                : coins
                                        }
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
                                    {+watchModalDetails.betAmount / 10 ** 18}{' '}
                                    ASC
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
                                        src={
                                            watchModalDetails.coinSide
                                                ? goldCoin
                                                : silverCoin
                                        }
                                        alt="gold-coin"
                                    />
                                </div>
                                <div className="side-b">
                                    <img
                                        width="100"
                                        src={
                                            !watchModalDetails.coinSide
                                                ? silverCoin
                                                : goldCoin
                                        }
                                        alt="gold-coin"
                                    />
                                </div>
                            </div>
                            {openJoinDailog.isActive ? (
                                <button
                                    className="btn gradient-btn"
                                    style={{marginTop: '0.5rem'}}
                                    disabled={flipResult}
                                    onClick={() =>
                                        coinToss(openJoinDailog.gameData)
                                    }
                                >
                                    Coin Toss
                                </button>
                            ) : null}
                            {openJoinDailog?.gameData?.winner}
                        </Grid>
                        <Grid
                            item
                            lg={4}
                            className="center"
                            style={{
                                flexDirection: 'column',
                                wordBreak: 'break-all',
                                textAlign: 'center',
                                color:
                                    openJoinDailog?.gameData?.winner ===
                                    walletAddress
                                        ? '#398df5'
                                        : '#fff',
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
                                        src={
                                            openJoinDailog?.gameData?.winner ===
                                            walletAddress
                                                ? coinBlue
                                                : coins
                                        }
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
                                    {+watchModalDetails.betAmount / 10 ** 18}{' '}
                                    ASC
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        )
    }
    const displayWalletAddr = (account) => {
        return `${account.slice(0, 8)}...${account.slice(-4)}`
    }
    return (
        <Box sx={{p: 5}} className="coin-flip-main">
            {createCoinFlipModal()}
            {watchModal()}
            {joinModal()}
            <PageHeader
                title={`Coin Flip`}
                btnTitle="Create Match"
                userTokenBal={userTokenBal}
                btnMethod={() => setOpenCreateDailog(true)}
            />
            <Box>
                <TabContext value={value}>
                    <TabList value={value} onChange={handleChange} centered>
                        <Tab
                            className="coin-tab"
                            label="Active Games"
                            value="active"
                        />
                        <Tab
                            className="coin-tab"
                            label="Inactive Games"
                            value="in-active"
                        />
                    </TabList>
                    <TabPanel value="active">
                        <TableContainer component={Box} className="title-div">
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell
                                            component="th"
                                            className="table-header"
                                            align="center"
                                        >
                                            Game No.
                                        </TableCell>
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
                                    {coinFlipTableData &&
                                    coinFlipTableData.length
                                        ? coinFlipTableData.map((cp, index) => (
                                              <TableRow
                                                  key={index}
                                                  className="table-row"
                                              >
                                                  <TableCell
                                                      className="table-row"
                                                      component="td"
                                                      scope="row"
                                                      align="center"
                                                  >
                                                      {parseInt(cp.gameCount) +
                                                          1}
                                                  </TableCell>
                                                  <TableCell
                                                      className="table-row"
                                                      component="td"
                                                      scope="row"
                                                  >
                                                      {cp.player1}
                                                  </TableCell>
                                                  <TableCell
                                                      className="table-row"
                                                      align="center"
                                                  >
                                                      <img
                                                          src={
                                                              cp.coinSide
                                                                  ? goldCoin
                                                                  : silverCoin
                                                          }
                                                          width={75}
                                                          alt="user coin"
                                                      />
                                                  </TableCell>
                                                  <TableCell
                                                      className="table-row"
                                                      align="center"
                                                  >
                                                      {+cp.betAmount / 10 ** 18}
                                                  </TableCell>
                                                  <TableCell
                                                      className="table-row"
                                                      align="right"
                                                  >
                                                      <Grid
                                                          container
                                                          spacing={2}
                                                      >
                                                          {cp.player1 !==
                                                              walletAddress && (
                                                              <Grid
                                                                  item
                                                                  lg={6}
                                                                  md={12}
                                                              >
                                                                  <button
                                                                      className="btn gradient-btn w-100"
                                                                      onClick={() => {
                                                                          setWatchModalDetails(
                                                                              cp
                                                                          )
                                                                          setOpenJoinDailog(
                                                                              {
                                                                                  gameData:
                                                                                      cp,
                                                                                  isOpen: true,
                                                                                  isActive: true,
                                                                              }
                                                                          )
                                                                      }}
                                                                  >
                                                                      Join
                                                                  </button>
                                                              </Grid>
                                                          )}
                                                          <Grid
                                                              item
                                                              lg={6}
                                                              md={12}
                                                          >
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
                    </TabPanel>
                    <TabPanel value="in-active">
                        <TableContainer component={Box} className="title-div">
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell
                                            component="th"
                                            className="table-header"
                                            align="center"
                                        >
                                            Game No.
                                        </TableCell>
                                        <TableCell
                                            component="th"
                                            className="table-header"
                                            align="center"
                                        >
                                            Player 1
                                        </TableCell>
                                        <TableCell
                                            component="th"
                                            className="table-header"
                                            align="center"
                                        >
                                            Player 2
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
                                            Winner
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
                                    {inactiveCoinFlipTableData &&
                                    inactiveCoinFlipTableData.length
                                        ? inactiveCoinFlipTableData.map(
                                              (cp, index) => (
                                                  <TableRow
                                                      key={index}
                                                      className="table-row"
                                                  >
                                                      <TableCell
                                                          className="table-row"
                                                          component="td"
                                                          scope="row"
                                                          align="center"
                                                      >
                                                          {parseInt(
                                                              cp.gameCount
                                                          ) + 1}
                                                      </TableCell>
                                                      <TableCell
                                                          className="table-row"
                                                          component="td"
                                                          scope="row"
                                                      >
                                                          {displayWalletAddr(
                                                              cp.player1
                                                          )}
                                                      </TableCell>
                                                      <TableCell
                                                          className="table-row"
                                                          component="td"
                                                          scope="row"
                                                      >
                                                          {displayWalletAddr(
                                                              cp.player2
                                                          )}
                                                      </TableCell>
                                                      <TableCell
                                                          className="table-row"
                                                          align="center"
                                                      >
                                                          <img
                                                              src={
                                                                  cp.coinSide
                                                                      ? goldCoin
                                                                      : silverCoin
                                                              }
                                                              width={75}
                                                              alt="user coin"
                                                          />
                                                      </TableCell>
                                                      <TableCell
                                                          className="table-row"
                                                          component="td"
                                                          scope="row"
                                                      >
                                                          {displayWalletAddr(
                                                              cp.winner
                                                          )}
                                                      </TableCell>
                                                      <TableCell
                                                          className="table-row"
                                                          align="center"
                                                      >
                                                          {+cp.betAmount /
                                                              10 ** 18}
                                                      </TableCell>
                                                      <TableCell
                                                          className="table-row"
                                                          align="right"
                                                      >
                                                          <Grid
                                                              container
                                                              spacing={2}
                                                          >
                                                              <Grid
                                                                  item
                                                                  md={12}
                                                              >
                                                                  <button
                                                                      className="btn gradient-btn w-100"
                                                                      onClick={() => {
                                                                          setWatchModalDetails(
                                                                              cp
                                                                          )
                                                                          setOpenJoinDailog(
                                                                              {
                                                                                  gameData:
                                                                                      cp,
                                                                                  isOpen: true,
                                                                                  isActive: false,
                                                                              }
                                                                          )
                                                                      }}
                                                                  >
                                                                      Check it
                                                                      out
                                                                  </button>
                                                              </Grid>
                                                          </Grid>
                                                      </TableCell>
                                                  </TableRow>
                                              )
                                          )
                                        : null}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </TabPanel>
                </TabContext>
            </Box>
        </Box>
    )
}
