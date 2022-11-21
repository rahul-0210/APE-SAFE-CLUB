import {USER_TOKEN_BALANCE, COIN_FLIP_GAME_TABLE_DATA, INACTIVE_COIN_FLIP_GAME_TABLE_DATA} from '../types'

const initialState = {
    userTokenBal: '',
    coinFlipTableData: [],
    inactiveCoinFlipTableData: []
}

// eslint-disable-next-line
export default function (state = initialState, action) {
    const {type, payload} = action
    switch (type) {
        case USER_TOKEN_BALANCE:
            return {
                ...state,
                userTokenBal: payload,
            }
        case COIN_FLIP_GAME_TABLE_DATA:
            return {
                ...state,
                coinFlipTableData: payload,
            }
        case INACTIVE_COIN_FLIP_GAME_TABLE_DATA:
            return {
                ...state,
                inactiveCoinFlipTableData: payload
            }
        default:
            return state
    }
}
