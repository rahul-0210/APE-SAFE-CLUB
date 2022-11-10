// import BigNumber from 'bignumber.js';
import Web3 from 'web3'
const web3 = new Web3(window.ethereum)
// const commaNumber = require('comma-number');
const coinFlipAbi = require('../../abi/coin-flip.json')

// BigNumber.config({ DECIMAL_PLACES: 5 });
// BigNumber.set({ ROUNDING_MODE: BigNumber.ROUND_UP });
// const format = commaNumber.bindWith(',', '.');
const coinFlipContractAddress = process.env.REACT_APP_COIN_FLIP_CONTRACT
const coinFlipTokenAddress = process.env.REACT_APP_COIN_FLIP_TOKEN_ADDRESS

const coinFlipContract = new web3.eth.Contract(
    coinFlipAbi,
    coinFlipContractAddress
)

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
        const minABI = [
            {
              constant: true,
              inputs: [{ name: "_owner", type: "address" }],
              name: "balanceOf",
              outputs: [{ name: "balance", type: "uint256" }],
              type: "function",
            },
          ]
        const tokenContract = new web3.eth.Contract(
            minABI,
            coinFlipTokenAddress
        )
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
        const result = await coinFlipContract.methods
            .createFlipGame(amount, side)
            .send({from: userAddress})
        return result;
    } catch (error) {
        throw error
    }
}

export const getAllGames = async () => {
    try {
        const result = await coinFlipContract.methods
            .getAllGames()
            .call()
        return result
    } catch (error) {
        throw error
    }
}
