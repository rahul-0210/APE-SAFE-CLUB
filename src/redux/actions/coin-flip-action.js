import { userBalance, getAllGames } from '../../utils/contractMethods/coinFlip';
import {USER_TOKEN_BALANCE, COIN_FLIP_GAME_TABLE_DATA} from '../types'


export const getGameData = (userAddress) => dispatch => {
    dispatch(getUserTokenBalance(userAddress));
    dispatch(getAllGamesData(userAddress));
}

export const getUserTokenBalance = userAddress => async dispatch => {
    try {
        let rest = await userBalance(userAddress);
        dispatch({
            type: USER_TOKEN_BALANCE,
            payload: rest
        })
    } catch (error) {
        console.log("%c Line:17 🥒 error", "color:#7f2b82", error);
    }
}

export const getAllGamesData = userAddress => async dispatch => {
    try {
        let rest = await getAllGames();
        dispatch({
            type: COIN_FLIP_GAME_TABLE_DATA,
            payload: rest
        })
    } catch (error) {
        console.log("%c Line:30 🥑 error", "color:#ed9ec7", error);
    }
}

export const resetGameData = () => dispatch => {
    dispatch({
        type: USER_TOKEN_BALANCE,
        payload: ""
    });
    dispatch({
        type: COIN_FLIP_GAME_TABLE_DATA,
        payload: []
    })
}