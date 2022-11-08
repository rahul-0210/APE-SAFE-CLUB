import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useWeb3React} from '@web3-react/core'
import {injected} from '../utils/connectors'

import ConnectWalletImg from '../assets/wallet/ConnectWalletLogo.svg'
import MetamaskBrowserInfo from '../assets/wallet/metamask-browser.png'
import GooglePlayImg from '../assets/wallet/googleplay.png'
import AppStoreImg from '../assets/wallet/appstore.png'

export default function ConnectWallet() {
    const {active, account, activate, deactivate, chainId} = useWeb3React()
    const dispatch = useDispatch()
    const {walletAddress, walletConnectionStatus, displayWalletAddress} =
        useSelector((state) => state.wallet)
    const [getHelpClicked, setGetHelpClicked] = React.useState(false)
    const isMobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
        )

    return <div>connectWallet</div>
}
