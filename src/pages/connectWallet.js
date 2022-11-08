import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useWeb3React} from '@web3-react/core'
import {injected} from '../utils/connectors'
import {
    setWalletAddress,
    setWalletConnectionStatus,
    setDisplayWalletAdress,
} from '../redux/actions/wallet'
import ConnectWalletImg from '../assets/wallet/ConnectWalletLogo.svg'
import MetamaskBrowserInfo from '../assets/wallet/metamask-browser.png'
import GooglePlayImg from '../assets/wallet/googleplay.png'
import AppStoreImg from '../assets/wallet/appstore.png'
import {useSnackbar} from 'notistack'

export default function ConnectWallet() {
    const {active, account, activate, deactivate, chainId} = useWeb3React()
    const dispatch = useDispatch()
    const {enqueueSnackbar} = useSnackbar()
    const {walletAddress, walletConnectionStatus, displayWalletAddress} =
        useSelector((state) => state.wallet)
    const [getHelpClicked, setGetHelpClicked] = React.useState(false)
    const isMobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
        )

    useEffect(() => {
        if (process.env.REACT_APP_enviorment === 'dev') {
            dispatch(setWalletConnectionStatus(active))
            if (active && account) {
                dispatch(setWalletAddress(account))
            } else {
                dispatch(setWalletAddress(''))
            }
        } else {
            dispatch(setWalletConnectionStatus(active))
            if (chainId && chainId !== 56) {
                deactivate()
                // toast.error("Please connect to smart chain for using money printer")
                enqueueSnackbar('Please connect to smart chain.', {
                    variant: 'error',
                })
            } else {
                if (active && account) {
                    dispatch(setWalletAddress(account))
                } else {
                    dispatch(setWalletAddress(''))
                }
            }
        }
    }, [active, account, chainId])

    const connectToMetaMask = async () => {
        try {
            await activate(injected)
        } catch (error) {
            enqueueSnackbar('Please connect to smart chain.', {
                variant: 'error',
            })
        }
    }

    async function disconnect() {
        try {
            deactivate()
        } catch (ex) {
            console.error(ex)
        }
    }

    const displayMetamaskInfo = () => {
        return (
            <>
                <p>
                    Find the Browser in your Metamask App Menu and access the
                    Dashboard from there.
                </p>
                <div className="mobileWalletCard">
                    <div className="metamaskImgDiv">
                        <img src={MetamaskBrowserInfo} alt="metamask" />
                    </div>
                    <div className="storeLinks">
                        <a href="https://apps.apple.com/in/app/metamask-blockchain-wallet/id1438144202">
                            <img src={AppStoreImg} alt="appstore" />
                        </a>
                        <a href="https://play.google.com/store/apps/details?id=io.metamask">
                            <img src={GooglePlayImg} alt="googleplay" />
                        </a>
                    </div>
                </div>
            </>
        )
    }

    const displayMobileHelpLink = () => {
        if (isMobile) {
            return (
                <div>
                    <p>Connect wallet</p>
                    {getHelpClicked ? (
                        displayMetamaskInfo()
                    ) : (
                        <>
                            <p>
                                To Connect your Metamask Wallet please go to
                                Metamask Browser
                            </p>
                            <p
                                onClick={() => setGetHelpClicked(true)}
                                style={{
                                    marginBottom: 20,
                                    cursor: 'pointer',
                                    textDecoration: 'underline',
                                    color: 'blue',
                                }}
                            >
                                Help Getting Started
                            </p>
                            <button
                                className="btn gradient-btn"
                                onClick={connectToMetaMask}
                            >
                                <img src={ConnectWalletImg} alt="" /> Connect
                                wallet
                            </button>
                        </>
                    )}
                </div>
            )
        } else {
            return (
                <div>
                    <p>Connect wallet</p>
                    <p>Connect wallet to interact with dapp</p>
                    <button
                        className="btn gradient-btn"
                        onClick={connectToMetaMask}
                    >
                        <img src={ConnectWalletImg} alt="" /> Connect wallet
                    </button>
                </div>
            )
        }
    }
    return (
        <div className="connectWallet">
            <div className="main">
                <div className="card-element">
                    <div className="card-content">
                        <div>
                            {walletConnectionStatus && walletAddress ? (
                                <>
                                    <p>Disconnect wallet</p>
                                    <p>
                                        Select product from navigation to
                                        interact with dapp
                                    </p>
                                    <button
                                        className="btn gradient-btn"
                                        onClick={() => disconnect()}
                                    >
                                        <img src={ConnectWalletImg} alt="" />{' '}
                                        Disconnect wallet
                                    </button>
                                </>
                            ) : (
                                <>{displayMobileHelpLink()}</>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
