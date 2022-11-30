import React from 'react'
import image from "../../assets/logo.png";
const Comingsoon = ({title}) => (
    <div className="connectWallet">
        <div className="main">
            <div className="card-element">
                <div className="card-content">
                    <div>
                        <div className="container">
                            <img
                                alt="Launching Soon"
                                className="projectImg"
                                src={image}
                                height={150}
                                width={150}
                            />
                        </div>
                        <p className="">{title}</p>
                        <p>
                            <h3>Coming Soon</h3>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
)

export default Comingsoon
