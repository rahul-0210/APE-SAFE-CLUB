import React, {useState, useEffect} from 'react'

const FarmingCard = () => {
    return (
        <>
            <div className="stake-cards">
                <div className="stack-cards-child">
                    <div className="stake-title">
                        {/* <img src={logo} alt='' /> */}
                        <p className="stake-name">Farm Card</p>
                    </div>
                    <div className="stake-details">
                        <div className="apy value">
                            <p>APR</p>
                            <p className="percent">0.00%</p>
                        </div>
                    </div>
                    <div className="stake-buttons">
                        <div className="stake-button">
                            <div className="btn">
                                <button>Unstake&nbsp;&nbsp;&nbsp;-</button>
                            </div>
                            <div className="btn">
                                <button>Stake&nbsp;&nbsp;&nbsp;+</button>
                            </div>
                        </div>
                    </div>
                    <div className="stake-earned">
                        <div className="stake-values">
                            <p>STAKED LP BALANCE</p>
                            <p>100.0</p>
                            <span className="usd-eq">
                                <p>~0 USD</p>
                            </span>
                        </div>
                    </div>
                    <div className="stake-earned">
                        <div className="stake-values">
                            <p>ASC EARNED</p>
                            <p>0.0</p>
                            <span className="usd-eq">
                                <p>~0 USD</p>
                            </span>
                        </div>
                        <div className="stake-button">
                            <button disabled>Harvest</button>
                        </div>
                    </div>
                    <div className="stake-earned">
                        <div className="stake-values">
                            <p>ASC PENDING</p>
                            <p>0.000</p>
                            <span className="usd-eq">
                                <p>~0 USD</p>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            {/* {stakeModalStatus === true ? (
                <StakeAdder
                    title={title}
                    logo={logo}
                    allowance={allowedAllowance}
                    walletBalance={walletBalance}
                    walletAmount={inputAmount}
                    updateWalletAmount={handleChange}
                    checkAndStakeSSGT={checkAndStake}
                    stakingFee={stakeFee}
                    lpTokensPriceUsd={lpTokensPriceUsd}
                    // isFeeDisabled={!props.isFeeEnabled}
                    // isNFTEnabled={props.isNFTEnabled}
                    close={closeModal}
                    buyUrl="https://pancakeswap.finance/swap?outputCurrency=0x4aee9d30893c5c73e5a5b8637a10d9537497f1c8"
                ></StakeAdder>
            ) : (
                ''
            )}
            {unStakeModalStatus === true ? (
                <StakeWithdraw
                    title={title}
                    logo={logo}
                    ssgtStaked={stakedValue}
                    lpTokensPriceUsd={stakedLpTokensPriceUsd}
                    // totalNftTokens={props.totalNftTokens}
                    walletAmount={inputAmount}
                    updateWalletAmount={handleChange}
                    checkAndUnStakeSSGT={checkAndUnstake}
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
            )} */}
        </>
    )
}

export default FarmingCard
