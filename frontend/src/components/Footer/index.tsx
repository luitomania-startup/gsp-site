import React from "react";
import wave1 from "./wave-1.svg";
import wave2 from "./wave-2.svg";
import logo from '../../assets/logo.png'
import './styles.css'
const index = () => {
  return (
    <div>
      <div className="footer-header">
        {/* <div className="footer-inner-header flex">
          <img src={wave1} alt="None"  />
          <h1>Simple CSS Waves</h1>
        </div> */}

        <div>
        <svg className="footer-waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
<defs>
<path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
</defs>
<g className="parallax">
<use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7" />
<use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
<use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
<use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff" />
</g>
</svg>
        </div>
      </div>

      <div className="footer-content flex justify-around text-center items-center">

        <div className="rights flex flex-row justify-between items-center">
        <img src={logo} className="logo" alt="" />
        <p>@ 2022  All Rights Reserved . Gana Suraksha Party </p>

        </div>
        <div className="tabs grid grid-cols-1 sm:grid-cols-3 mr-[4rem] ">
            <p className="text-[#219451] hover:text-[#63fa3d]">Resources</p>
            <p className="text-[#219451] hover:text-[#63fa3d]">Blog</p>
            <p className="text-[#219451] hover:text-[#63fa3d]">Help Desk</p>
        </div>
      </div>
    </div>
  );
};

export default index;
