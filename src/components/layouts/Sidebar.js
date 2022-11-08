import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {NavLink} from 'react-router-dom'

import {setSidebarOpen} from '../../redux/actions/master-actions'

import Telegram from '../../assets/nav-icons/telegram.svg'
import Twitter from '../../assets/nav-icons/twitter.svg'
import Discord from '../../assets/nav-icons/discord.svg'
import coinflip from '../../assets/nav-icons/coinFlip.svg'
import diceLogo from '../../assets/nav-icons/dice.svg'
import ExternalLink from '../../assets/nav-icons/external-link-icon.svg'
import apeLogo from '../../assets/logo-white.png'

const Sidebar = () => {
    const dispatch = useDispatch()
    const {sidebarOpen} = useSelector((state) => state.masterReducer)

    const NAV_LINKS = [
        {
            logo: coinflip,
            title: 'Coin Flip',
            subtext: 'Take chance and chose a side',
            path: '/coin-flip',
            isExternal: false,
            network: null,
        },
        {
            logo: diceLogo,
            title: 'Roll Dice',
            subtext: 'Chose your fate and select one',
            path: '/dice',
            isExternal: false,
            network: null,
        },
        {
            logo: apeLogo,
            title: 'Website',
            subtext: 'Visit our Website',
            path: 'http://thegarden.finance/',
            isExternal: true,
            network: null,
        },
    ]

    return (
        <div className={`sidebar-main ${sidebarOpen && 'extended leftToggle'}`}>
            <div className="logo">
                <a href="/">
                    <img src={apeLogo} alt="" />
                </a>
                <p
                    style={{cursor: 'pointer'}}
                    onClick={() => dispatch(setSidebarOpen(!sidebarOpen))}
                >
                    x
                </p>
            </div>
            <div className="nav-list">
                <ul>
                    {NAV_LINKS.map((item, i) => {
                        if (item) {
                            return (
                                <NavLinkComponent key={i} linkConfig={item} />
                            )
                        } else {
                            return null
                        }
                    })}
                </ul>
            </div>
            <div className="footerLinks">
                <a
                    href="https://t.me/TheGarden_group"
                    target="_blank"
                    rel="noreferrer"
                >
                    <img src={Telegram} alt="telegram" />
                </a>
                <a
                    href="https://twitter.com/TheGardenCoin"
                    target="_blank"
                    rel="noreferrer"
                >
                    <img src={Twitter} alt="twitter" />
                </a>
                <a
                    href="https://discord.com/invite/Z5ZJmDMREv"
                    target="_blank"
                    rel="noreferrer"
                >
                    <img src={Discord} alt="discord" />
                </a>
            </div>
        </div>
    )
}

export default Sidebar

function NavLinkComponent({
    linkConfig: {logo, path, isExternal, title, subtext},
}) {
    return (
        <>
            {isExternal ? (
                <a
                    target="_blank"
                    href={path}
                    className="nav-link"
                    activeClassName="active-nav-link"
                    rel="noreferrer"
                >
                    <div className="link-box">
                        <div>
                            <img src={logo} alt="logo" />
                        </div>
                        <div style={{flexGrow: 1}}>
                            <div>{title}</div>
                            <div className="subtext">{subtext}</div>
                        </div>
                        <div>
                            <img
                                src={ExternalLink}
                                className="external-link-icon"
                                alt="external-link"
                            />
                        </div>
                    </div>
                </a>
            ) : (
                <NavLink
                    exact
                    to={path}
                    className="nav-link"
                    activeClassName="active-nav-link"
                >
                    <div className="link-box">
                        <div>
                            <img src={logo} alt="logo" />
                        </div>
                        <div>
                            <div>{title}</div>
                            <div className="subtext">{subtext}</div>
                        </div>
                    </div>
                </NavLink>
            )}
        </>
    )
}
