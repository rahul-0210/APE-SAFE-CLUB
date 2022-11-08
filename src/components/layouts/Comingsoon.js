import React from "react";
import { Link } from "react-router-dom";

const Comingsoon = ({ launchpadId, image, title, launchpadData, urlSlug }) => {
  return (
    // <Link to={{ pathname: `/project/${launchpadId}/${urlSlug}`, state: { launchpadFullData: { launchpadData } } }} style={{ textDecoration: "none", color: "#0a2148" }}>
    //   <div className='coming-soon'>
    //     <div className='soon-block'>
    //       <div className='container'>
    //         <img alt='Launching Soon' className='projectImg' src={image} />
    //       </div>
    //       <p className='project-name'>{title}</p>
    //     </div>
    //     <div className='soon-button'>
    //       <img src={Clock} alt='' />
    //       <p>Launching Soon</p>
    //     </div>
    //   </div>
    // </Link>
    <Link
      to={{
        pathname: `/project/${launchpadId}/${urlSlug}`,
        state: { launchpadFullData: { launchpadData } },
      }}
      style={{ textDecoration: "none", color: "#0a2148" }}
    >
      <div className="connectWallet">
        <div className="main">
          <div className="card-element">
            <div className="card-content">
              <div className="soon-block">
                <div className="container">
                  <img
                    alt="Launching Soon"
                    className="projectImg"
                    src={image}
                    height={150}
                    width={150}
                  />
                </div>
                <h1 className="">{title}</h1>
                <div className="soon-button ">
                  {/* <img src={Clock} alt="" /> */}
                  <h3>Launching Soon</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Comingsoon;
