import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {NavLink, useLocation} from 'react-router-dom'
import {PATH_HEADER_TEXT_MAPPING} from '../../App.config'

import {setSidebarOpen} from '../../redux/actions/master-actions'
// import { WalletDropdown } from "../walletDropdown";
import apeLogo from '../../assets/logo-white.png'

const Navbar = () => {
    const account = false
    const dispatch = useDispatch()
    const location = useLocation()

    const {sidebarOpen} = useSelector((state) => state.masterReducer)
    const {walletAddress} = useSelector((state) => state.wallet)
    // const isConnected = useSelector((state) => state.connectionReducer);
    const isConnected = false

    return (
        <div className="navbar-container">
            <div className="navbar-main navbar-container-fullwidth">
                <div className="navbar-name">
                    <div
                        className="burger"
                        onClick={() => dispatch(setSidebarOpen(!sidebarOpen))}
                    >
                        <div className="burger-icon"></div>
                        <div
                            className="burger-icon"
                            style={{width: '70%'}}
                        ></div>
                        <div
                            className="burger-icon"
                            style={{width: '40%'}}
                        ></div>
                    </div>
                    <NavLink
                        exact
                        to="/"
                        className={`${isConnected && account && 'm-hide'}`}
                    >
                        <img src={apeLogo} alt="" />
                    </NavLink>
                    <p className={`${isConnected && account && 'm-hide'}`}>
                        {PATH_HEADER_TEXT_MAPPING[location.pathname]}
                    </p>
                </div>
                <div className="connection">{/* <WalletDropdown /> */}</div>
                {walletAddress && (
                    <p
                        style={{
                            color: '#fff',
                            border: '2px solid #fff',
                            borderRadius: '5px',
                            padding: '5px',
                            marginRight: '40px',
                        }}
                    >
                        {walletAddress?.substr(0, 6) +
                            '...' +
                            walletAddress?.substr(
                                walletAddress?.length - 6,
                                walletAddress?.length
                            )}
                    </p>
                )}
            </div>
        </div>
    )
}

export default Navbar
