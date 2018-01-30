import React from "react";

import "./styles/api-attribution.css";
import logo from "./images/wundergroundLogo_4c_horz.png";


export default function HeaderBar() {
  return (
    <div className="api-attribution">
      <span>Powered by <a target="_blank" rel="noopener noreferrer" href="https://www.wunderground.com"><img src={logo} alt="Weather Undergound light-colored logo"/></a></span>
    </div>
  );
}