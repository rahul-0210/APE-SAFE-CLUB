import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {BrowserRouter} from 'react-router-dom'
import './sass/index.scss'

//  ** snackbar
import {Box, Slide} from '@material-ui/core'
import {SnackbarProvider} from 'notistack'
import closeIcon from './assets/CloseIcon.svg'

import {Web3ReactProvider} from '@web3-react/core'
import Web3 from 'web3'

// ** Redux Imports
import {Provider} from 'react-redux'
import {store} from './redux/storeConfig/store'

function getLibrary(provider) {
    return new Web3(provider)
}

const notistackRef = React.createRef()
const onClickDismiss = (key) => () => {
    notistackRef.current.closeSnackbar(key)
}

ReactDOM.render(
    <React.StrictMode>
        <Web3ReactProvider getLibrary={getLibrary}>
            <Provider store={store}>
                <BrowserRouter>
                    <SnackbarProvider
                        dense
                        // hideIconVariant
                        maxSnack={3}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        ref={notistackRef}
                        action={(key) => (
                            <Box
                                sx={{
                                    cursor: 'pointer',
                                    '& > svg': {
                                        color: '#020202',
                                        padding: '2px',
                                        fontSize: '18px',
                                        marginTop: '2px',
                                        background: '#fbfbfb',
                                        borderRadius: '10px',
                                    },
                                }}
                                onClick={onClickDismiss(key)}
                            >
                                <img
                                    className="imgIcon"
                                    src={closeIcon}
                                    alt=""
                                />
                            </Box>
                        )}
                        TransitionComponent={Slide}
                    >
                        <App />
                    </SnackbarProvider>
                </BrowserRouter>
            </Provider>
        </Web3ReactProvider>
    </React.StrictMode>,
    document.getElementById('root')
)
