// import BigNumber from 'bignumber.js';
import Web3 from 'web3'
const web3 = new Web3(window.ethereum)
// const commaNumber = require('comma-number');
const coinFlipAbi = require('../../abi/coin-flip.json')
const tokenAbi = require('../../abi/erc20ABI.json')

// BigNumber.config({ DECIMAL_PLACES: 5 });
// BigNumber.set({ ROUNDING_MODE: BigNumber.ROUND_UP });
// const format = commaNumber.bindWith(',', '.');
const coinFlipContractAddress = process.env.REACT_APP_COIN_FLIP_CONTRACT
const coinFlipTokenAddress = process.env.REACT_APP_COIN_FLIP_TOKEN_ADDRESS

const coinFlipContract = new web3.eth.Contract(
    coinFlipAbi,
    coinFlipContractAddress
)

const tokenContract = new web3.eth.Contract(tokenAbi, coinFlipTokenAddress)

const setAmountProperly = (amount) => {
    amount = amount.toString()
    if (amount.includes('e')) {
        let [base, expo] = amount.split('e')
        let expoBase = 20
        if (expo - expoBase > 0) {
            amount = parseFloat(`${base}e+20`).toFixed()
            let amountStr = '0'.repeat(expo - expoBase)
            amount = amount + amountStr
        } else {
            amount = amount.toFixed(1)
        }
    }
    return amount
}

export const userBalance = async (userAddress) => {
    try {
        let amount = await tokenContract.methods
            .balanceOf(userAddress)
            .call({from: userAddress})
        amount = (amount / 10 ** 18).toFixed(3).toString()
        return amount
    } catch (error) {
        throw error
    }
}

export const createGame = async (side, amount, userAddress) => {
    amount = amount * 10 ** 18
    amount = setAmountProperly(amount.toString())
    try {
        const allowanace = await isApproved(userAddress)
        if (!+allowanace) {
            const res = await approve(userAddress)
            console.log('res', res)
        }
        const result = await coinFlipContract.methods
            .createFlipGame(amount, side)
            .send({from: userAddress})
        return result
    } catch (error) {
        throw error
    }
}

export const startTossingGame = async (gameCount, userAddress) => {
    try {
        const amount = await isApproved(userAddress)
        if (!+amount) {
            const res = await approve(userAddress)
            console.log('res', res)
        }
        const result = await coinFlipContract.methods
            .takeBet(gameCount)
            .send({from: userAddress})
        console.log('result', result)
        const eventData = result.events?.WinnerAnnounced?.returnValues
        console.log('eventData', eventData)
        return eventData
    } catch (error) {
        throw error
    }
}

export const approve = async (userAddress) => {
    let amount = 10000000000 * 10 ** 18
    amount = setAmountProperly(amount.toString())
    try {
        let result = await tokenContract.methods
            .approve(coinFlipContractAddress, amount)
            .send({from: userAddress})
        return result
    } catch (error) {
        throw error
    }
}

export const isApproved = async (userAddress) => {
    try {
        let amount = await tokenContract.methods
            .allowance(userAddress, coinFlipContractAddress)
            .call({from: userAddress})
        amount = (amount / 10 ** 18).toFixed(3).toString()
        return amount
    } catch (error) {
        throw error
    }
}

export const getAllGames = async (userAddress) => {
    try {
        const result = await coinFlipContract.methods
            .getAllGames()
            .call({from: userAddress})
        return result
    } catch (error) {
        throw error
    }
}
