import Web3 from 'web3'
import farmingABI from '../../abi/farmingABI.json'
import lpTokenABI from '../../abi/lpTokenABI.json'

const web3 = new Web3(window.ethereum)

const farmingContractAddress = process.env.REACT_APP_FARMING_CONTRACT_ADDRESS
// const lpTokenContractAddress = process.env.REACT_APP_LPTOKEN_CONTRACT_ADDRESS

const farmingContract = new web3.eth.Contract(
    farmingABI,
    farmingContractAddress
)

export const getPoolLength = async (walletAddress) => {
    try {
        const length = await farmingContract.methods
            .poolLength()
            .call({from: walletAddress})
        return length
    } catch (error) {
        throw error
    }
}

export const getPoolInfo = async (walletAddress, pool) => {
    try {
        const res = await farmingContract.methods
            .poolInfo(pool)
            .call({from: walletAddress})
        return res
    } catch (error) {
        throw error
    }
}

export const getUserInfo = async (walletAddress, pool) => {
    try {
        const userInfo = await farmingContract.methods
            .userInfo(pool, walletAddress)
            .call({from: walletAddress})
        return userInfo
    } catch (error) {
        throw error
    }
}

export const getEarnedTokens = async (walletAddress) => {
    try {
        const earnedTokens = await farmingContract.methods
            .earnedTokens(walletAddress)
            .call({from: walletAddress})
        return earnedTokens
    } catch (error) {
        throw error
    }
}

export const getPendingtokens = async (walletAddress, pool) => {
    try {
        const pendingTokens = await farmingContract.methods
            .pendingTGC(pool, walletAddress)
            .call({from: walletAddress})
        return pendingTokens
    } catch (error) {
        throw error
    }
}

export const getTokensPerBlock = async (walletAddress) => {
    try {
        const tokenPerBlock = await farmingContract.methods
            .tgcPerBlock()
            .call({from: walletAddress})
        return tokenPerBlock
    } catch (error) {
        throw error
    }
}

export const getTotalAllocPoint = async (walletAddress) => {
    try {
        const totalAllocPoint = await farmingContract.methods
            .totalAllocPoint()
            .call({from: walletAddress})
        return totalAllocPoint
    } catch (error) {
        throw error
    }
}

export const getLpTokenBalance = async (
    walletAddress,
    lpTokenContractAddress
) => {
    try {
        const lpTokenContract = new web3.eth.Contract(
            lpTokenABI,
            lpTokenContractAddress
        )
        let balance = await lpTokenContract.methods
            .balanceOf(walletAddress)
            .call({from: walletAddress})
        balance = (balance / 10 ** 18).toFixed(3).toString()
        return balance
    } catch (error) {
        throw error
    }
}

export const getLpTokenName = async (walletAddress, lpTokenContractAddress) => {
    try {
        const lpTokenContract = new web3.eth.Contract(
            lpTokenABI,
            lpTokenContractAddress
        )
        const name = await lpTokenContract.methods
            .name()
            .call({from: walletAddress})
        return name
    } catch (error) {
        throw error
    }
}

export const getLpTokenAllowance = async (
    walletAddress,
    lpTokenContractAddress
) => {
    try {
        const lpTokenContract = new web3.eth.Contract(
            lpTokenABI,
            lpTokenContractAddress
        )
        const tokenAllowance = await lpTokenContract.methods
            .allowance(walletAddress, farmingContractAddress)
            .call({from: walletAddress})
        return tokenAllowance
    } catch (error) {
        throw error
    }
}

export const getLpTokenSymbol0 = async (
    walletAddress,
    lpToken0ContractAddress
) => {
    try {
        const lpToken0Contract = new web3.eth.Contract(
            lpTokenABI,
            lpToken0ContractAddress
        )
        const symbol0 = await lpToken0Contract.methods
            .symbol()
            .call({from: walletAddress})
        return symbol0
    } catch (error) {
        throw error
    }
}

export const getLpTokenSymbol1 = async (
    walletAddress,
    lpToken1ContractAddress
) => {
    try {
        const lpToken1Contract = new web3.eth.Contract(
            lpTokenABI,
            lpToken1ContractAddress
        )
        const symbol1 = await lpToken1Contract.methods
            .symbol()
            .call({from: walletAddress})
        return symbol1
    } catch (error) {
        throw error
    }
}

export const getLpTotalSupply = async (
    walletAddress,
    lpTokenContractAddress
) => {
    try {
        const lpTokenContract = new web3.eth.Contract(
            lpTokenABI,
            lpTokenContractAddress
        )
        let totalSupply = await lpTokenContract.methods
            .totalSupply()
            .call({from: walletAddress})
        totalSupply = (totalSupply / 10 ** 18).toFixed(3).toString()
        return totalSupply
    } catch (error) {
        throw error
    }
}

export const getLpToken0 = async (walletAddress, lpTokenContractAddress) => {
    try {
        const lpTokenContract = new web3.eth.Contract(
            lpTokenABI,
            lpTokenContractAddress
        )
        const token0 = await lpTokenContract.methods
            .token0()
            .call({from: walletAddress})
        return token0
    } catch (error) {
        throw error
    }
}

export const getLpToken1 = async (walletAddress, lpTokenContractAddress) => {
    try {
        const lpTokenContract = new web3.eth.Contract(
            lpTokenABI,
            lpTokenContractAddress
        )
        const token1 = await lpTokenContract.methods
            .token1()
            .call({from: walletAddress})
        return token1
    } catch (error) {
        throw error
    }
}

export const getLpToken0Liquidity = async (
    walletAddress,
    lpTokenContractAddress,
    lpToken0ContractAddress
) => {
    try {
        const lpToken0Contract = new web3.eth.Contract(
            lpTokenABI,
            lpToken0ContractAddress
        )
        let token0Liquidity = await lpToken0Contract.methods
            .balanceOf(lpTokenContractAddress)
            .call({from: walletAddress})
        token0Liquidity = (token0Liquidity / 10 ** 18).toFixed(3).toString()
        return token0Liquidity
    } catch (error) {
        throw error
    }
}

export const getLpToken1Liquidity = async (
    walletAddress,
    lpTokenContractAddress,
    lpToken1ContractAddress
) => {
    try {
        const lpToken1Contract = new web3.eth.Contract(
            lpTokenABI,
            lpToken1ContractAddress
        )
        let token1Liquidity = await lpToken1Contract.methods
            .balanceOf(lpTokenContractAddress)
            .call({from: walletAddress})
        token1Liquidity = (token1Liquidity / 10 ** 18).toFixed(3).toString()
        return token1Liquidity
    } catch (error) {
        throw error
    }
}
