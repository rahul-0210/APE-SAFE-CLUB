import {SET_WALLET, SET_METAMASK_DISCONNECTED} from '../types'

export const setMetamaskWalletAdress = (address) => dispatch => {
  dispatch({
    type: SET_WALLET,
    payload: address
  })
}

export const setMetamaskWalletDisconnected = (connector) => dispatch => {
  dispatch({
    type: SET_METAMASK_DISCONNECTED,
    payload: connector
  })
}