import React, {useState, useEffect} from 'react'
import LoaderComponent from '../loaderComponent'
import closeIcon from '../../assets/CloseIcon.svg'

const StakeWithdraw = (props) => {
    const MAX_BALANCE = '500000'
    const close = () => {
        props.updateWalletAmount('')
        props.close()
    }

    const [currentlyUnstaking, setCurrentlyUnstaking] = useState('')

    const setMaxAmount = () => {
        if (props.isNFTEnabled) {
            parseFloat(props.ssgtStaked) < parseFloat(MAX_BALANCE)
                ? props.updateWalletAmount(props.ssgtStaked)
                : props.updateWalletAmount(MAX_BALANCE)
            props.updateTokenIdList('Update', parseInt(props.tokenList.length))
        } else {
            parseFloat(props.ssgtStaked) < parseFloat(MAX_BALANCE)
                ? props.updateWalletAmount(props.ssgtStaked)
                : props.updateWalletAmount(MAX_BALANCE)
        }
    }

    const checkAndDisableButton = () => {
        if (parseFloat(props.walletAmount) > parseFloat(props.ssgtStaked)) {
            return true
        }

        if (props.isNFTEnabled && props.selectedTokenList.length === 0) {
            if (
                props.walletAmount.length === 0 ||
                props.walletAmount === '' ||
                props.walletAmount === '0'
            ) {
                return true
            }
            return false
        } else if (props.isNFTEnabled && props.selectedTokenList.length > 0) {
            return false
        } else {
            if (
                props.walletAmount.length === 0 ||
                props.walletAmount === '' ||
                props.walletAmount === '0'
            ) {
                return true
            }
            return false
        }
    }

    const toMax3Decimals = (x) => {
        return x.toFixed(20)
    }

    const calculateCurrentlyUnstaking = () => {
        if (props.title === 'SSGT' || props.title === 'SSGTx') {
            if (props.isNFTEnabled) {
                setCurrentlyUnstaking(
                    parseFloat(props.walletAmount) +
                        parseFloat(props.selectedNftCount) *
                            (props.title === 'SSGT' ? 2500 : 5000)
                )
            } else {
                setCurrentlyUnstaking(parseFloat(props.walletAmount))
            }
        } else {
            setCurrentlyUnstaking(
                props.walletAmount.length !== 0 ? props.walletAmount : '0'
            )
        }
    }

    useEffect(() => {
        calculateCurrentlyUnstaking()
    }, [
        props.walletAmount,
        props.selectedNftCount,
        props.isNFTEnabled,
        props?.lpTokensPriceUsd,
    ])

    return (
        <>
            <div className="card-shadow">
                <LoaderComponent />
                <div
                    className={
                        props.isNFTEnabled
                            ? 'stake-adder-card scroll'
                            : 'stake-adder-card'
                    }
                >
                    <div className="stake-header">
                        <p>Unstake {props.title}</p>
                        <p onClick={close}>
                            <img src={closeIcon} alt="closeIcon" />
                        </p>
                    </div>
                    <div className="balance">
                        {props.isNFTEnabled && (
                            <p>
                                {props.title} Staked:{' '}
                                {props.isNFTEnabled ? (
                                    <span>
                                        {toMax3Decimals(
                                            parseFloat(props.ssgtStaked) +
                                                props.totalNftTokens
                                        )}
                                    </span>
                                ) : (
                                    <span>
                                        {/* {props.ssgtStaked > 0
                                            ? utils.commify(
                                                  toMax3Decimals(
                                                      parseFloat(
                                                          props.ssgtStaked
                                                      )
                                                  )
                                              )
                                            : 0} */}
                                    </span>
                                )}{' '}
                                {/* <Tooltip
                title={
                  <div>
                    <div>
                      Your total balance includes your NFT total plus remaining overhead. For ex. If you stake{" "}
                      {props.title === "SSGT" ? `3000 SSGT` : `5500 SSGTx`} then your overhead will be 500 (excl. fees) tokens which can be entered in
                      the field below and the rest will be needed to be selected from below given field for selecting NFTs.
                    </div>
                    <br />
                    <div>To unstake your whole balance click on MAX. MAX button will select all NFTs and your remaining overhead.</div>
                  </div>
                }
              >
                <img style={{ width: 12 }} src={InfoIcon} />
              </Tooltip> */}
                            </p>
                        )}
                        {!props.isNFTEnabled && (
                            <div>
                                {props.title} Staked:{' '}
                                {props.isNFTEnabled ? (
                                    <span>
                                        {toMax3Decimals(
                                            parseFloat(props.ssgtStaked) +
                                                props.totalNftTokens
                                        )}
                                    </span>
                                ) : (
                                    <span>
                                        {' '}
                                        {props.ssgtStaked > 0
                                            ? toMax3Decimals(
                                                  parseFloat(props.ssgtStaked)
                                              )
                                            : 0}
                                    </span>
                                )}{' '}
                                {/* <Tooltip
                title={
                  <div>
                    <div>
                      Your total balance includes your NFT total plus remaining overhead. For ex. If you stake{" "}
                      {props.title === "SSGT" ? `3000 SSGT` : `5500 SSGTx`} then your overhead will be 500 (excl. fees) tokens which can be entered in
                      the field below and the rest will be needed to be selected from below given field for selecting NFTs.
                    </div>
                    <br />
                    <div>To unstake your whole balance click on MAX. MAX button will select all NFTs and your remaining overhead.</div>
                  </div>
                }
              >
                <img style={{ width: 12 }} src={InfoIcon} />
              </Tooltip> */}
                            </div>
                        )}
                        {props.lpTokensPriceUsd ? (
                            <div>
                                LP Token Price: $
                                {/* {utils.commify(
                                    parseFloat(
                                        props?.lpTokensPriceUsd.toFixed(5)
                                    )
                                )} */}
                            </div>
                        ) : (
                            <div>LP Token Price: $0.00</div>
                        )}
                        {props.isNFTEnabled && <p>Max per Tx: 500000</p>}
                    </div>
                    <div className="add-on">
                        <div className="input-value">
                            <input
                                type="text"
                                placeholder={'Enter ' + props.title + ' amount'}
                                value={props.walletAmount}
                                onChange={(e) =>
                                    props.updateWalletAmount(e.target.value)
                                }
                            />
                        </div>
                        <input
                            type="submit"
                            value="MAX"
                            onClick={setMaxAmount}
                        />
                        <div className="stake-type">
                            <img src={props.logo} alt="" />
                            <p>{props.title}</p>
                        </div>
                    </div>
                    {parseFloat(props.walletAmount) > MAX_BALANCE ? (
                        parseFloat(props.walletAmount) >
                        parseFloat(props.ssgtStaked) ? (
                            <div className="error-text">
                                Insufficient {props.title} in Wallet
                            </div>
                        ) : (
                            <div className="error-text">
                                Max. allowed stake per transaction is 500000{' '}
                                {props.title}
                            </div>
                        )
                    ) : (
                        <div style={{height: 14 /* , marginBottom: 5 */}}></div>
                    )}
                    <div className="currentUnstake-info-div">
                        <div className="currentUnstake-info">
                            Currently Unstaking:{' '}
                            <span style={{fontWeight: 'bold'}}>
                                {currentlyUnstaking} {props.title}
                            </span>
                        </div>
                        {props.isNFTEnabled && (
                            <div className="currentUnstake-info">
                                <div>Amount (excl. NFTs) + NFTs selected:</div>
                                <div style={{fontWeight: 'bold'}}>
                                    {props.walletAmount ? (
                                        <span>
                                            {props.walletAmount} {props.title}
                                        </span>
                                    ) : (
                                        <span>0 {props.title}</span>
                                    )}{' '}
                                    {props.isNFTEnabled && (
                                        <span>
                                            + {props.selectedNftCount} x{' '}
                                            {props.title === 'SSGT' ? (
                                                <span>2500 {props.title}</span>
                                            ) : (
                                                <span>5000 {props.title}</span>
                                            )}
                                        </span>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="unstakeInfoTextDiv">
                        <span className="unstakeInfoText">
                            Unstake will <b>automatically</b> result in{' '}
                            <b>harvesting</b> your earned tokens
                        </span>
                    </div>
                    <div className="button-stake">
                        {checkAndDisableButton() ? (
                            <button disabled>Unstake</button>
                        ) : (
                            <button onClick={props.checkAndUnStake}>
                                Unstake
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
export default StakeWithdraw
