import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useSnackbar} from 'notistack'
import tokenPriceData from '../../utils/tokenPrices.json'
import {calculateApr, calculateLiquidity} from '../../utils/farmUtils'
import {
    ethToWei,
    approve,
    deposit,
    withdraw,
} from '../../utils/contractMethods/farm.service'
import StakeDeposit from '../FarmingModals/stakeDeposit'
import StakeWithdraw from '../FarmingModals/stakeWithdraw'
import {setLoaderDisplay} from '../../redux/actions/master-actions'

const FarmingCard = ({
    pool,
    logo,
    rewardTokenSymbol,
    tokenPrice,
    currentBlockTime,
}) => {
    const {
        poolId,
        multipliers,
        poolDetails,
        lpTokenBalance,
        userDetails,
        totalTokensPerBlock,
        stakeFee,
        lpTokenAddress,
        allocPoint,
        stakedValue,
        rewardDebt,
        totalAllocPoints,
        totalEarnedTokens,
        totalPendingTokens,
        lpTokenName,
        lpContract,
        lpTokenTotalSupply,
        lpToken0,
        lpToken1,
        lpTokenSymbol0,
        lpTokenSymbol1,
        lpTokenAllowance,
        lpToken0Liquidity,
        lpToken1Liquidity,
    } = pool

    const [liquidityValue, setLiquidityValue] = useState(0)
    const [farmApr, setFarmApr] = useState(0)
    const [lpTokensPriceUsd, setLpTokensPriceUsd] = useState()
    const [stakedLpTokensPriceUsd, setStakedLpTokensPriceUsd] = useState()
    const [stakeModalStatus, setStakeModalStatus] = useState(false)
    const [unStakeModalStatus, setUnStakeModalStatus] = useState(false)
    const [inputAmount, setInputAmount] = useState('')
    const dispatch = useDispatch()
    const {walletAddress} = useSelector((state) => state.wallet)

    const {enqueueSnackbar} = useSnackbar()

    const title =
        lpTokenSymbol0 && lpTokenSymbol1
            ? `${lpTokenSymbol0}-${
                  lpTokenSymbol1 === 'WBNB' ? 'BNB' : lpTokenSymbol1
              }`
            : `${'-'}`

    const handleChange = (inputAmount) => {
        if (isNaN(inputAmount)) {
            return
        }
        if (+inputAmount < 0) {
            return
        }
        setInputAmount(inputAmount)
    }

    useEffect(() => {
        async function execute() {
            const {token0, token1} = await calculateLiquidity(
                lpToken0,
                lpToken1,
                tokenPriceData,
                lpToken0Liquidity,
                lpToken1Liquidity
            )
            setLiquidityValue(token0 + token1)
        }
        execute()
    }, [lpToken0Liquidity, lpToken1Liquidity])

    useEffect(() => {
        async function execute() {
            const apr = await calculateApr(
                tokenPrice && tokenPrice,
                currentBlockTime,
                liquidityValue,
                allocPoint,
                totalAllocPoints,
                totalTokensPerBlock
            )
            apr && setFarmApr(Number(apr.rewardsApr).toFixed(3))
        }
        execute()
    }, [liquidityValue])

    useEffect(() => {
        const lpTokensPriceUsd =
            lpTokenBalance &&
            liquidityValue &&
            lpTokenTotalSupply &&
            (+lpTokenBalance * +liquidityValue) / +lpTokenTotalSupply
        setLpTokensPriceUsd(lpTokensPriceUsd)

        const stakedLpTokensPriceUsd =
            stakedValue &&
            liquidityValue &&
            lpTokenTotalSupply &&
            (+stakedValue * +liquidityValue) / +lpTokenTotalSupply
        setStakedLpTokensPriceUsd(stakedLpTokensPriceUsd)
    }, [lpTokenBalance, stakedValue, liquidityValue, lpTokenTotalSupply])

    const getEquivalentRewardUSDRate = (value) => {
        return tokenPrice && +(tokenPrice * value).toFixed(2)
    }

    const checkAndStake = async () => {
        try {
            dispatch(setLoaderDisplay(true, ''))
            if (+inputAmount > 0 && +inputAmount <= +lpTokenBalance) {
                if (
                    !(+lpTokenAllowance > 0) ||
                    +lpTokenAllowance < +inputAmount
                ) {
                    await approve(lpContract, walletAddress)
                }
                const amount = ethToWei(inputAmount)
                await deposit(poolId, amount, walletAddress)
                setInputAmount('')
                setStakeModalStatus(false)
                enqueueSnackbar('Token deposited successfully', {
                    variant: 'success',
                })

                // if (+lpTokenAllowance > 0 && +lpTokenAllowance >= +inputAmount) {
                //     depositFunction
                //         .send(id, utils.parseUnits(inputAmount, 18))
                //         .then((d) => {
                //             if (depositFunction.state.status === 'None') {
                //                 setStakeModalStatus(false)
                //                 setInputAmount('')
                //             }
                //         })
                // } else {
                //     approveFunction.send(
                //         farmingAddress,
                //         BigNumber.from(2).pow(256).sub(1)
                //     )
                // }
                dispatch(setLoaderDisplay(false, ''))
            } else {
                dispatch(setLoaderDisplay(false, ''))
                enqueueSnackbar('Insufficient balance', {
                    variant: 'error',
                })
                // dispatch(setLoaderDisplay(false, ''))
            }
        } catch (err) {
            dispatch(setLoaderDisplay(false, ''))
            enqueueSnackbar('Something went wrong', {
                variant: 'error',
            })
        }
    }

    const checkAndUnstake = async () => {
        try {
            dispatch(setLoaderDisplay(true, ''))
            if (+inputAmount > 0 && +inputAmount <= stakedValue) {
                const amount = ethToWei(inputAmount)
                await withdraw(poolId, amount, walletAddress)
                setInputAmount('')
                setUnStakeModalStatus(false)
                enqueueSnackbar('Token withdrawn successfully', {
                    variant: 'success',
                })
                // withdrawFunction.send(id, utils.parseUnits(inputAmount, 18))
                // .then((d) => {
                //   if(withdrawFunction.state.status === "None"){
                //     setUnStakeModalStatus(false)
                //     setInputAmount("")
                //   }
                // })
                dispatch(setLoaderDisplay(false, ''))
            } else {
                dispatch(setLoaderDisplay(false, ''))
                enqueueSnackbar('Insufficient balance', {
                    variant: 'error',
                })
            }
        } catch (err) {
            dispatch(setLoaderDisplay(false, ''))
            enqueueSnackbar('Something went wrong', {
                variant: 'error',
            })
        }
    }

    const handleHarvest = async () => {
        try {
            dispatch(setLoaderDisplay(true, ''))
            const amount = ethToWei('0')
            await deposit(poolId, amount, walletAddress)
            enqueueSnackbar('Reward withdrawn successfully', {
                variant: 'success',
            })
            dispatch(setLoaderDisplay(false, ''))
        } catch (err) {
            enqueueSnackbar('Something went wrong', {
                variant: 'error',
            })
            dispatch(setLoaderDisplay(false, ''))
        }
    }

    const closeModal = () => {
        setStakeModalStatus(false)
        setUnStakeModalStatus(false)
    }

    return (
        <>
            <div className="stake-cards">
                <div className="stack-cards-child">
                    <div className="stake-title">
                        <img
                            src={logo}
                            alt="farm-logo"
                            width={103}
                            height={96}
                        />
                        <p className="stake-name">Farm {title}</p>
                    </div>
                    <div className="stake-details">
                        <div className="apy value">
                            <p>APR</p>
                            <p className="percent">
                                {farmApr ? farmApr : '0.000'}%
                            </p>
                        </div>
                    </div>
                    <div className="stake-buttons">
                        <div className="stake-button">
                            <div className="btn">
                                <button
                                    onClick={() => setUnStakeModalStatus(true)}
                                >
                                    Unstake&nbsp;&nbsp;&nbsp;-
                                </button>
                            </div>
                            <div className="btn">
                                <button
                                    onClick={() => setStakeModalStatus(true)}
                                >
                                    Stake&nbsp;&nbsp;&nbsp;+
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="stake-earned">
                        <div className="stake-values">
                            <p>STAKED LP BALANCE</p>
                            <p>{stakedValue}</p>
                            <span className="usd-eq">
                                <p>~{stakedLpTokensPriceUsd || 0} USD</p>
                            </span>
                        </div>
                    </div>
                    <div className="stake-earned">
                        <div className="stake-values">
                            <p>{rewardTokenSymbol} EARNED</p>
                            <p>{totalEarnedTokens}</p>
                            <span className="usd-eq">
                                <p>
                                    ~
                                    {getEquivalentRewardUSDRate(
                                        totalEarnedTokens
                                    )}{' '}
                                    USD
                                </p>
                            </span>
                        </div>
                        <div className="stake-button">
                            <button
                                disabled={!(+stakedValue > 0)}
                                onClick={handleHarvest}
                            >
                                Harvest
                            </button>
                        </div>
                    </div>
                    <div className="stake-earned">
                        <div className="stake-values">
                            <p>{rewardTokenSymbol} PENDING</p>
                            <p>{totalPendingTokens}</p>
                            <span className="usd-eq">
                                <p>
                                    ~
                                    {getEquivalentRewardUSDRate(
                                        totalPendingTokens
                                    )}{' '}
                                    USD
                                </p>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            {stakeModalStatus === true ? (
                <StakeDeposit
                    title={title}
                    logo={logo}
                    allowance={lpTokenAllowance}
                    walletBalance={lpTokenBalance}
                    walletAmount={inputAmount}
                    updateWalletAmount={handleChange}
                    checkAndStake={checkAndStake}
                    stakingFee={stakeFee}
                    lpTokensPriceUsd={lpTokensPriceUsd}
                    close={closeModal}
                    buyUrl="https://pancakeswap.finance/swap?outputCurrency=0x4aee9d30893c5c73e5a5b8637a10d9537497f1c8"
                />
            ) : (
                ''
            )}
            {unStakeModalStatus === true ? (
                <StakeWithdraw
                    title={title}
                    logo={logo}
                    ssgtStaked={stakedValue}
                    lpTokensPriceUsd={stakedLpTokensPriceUsd}
                    walletAmount={inputAmount}
                    updateWalletAmount={handleChange}
                    checkAndUnStake={checkAndUnstake}
                    // selectedTokenList={props.selectedTokenList}
                    // updateTokenIdList={props.updateTokenIdList}
                    // tokenList={props.tokenList}
                    isNFTEnabled={false}
                    // selectedNftCount={props.selectedNftCount}
                    // isFeeDisabled={!props.isFeeEnabled}
                    close={closeModal}
                />
            ) : (
                ''
            )}
        </>
    )
}

export default FarmingCard
