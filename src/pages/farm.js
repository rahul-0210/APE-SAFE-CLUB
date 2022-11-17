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
    getLpTokenContract,
} from '../utils/contractMethods/farm.service'
import {getUSDRate} from '../api/request'

export default function Farm() {
    const [poolLength, setPoolLength] = useState(null)
    const [tokenPrice, setTokenPrice] = useState('')
    console.log('tokenPrice', tokenPrice)
    // const [allPoolsInfo, setAllPoolsInfo] = useState({
    //     poolId: [],
    //     multipliers: [],
    //     poolDetails: [],
    //     lpTokenBalance: [],
    //     userDetails: [],
    //     stakedValue: [],
    //     rewardDebt: [],
    //     stakeFee: [],
    //     lpTokenAddress: [],
    //     allocPoint: [],
    //     lpContract: [],
    //     totalTokensPerBlock: [],
    //     totalEarnedTokens: [],
    //     totalPendingTokens: [],
    //     lpTokenName: [],
    //     lpTokenSymbol0: [],
    //     lpTokenSymbol1: [],
    //     lpTokenTotalSupply: [],
    //     lpToken0: [],
    //     lpToken1: [],
    //     lpTokenAllowance: [],
    //     lpToken0Liquidity: [],
    //     lpToken1Liquidity: [],
    //     totalAllocPoints: [],
    // })
    const [allPoolsInfo, setAllPoolsInfo] = useState([])
    console.log('allPoolsInfo', allPoolsInfo)
    const {walletAddress} = useSelector((state) => state.wallet)

    useEffect(() => getFarmPoolLength(), [])

    const getFarmPoolLength = async () => {
        const length = await getPoolLength(walletAddress)
        setPoolLength(length)
    }

    useEffect(() => {
        poolLength > 0 && farmingCardInfo()
    }, [poolLength])

    const farmingCardInfo = async () => {
        const allPoolsInfo = []
        for (let i = 0; i < poolLength; i++) {
            const poolInfo = await getPoolInfo(walletAddress, i)
            const lpBalance = await getLpTokenBalance(
                walletAddress,
                poolInfo?.lpToken
            )
            const userInfo = await getUserInfo(walletAddress, i)
            const tokensPerBlock = await getTokensPerBlock(walletAddress)
            const allocPoints = await getTotalAllocPoint(walletAddress)
            const earnedTokens = await getEarnedTokens(walletAddress)
            const pendingTokens = await getPendingtokens(walletAddress, i)
            const lpName = await getLpTokenName(
                walletAddress,
                poolInfo?.lpToken
            )
            const lpTotalSupply = await getLpTotalSupply(
                walletAddress,
                poolInfo?.lpToken
            )
            const lp0 = await getLpToken0(walletAddress, poolInfo?.lpToken)
            const lp1 = await getLpToken1(walletAddress, poolInfo?.lpToken)
            const lpSymbol0 = await getLpTokenSymbol0(walletAddress, lp0)
            const lpSymbol1 = await getLpTokenSymbol1(walletAddress, lp1)
            const lpAllowance = await getLpTokenAllowance(
                walletAddress,
                poolInfo?.lpToken
            )
            const lp0Liquidity = await getLpToken0Liquidity(
                walletAddress,
                poolInfo?.lpToken,
                lp0
            )
            const lp1Liquidity = await getLpToken1Liquidity(
                walletAddress,
                poolInfo?.lpToken,
                lp1
            )
            const farmsInfo = {
                poolId: i,
                multipliers: +poolInfo.allocPoint / 100,
                poolDetails: poolInfo,
                lpTokenBalance: lpBalance,
                userDetails: userInfo,
                totalTokensPerBlock: tokensPerBlock,
                stakeFee: +poolInfo.depositFeeBP / 100,
                lpTokenAddress: poolInfo.lpToken,
                allocPoint: poolInfo.allocPoint,
                stakedValue: (+userInfo.amount / 10 ** 18)
                    .toFixed(3)
                    .toString(),
                rewardDebt: (+userInfo.rewardDebt / 10 ** 18)
                    .toFixed(3)
                    .toString(),
                totalAllocPoints: allocPoints,
                totalEarnedTokens: earnedTokens,
                totalPendingTokens: pendingTokens,
                lpTokenName: lpName,
                lpContract: getLpTokenContract(poolInfo?.lpToken),
                lpTokenTotalSupply: lpTotalSupply,
                lpToken0: lp0,
                lpToken1: lp1,
                lpTokenSymbol0: lpSymbol0,
                lpTokenSymbol1: lpSymbol1,
                lpTokenAllowance: lpAllowance,
                lpToken0Liquidity: lp0Liquidity,
                lpToken1Liquidity: lp1Liquidity,
            }
            allPoolsInfo.push(farmsInfo)
        }
        setAllPoolsInfo(allPoolsInfo)
    }

    useEffect(() => getTokenPrice(), [allPoolsInfo])

    const getTokenPrice = async () => {
        const {data: tokenPriceData} = await getUSDRate(
            'https://api.pancakeswap.info/api/v2/tokens/0x4aee9d30893c5c73e5a5b8637a10d9537497f1c8'
        )
        setTokenPrice(tokenPriceData?.price)
    }

    // const farmingCardInfo = async () => {
    //     const poolId = [],
    //         multipliers = [],
    //         poolDetails = [],
    //         lpTokenBalance = [],
    //         userDetails = [],
    //         stakedValue = [],
    //         rewardDebt = [],
    //         stakeFee = [],
    //         lpTokenAddress = [],
    //         allocPoint = [],
    //         lpContract = [],
    //         totalTokensPerBlock = [],
    //         totalEarnedTokens = [],
    //         totalPendingTokens = [],
    //         lpTokenName = [],
    //         lpTokenSymbol0 = [],
    //         lpTokenSymbol1 = [],
    //         lpTokenTotalSupply = [],
    //         lpToken0 = [],
    //         lpToken1 = [],
    //         lpTokenAllowance = [],
    //         lpToken0Liquidity = [],
    //         lpToken1Liquidity = [],
    //         totalAllocPoints = []
    //     for (let i = 0; i < poolLength; i++) {
    //         poolId.push(i)

    //         const poolInfo = await getPoolInfo(walletAddress, i)
    //         poolDetails.push(poolInfo)

    //         multipliers.push(+poolInfo.allocPoint / 100)
    //         stakeFee.push(+poolInfo.depositFeeBP / 100)
    //         lpTokenAddress.push(poolInfo.lpToken)
    //         allocPoint.push(poolInfo.allocPoint)

    //         const lpBalance = await getLpTokenBalance(
    //             walletAddress,
    //             poolInfo?.lpToken
    //         )
    //         lpTokenBalance.push(lpBalance)

    //         const userInfo = await getUserInfo(walletAddress, i)
    //         userDetails.push(userInfo)

    //         stakedValue.push(
    //             (+userInfo.amount / 10 ** 18).toFixed(3).toString()
    //         )

    //         rewardDebt.push(
    //             (+userInfo.rewardDebt / 10 ** 18).toFixed(3).toString()
    //         )

    //         const tokensPerBlock = await getTokensPerBlock(walletAddress)
    //         totalTokensPerBlock.push(tokensPerBlock)

    //         const allocPoints = await getTotalAllocPoint(walletAddress)
    //         totalAllocPoints.push(allocPoints)

    //         const earnedTokens = await getEarnedTokens(walletAddress)
    //         totalEarnedTokens.push(earnedTokens)

    //         const pendingTokens = await getPendingtokens(walletAddress, i)
    //         totalPendingTokens.push(pendingTokens)

    //         const lpName = await getLpTokenName(
    //             walletAddress,
    //             poolInfo?.lpToken
    //         )
    //         lpTokenName.push(lpName)

    //         lpContract.push(getLpTokenContract(poolInfo?.lpToken))

    //         const lpTotalSupply = await getLpTotalSupply(
    //             walletAddress,
    //             poolInfo?.lpToken
    //         )
    //         lpTokenTotalSupply.push(lpTotalSupply)

    //         const lp0 = await getLpToken0(walletAddress, poolInfo?.lpToken)
    //         lpToken0.push(lp0)

    //         const lp1 = await getLpToken1(walletAddress, poolInfo?.lpToken)
    //         lpToken1.push(lp1)

    //         const lpSymbol0 = await getLpTokenSymbol0(walletAddress, lp0)
    //         lpTokenSymbol0.push(lpSymbol0)

    //         const lpSymbol1 = await getLpTokenSymbol1(walletAddress, lp1)
    //         lpTokenSymbol1.push(lpSymbol1)

    //         const lpAllowance = await getLpTokenAllowance(
    //             walletAddress,
    //             poolInfo?.lpToken
    //         )
    //         lpTokenAllowance.push(lpAllowance)

    //         const lp0Liquidity = await getLpToken0Liquidity(
    //             walletAddress,
    //             poolInfo?.lpToken,
    //             lp0
    //         )
    //         lpToken0Liquidity.push(lp0Liquidity)

    //         const lp1Liquidity = await getLpToken1Liquidity(
    //             walletAddress,
    //             poolInfo?.lpToken,
    //             lp1
    //         )
    //         lpToken1Liquidity.push(lp1Liquidity)
    //     }
    //     setAllPoolsInfo({
    //         poolId,
    //         multipliers,
    //         poolDetails,
    //         lpTokenBalance,
    //         userDetails,
    //         stakedValue,
    //         stakedValue,
    //         rewardDebt,
    //         stakeFee,
    //         lpTokenAddress,
    //         allocPoint,
    //         lpContract,
    //         totalTokensPerBlock,
    //         totalEarnedTokens,
    //         totalPendingTokens,
    //         lpTokenName,
    //         lpTokenSymbol0,
    //         lpTokenSymbol1,
    //         lpTokenTotalSupply,
    //         lpToken0,
    //         lpToken1,
    //         lpTokenAllowance,
    //         lpToken0Liquidity,
    //         lpToken1Liquidity,
    //         totalAllocPoints,
    //     })
    // }

    return (
        <div className="stacking-connected">
            <div className="main">
                <Box sx={{m: 4}}>
                    <Grid container columns={{xs: 12, sm: 12, md: 6}}>
                        {allPoolsInfo.length > 0 &&
                            allPoolsInfo.map((pool) => {
                                return (
                                    <Grid key={pool.poolId} item>
                                        <FarmingCard
                                            pool={pool}
                                            rewardTokenSymbol="ASC"
                                            tokenPrice={tokenPrice}
                                            currentBlockTime={3}
                                        />
                                    </Grid>
                                )
                            })}
                    </Grid>
                </Box>
                {/* <ScrollBottom /> */}
            </div>
        </div>
    )
}
