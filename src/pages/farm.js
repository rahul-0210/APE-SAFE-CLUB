import React, {useEffect, useState} from 'react'
import {Box, Grid} from '@material-ui/core'
import {useDispatch, useSelector} from 'react-redux'
import FarmingCard from '../components/FarmingCard'
import {
    getPoolLength,
    getPoolInfo,
    getLpTokenBalance,
    getUserInfo,
    getEarnedTokens,
    getPendingtokens,
    getLpTokenName,
    getLpTokenSymbol0,
    getLpTokenSymbol1,
    getLpToken0,
    getLpToken1,
    getLpTokenAllowance,
    getLpToken0Liquidity,
    getLpToken1Liquidity,
    getLpTotalSupply,
    getTokensPerBlock,
    getTotalAllocPoint,
} from '../utils/contractMethods/farm.service'

export default function Farm() {
    const [poolLength, setPoolLength] = useState(null)
    const [poolDetails, setPoolDetails] = useState([])
    const [lpTokenBalance, setLpTokenBalance] = useState([])
    const {walletAddress} = useSelector((state) => state.wallet)

    useEffect(() => {
        getFarmPoolLength()
    }, [])

    const getFarmPoolLength = async () => {
        const length = await getPoolLength(walletAddress)
        setPoolLength(length)
    }

    useEffect(() => {
        poolLength > 0 && farmingCardInfo()
    }, [poolLength])

    const farmingCardInfo = async () => {
        const poolDetails = [],
            lpTokenBalance = [],
            userDetails = [],
            totalTokensPerBlock = [],
            totalEarnedTokens = [],
            totalPendingTokens = [],
            lpTokenName = [],
            lpTokenSymbol0 = [],
            lpTokenSymbol1 = [],
            lpTokenTotalSupply = [],
            lpToken0 = [],
            lpToken1 = [],
            lpTokenAllowance = [],
            lpToken0Liquidity = [],
            lpToken1Liquidity = [],
            totalAllocPoints = []
        for (let i = 0; i < poolLength; i++) {
            const poolInfo = await getPoolInfo(walletAddress, i)
            poolDetails.push(poolInfo)

            const lpBalance = await getLpTokenBalance(
                walletAddress,
                poolInfo?.lpToken
            )
            lpTokenBalance.push(lpBalance)

            const userInfo = await getUserInfo(walletAddress, i)
            userDetails.push(userInfo)

            const tokensPerBlock = await getTokensPerBlock(walletAddress)
            totalTokensPerBlock.push(tokensPerBlock)

            const allocPoints = await getTotalAllocPoint(walletAddress)
            totalAllocPoints.push(allocPoints)

            const earnedTokens = await getEarnedTokens(walletAddress)
            totalEarnedTokens.push(earnedTokens)

            const pendingTokens = await getPendingtokens(walletAddress, i)
            totalPendingTokens.push(pendingTokens)

            const lpName = await getLpTokenName(
                walletAddress,
                poolInfo?.lpToken
            )
            lpTokenName.push(lpName)

            const lpTotalSupply = await getLpTotalSupply(
                walletAddress,
                poolInfo?.lpToken
            )
            lpTokenTotalSupply.push(lpTotalSupply)

            const lp0 = await getLpToken0(walletAddress, poolInfo?.lpToken)
            lpToken0.push(lp0)

            const lp1 = await getLpToken1(walletAddress, poolInfo?.lpToken)
            lpToken1.push(lp1)

            const lpSymbol0 = await getLpTokenSymbol0(walletAddress, lp0)
            lpTokenSymbol0.push(lpSymbol0)

            const lpSymbol1 = await getLpTokenSymbol1(walletAddress, lp1)
            lpTokenSymbol1.push(lpSymbol1)

            const lpAllowance = await getLpTokenAllowance(
                walletAddress,
                poolInfo?.lpToken
            )
            lpTokenAllowance.push(lpAllowance)

            const lp0Liquidity = await getLpToken0Liquidity(
                walletAddress,
                poolInfo?.lpToken,
                lp0
            )
            lpToken0Liquidity.push(lp0Liquidity)

            const lp1Liquidity = await getLpToken1Liquidity(
                walletAddress,
                poolInfo?.lpToken,
                lp1
            )
            lpToken1Liquidity.push(lp1Liquidity)
        }
        setPoolDetails(poolDetails)
        setLpTokenBalance(lpTokenBalance)
    }

    return (
        <div className="stacking-connected">
            <div className="main">
                <Box sx={{m: 4}}>
                    <Grid container spacing={2}>
                        <FarmingCard />
                    </Grid>
                </Box>
                {/* <ScrollBottom /> */}
            </div>
        </div>
    )
}
