import React, {useEffect} from 'react'
import {Switch, Route, useHistory} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {useSelector} from 'react-redux'
import {useSnackbar} from 'notistack'

import {DashboardLayout} from './components/layouts/DashboardLayout'
import ConnectWallet from './pages/connectWallet'
// import coinFlip from "./pages/coinFlip";
// import rollDice from "./pages/rollDice";
// import LoaderComponent from "./components/loaderComponent";
// import { connectionAction } from "./redux/actions/connectionAction";

function App() {
    const {enqueueSnackbar} = useSnackbar()
    // const { activateBrowserWallet, account } = useEthers()
    const history = useHistory()
    const dispatch = useDispatch()
    const isConnected = useSelector((state) => state.connectionReducer)

    // useEffect(() => {
    //   if (!account) {
    //     dispatch(connectionAction(false));
    //       history.push('/')
    //   }
    // }, [account, dispatch, history]);

    useEffect(() => {
        // activateBrowserWallet();
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
    }, [])

    return (
        <div className="App">
            <Switch>
                <Route path="*">
                    <DashboardLayout>
                        <Switch>
                            <Route path="/" component={ConnectWallet} exact />
                            {/* {isConnected && <Route path='/dice' component={rollDice} />}
              {isConnected && <Route path="/coin-flip" component={coinFlip} /> } */}
                            <Route path="*" component={ConnectWallet} />
                        </Switch>
                    </DashboardLayout>
                </Route>
            </Switch>
        </div>
    )
}

export default App
