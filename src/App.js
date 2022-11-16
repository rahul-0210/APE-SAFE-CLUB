import React, {useEffect} from 'react'
import {Switch, Route, useHistory} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {useSelector} from 'react-redux'
import {useSnackbar} from 'notistack'

import {DashboardLayout} from './components/layouts/DashboardLayout'
import ConnectWallet from './pages/connectWallet'
import CoinFlip from './pages/coinFlip'
import RollDice from './pages/rollDice'
import {setWalletConnectionStatus} from './redux/actions/wallet'
import LoaderComponent from './components/loaderComponent'
import Farm from './pages/farm'

function App() {
    const {enqueueSnackbar} = useSnackbar()
    const history = useHistory()
    const dispatch = useDispatch()
    const {walletAddress, walletConnectionStatus} = useSelector(
        (state) => state.wallet
    )

    useEffect(() => {
        if (!walletAddress) {
            dispatch(setWalletConnectionStatus(false))
            history.push('/')
        }
    }, [walletAddress, walletConnectionStatus, dispatch, history])

    useEffect(() => {
        document.addEventListener(
            'keydown',
            function (e) {
                if (e.key === 'F12') {
                    enqueueSnackbar(
                        'This function has been disabled for security reasons!',
                        {
                            variant: 'warning',
                        }
                    )
                    e.preventDefault()
                }
            },
            false
        )

        document.addEventListener(
            'contextmenu',
            function (e) {
                enqueueSnackbar(
                    'This function has been disabled for security reasons!',
                    {
                        variant: 'warning',
                    }
                )
                e.preventDefault()
            },
            false
        )
    }, [enqueueSnackbar])

    return (
        <div className="App g-sidenav-show  bg-gray-100">
            <LoaderComponent />
            <Switch>
                <Route path="*">
                    <DashboardLayout>
                        <Switch>
                            <Route path="/" component={ConnectWallet} exact />
                            {walletConnectionStatus && (
                                <Route path="/farm" component={Farm} />
                            )}
                            {walletConnectionStatus && (
                                <Route path="/dice" component={RollDice} />
                            )}
                            {walletConnectionStatus && (
                                <Route path="/coin-flip" component={CoinFlip} />
                            )}
                            <Route path="*" component={ConnectWallet} />
                        </Switch>
                    </DashboardLayout>
                </Route>
            </Switch>
        </div>
    )
}

export default App
