import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'

import {
    setWalletAddress,
    setWalletConnectionStatus,
    setDisplayWalletAdress,
} from '../redux/actions/wallet'
import WalletDropdownIcon from '../assets/nav-icons/wallet-icon.png'
import WalletDropdownActiveIcon from '../assets/nav-icons/wallet-active-icon.png'

import {ClickAwayListener} from '@material-ui/core'
import {useWeb3React} from '@web3-react/core'
import {useSnackbar} from 'notistack'
import {injected} from '../utils/connectors'

export function WalletDropdown() {
    const [isWalletDropdownOpen, setIsWalletDropdownOpen] = useState(false)
    const {enqueueSnackbar} = useSnackbar()

    const dispatch = useDispatch()
    const {walletConnectionStatus, displayWalletAddress} = useSelector(
        (state) => state.wallet
    )

    const {active, account, activate, deactivate, chainId} = useWeb3React()

    const toggleDropDown = (type) => {
        switch (type) {
            case 'wallet':
                if (!isWalletDropdownOpen) {
                    setIsWalletDropdownOpen(!isWalletDropdownOpen)
                } else {
                    setIsWalletDropdownOpen(!isWalletDropdownOpen)
                }
                break
            default:
                break
        }
    }

    useEffect(() => {
        if (process.env.REACT_APP_enviorment === 'dev') {
            dispatch(setWalletConnectionStatus(active))
            if (active && account) {
                dispatch(setWalletAddress(account))
                dispatch(
                    setDisplayWalletAdress(
                        `${account.slice(0, 8)}...${account.slice(-4)}`
                    )
                )
            } else {
                dispatch(setWalletAddress(''))
            }
        } else {
            dispatch(setWalletConnectionStatus(active))
            if (chainId && chainId !== 56) {
                deactivate()
                enqueueSnackbar('Please connect to smart chain.', {
                    variant: 'error',
                })
            } else {
                if (active && account) {
                    dispatch(setWalletAddress(account))
                    dispatch(
                        setDisplayWalletAdress(
                            `${account.slice(0, 8)}...${account.slice(-4)}`
                        )
                    )
                } else {
                    dispatch(setWalletAddress(''))
                }
            }
        }
    }, [active, account, chainId])

    const activateWallet = async () => {
        try {
            await activate(injected)
        } catch (error) {
            console.log('%c Line:81 🍏 error', 'color:#e41a6a', error)
        }
    }

    const deactivateWallet = () => {
        deactivate()
    }

    return (
        <div className="header-dropdown-container">
            <div
                className="wallet-dropdown"
                onClick={() => {
                    toggleDropDown('wallet')
                }}
                style={{borderRight: !walletConnectionStatus && 'none'}}
            >
                <div>
                    <img
                        alt="logo"
                        src={
                            isWalletDropdownOpen
                                ? WalletDropdownActiveIcon
                                : WalletDropdownIcon
                        }
                    />
                </div>
                <div className="dropdown-label">Wallet</div>
                <div>
                    {/* <img src={isWalletDropdownOpen ? ArrowUp : ArrownDown} className='menu-indicator-icon' /> */}
                </div>
            </div>

            {isWalletDropdownOpen && (
                <ClickAwayListener
                    onClickAway={() => setIsWalletDropdownOpen(false)}
                >
                    <div className="wallet-dropdown-popover">
                        <div className="section">
                            <div className="section-title">
                                Connected address
                            </div>
                            {walletConnectionStatus && (
                                <div className="address-text">
                                    {displayWalletAddress}
                                </div>
                            )}
                            <div>
                                {!walletConnectionStatus && (
                                    <button onClick={activateWallet}>
                                        Connect
                                    </button>
                                )}
                                {walletConnectionStatus && (
                                    <button onClick={deactivateWallet}>
                                        Disconnect
                                    </button>
                                )}
                            </div>
                        </div>
                        <div className="divider" />
                    </div>
                </ClickAwayListener>
            )}
        </div>
    )
}
