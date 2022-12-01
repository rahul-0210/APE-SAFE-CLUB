import React, {useEffect, useState} from 'react'
import {Box, Grid} from '@material-ui/core'
import {useDispatch, useSelector} from 'react-redux'
import FarmingCard from '../components/FarmingCard'
import {setLoaderDisplay} from '../redux/actions/master-actions'
import {
    getPoolLength,
    getPoolInfo,
    getLpTokenBalance,
    getUserInfo,
    getEarnedTokens,
    getPendingtokens,
    getLpTokenName,
    getLpTokenSymbol,
    // getLpTokenSymbol0,
    // getLpTokenSymbol1,
    getLpToken0,
    getLpToken1,
    getLpTokenAllowance,
    getLpTokenLiquidity,
    // getLpToken0Liquidity,
    // getLpToken1Liquidity,
    getLpTotalSupply,
    getTokensPerBlock,
    getTotalAllocPoint,
    getLpTokenContract,
} from '../utils/contractMethods/farm.service'
import {getUSDRate} from '../api/request'
import BusdAscIconStakeLogo from '../assets/BusdAscIconStakeLogo.png'
import BnbAscIconStakeLogo from '../assets/BnbAscIconStakeLogo.png'

export default function Farm() {
    const [poolLength, setPoolLength] = useState(null)
    const [tokenPrice, setTokenPrice] = useState('')

    const [allPoolsInfo, setAllPoolsInfo] = useState([])
    const dispatch = useDispatch()
    const {walletAddress} = useSelector((state) => state.wallet)

    const logo = [BusdAscIconStakeLogo, BnbAscIconStakeLogo]
    useEffect(() => getFarmPoolLength(), [])

    const getFarmPoolLength = async () => {
        const length = await getPoolLength(walletAddress)
        setPoolLength(length)
    }

    useEffect(() => {
        poolLength > 0 && farmingCardInfo()
    }, [poolLength])

    const farmingCardInfo = async () => {
        try {
            dispatch(setLoaderDisplay(true, true))
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
                const lpSymbol0 = await getLpTokenSymbol(walletAddress, lp0)
                const lpSymbol1 = await getLpTokenSymbol(walletAddress, lp1)
                const lpAllowance = await getLpTokenAllowance(
                    walletAddress,
                    poolInfo?.lpToken
                )
                const lp0Liquidity = await getLpTokenLiquidity(
                    walletAddress,
                    poolInfo?.lpToken,
                    lp0
                )
                const lp1Liquidity = await getLpTokenLiquidity(
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
                        .toFixed(5)
                        .toString(),
                    rewardDebt: (+userInfo.rewardDebt / 10 ** 18)
                        .toFixed(5)
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
            dispatch(setLoaderDisplay(false, false))
        } catch (err) {
            dispatch(setLoaderDisplay(false, false))
        }
    }

    useEffect(() => getTokenPrice(), [allPoolsInfo])

    const getTokenPrice = async () => {
        const {data: tokenPriceData} = await getUSDRate(
            'https://api.pancakeswap.info/api/v2/tokens/0x9c1B2D6F5153586C1B07Ad73bf35c47FbE57BFfA'
        )
        setTokenPrice(tokenPriceData?.price)
    }

    return (
        <div className="stacking-connected">
            <div className="main">
                <Box sx={{m: 4}}>
                    <Grid container columns={{xs: 12, sm: 12, md: 6}}>
                        {allPoolsInfo.length > 0 &&
                            allPoolsInfo.map((pool, i) => {
                                return (
                                    <Grid key={pool.poolId} item>
                                        <FarmingCard
                                            pool={pool}
                                            logo={logo[i]}
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
