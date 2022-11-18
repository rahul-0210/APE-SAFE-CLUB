import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import LoaderComponent from '../loaderComponent'

// import {modalAction, ssgtxModalAction} from '../redux/actions/modalAction'

import closeIcon from '../../assets/CloseIcon.svg'

const StakeDeposit = (props) => {
    const MAX_BALANCE = '100000000000000000000000000000000'
    const dispatch = useDispatch()
    // const selector = useSelector((state) => state.modalReducer.title)
    const close = () => {
        props?.updateWalletAmount('')
        // dispatch(modalAction(false, selector))
        // dispatch(ssgtxModalAction(false, selector))
        props?.close()
    }

    const toMax4Decimals = (x) => {
        return x.toFixed(20)
    }

    const openInNewWindow = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }

    const setMaxAmount = () => {
        parseFloat(props?.walletBalance) < parseFloat(MAX_BALANCE)
            ? props?.updateWalletAmount(props?.walletBalance)
            : props.updateWalletAmount(MAX_BALANCE)
    }

    return (
        <>
            <div className="card-shadow">
                <LoaderComponent />
                <div className="stake-adder-card">
                    <div className="stake-header">
                        <p>Stake {props?.title}</p>
                        <p onClick={close}>
                            <img src={closeIcon} alt="closeIcon" />
                        </p>
                    </div>
                    <div className="balance">
                        <div>Balance in wallet: {props?.walletBalance}</div>
                        {props.lpTokensPriceUsd ? (
                            <div>
                                LP Token Price: ${props?.lpTokensPriceUsd}
                            </div>
                        ) : (
                            <div>LP Token Price: $0.00</div>
                        )}
                        {/* <p>Max per Tx: 500000</p> */}
                        <div></div>
                    </div>
                    <div className="add-on">
                        <div
                            className={
                                parseFloat(props?.walletAmount) >
                                parseFloat(props?.walletBalance)
                                    ? 'input-value-error'
                                    : 'input-value'
                            }
                        >
                            <input
                                type="text"
                                placeholder={
                                    'Enter ' + props?.title + ' amount'
                                }
                                value={props?.walletAmount}
                                onChange={(e) =>
                                    props?.updateWalletAmount(e.target.value)
                                }
                            />
                        </div>
                        <input
                            type="submit"
                            value="MAX"
                            onClick={setMaxAmount}
                        />
                        <div className="stake-type">
                            <img src={props?.logo} alt="" />
                            <p>{props?.title}</p>
                        </div>
                    </div>
                    {parseFloat(props?.walletAmount) > MAX_BALANCE ? (
                        parseFloat(props?.walletAmount) >
                        parseFloat(props?.walletBalance) ? (
                            <div className="error-text">
                                Insufficient Balance in Wallet, buy{' '}
                                {props?.title} or select a different wallet
                            </div>
                        ) : (
                            <div className="error-text">
                                Max. allowed stake per transaction is 500000{' '}
                                {props?.title}
                            </div>
                        )
                    ) : (
                        <div style={{height: 14, marginBottom: 20}}></div>
                    )}
                    <div className="button-stake">
                        {
                            <button
                                disabled={
                                    props?.walletAmount === 0 ||
                                    props?.walletAmount === '' ||
                                    props?.walletAmount === '0' ||
                                    isNaN(props?.walletAmount)
                                }
                                onClick={props?.checkAndStake}
                            >
                                Stake
                            </button>
                        }
                        {/* {!props.isFeeDisabled && <div className='stakeFeeTextStyleDiv'>
            <p className='stakeFeeTextStyle'>Stake Fee: {props.stakingFee}%</p>
          </div>} */}
                        <button onClick={() => openInNewWindow(props?.buyUrl)}>
                            Buy {props?.title}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default StakeDeposit
