import {
    SET_WALLET,
    SET_WALLET_CONNECTION_STATUS,
    SET_DISPLAY_WALLET,
} from '../types'

const initialState = {
    walletAddress: '',
    walletConnectionStatus: false,
    displayWalletAddress: '',
}
// eslint-disable-next-line
export default function (state = initialState, action) {
    const {type, payload} = action
    switch (type) {
        case SET_WALLET:
            return {
                ...state,
                walletAddress: payload,
            }
        case SET_WALLET_CONNECTION_STATUS:
            return {
                ...state,
                walletConnectionStatus: payload,
            }
        case SET_DISPLAY_WALLET:
            return {
                ...state,
                displayWalletAddress: payload,
            }
        default:
            return state
    }
}
