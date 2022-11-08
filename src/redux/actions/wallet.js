import {
    SET_WALLET,
    SET_WALLET_CONNECTION_STATUS,
    SET_DISPLAY_WALLET,
} from '../types'

export const setWalletAddress = (address) => (dispatch) => {
    dispatch({
        type: SET_WALLET,
        payload: address,
    })
}

export const setWalletConnectionStatus = (status) => (dispatch) => {
    dispatch({
        type: SET_WALLET_CONNECTION_STATUS,
        payload: status,
    })
}

export const setDisplayWalletAdress = (displayAddress) => (dispatch) => {
    dispatch({
        type: SET_DISPLAY_WALLET,
        payload: displayAddress,
    })
}
