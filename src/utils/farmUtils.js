import {getTokenUSDPrice} from '../api/request'

export const calculateApr = async (
    priceUsd,
    blockTime,
    liquidityValue,
    allocPoint,
    totalAllocation,
    rewardPerBlock
) => {
    const blocksPerYear = (60 / blockTime) * 60 * 24 * 365
    const tokenPerYear = rewardPerBlock * blocksPerYear
    if (liquidityValue !== 0 && allocPoint && totalAllocation && priceUsd) {
        const poolWeight = Number(allocPoint) / Number(totalAllocation)
        const yearlyRewardAllocation = +tokenPerYear * poolWeight
        const rewardsApr =
            ((Number(yearlyRewardAllocation) * Number(priceUsd)) /
                Number(liquidityValue)) *
            100
        if (rewardsApr !== Infinity) {
            return {rewardsApr}
        }
    }
}

export const calculateLiquidity = async (
    token0,
    token1,
    coingeckoData,
    liquidityToken0,
    liquidityToken1
) => {
    let usdRateForToken0, usdRateForToken1
    const urlForToken0 = coingeckoData.find(
        (item) =>
            token0?.toLowerCase() === item.tokenProd.toLowerCase() &&
            item.tokenUrl
    )

    const urlForToken1 = coingeckoData.find(
        (item) =>
            token1?.toLowerCase() === item.tokenProd.toLowerCase() &&
            item.tokenUrl
    )

    try {
        if (urlForToken0 && liquidityToken0) {
            let usdValueToken0 = await getTokenUSDPrice(urlForToken0.tokenUrl)
            if (urlForToken0.name === 'ASC') {
                usdValueToken0 = usdValueToken0.data
            }
            if (
                urlForToken0.name.toString().toLowerCase() === 'tether' ||
                urlForToken0.name.toString().toLowerCase() === 'usd-coin'
            ) {
                usdRateForToken0 =
                    usdValueToken0[urlForToken0.name]?.usd * +liquidityToken0
            } else {
                if (usdValueToken0[urlForToken0.name]?.usd) {
                    usdRateForToken0 =
                        usdValueToken0[urlForToken0.name]?.usd *
                        +liquidityToken0
                } else {
                    usdRateForToken0 = usdValueToken0?.price * +liquidityToken0
                }
            }
        }
        //USE BELOW CODE FOR DEVELOPMENT TESTING
        else if (
            coingeckoData.filter((item) => {
                return item.tokenDev === token0[0]
            }) &&
            liquidityToken0
        ) {
            let defaultValue = coingeckoData.filter((item) => {
                return item.tokenDev === token0[0]
            })
            usdRateForToken0 = defaultValue?.[0]?.value * +liquidityToken0
        } else {
            usdRateForToken0 = 0
        }

        if (urlForToken1 && liquidityToken1) {
            const usdValueToken1 = await getTokenUSDPrice(urlForToken1.tokenUrl)
            if (
                urlForToken1.name.toString().toLowerCase() === 'tether' ||
                urlForToken1.name.toString().toLowerCase() === 'usd-coin'
            ) {
                usdRateForToken1 =
                    usdValueToken1[urlForToken1.name].usd * +liquidityToken1
            } else {
                usdRateForToken1 =
                    usdValueToken1[urlForToken1.name].usd * +liquidityToken1
            }
        }
        //BELOW CODE FOR DEVELOPMENT TESTING
        else if (
            coingeckoData.filter((item) => {
                return item.tokenDev === token1[0]
            }) &&
            liquidityToken1
        ) {
            let defaultValue = coingeckoData.filter((item) => {
                return item.tokenDev === token1[0]
            })
            usdRateForToken1 = defaultValue?.[0]?.value * +liquidityToken1
        } else {
            usdRateForToken1 = 0
        }
        return {token0: +usdRateForToken0, token1: +usdRateForToken1}
    } catch (err) {
        return {token0: 0, token1: 0}
    }
}
