import {SET_WALLET, SET_METAMASK_DISCONNECTED} from '../types'

const initialState = {
    walletAddress: "",
    metamaskWalletDisconnected: false
}
// eslint-disable-next-line
export default function (state = initialState, action) {
    const { type, payload } = action
    switch (type) {
        case SET_WALLET:
            return {
                ...state,
                walletAddress: payload
            }
        case SET_METAMASK_DISCONNECTED:
            return {
                ...state,
                metamaskWalletDisconnected: payload
            }
        default:
            return state
    }
}