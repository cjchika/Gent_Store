import React from "react";
import { Link } from "react-router-dom";
import GentLogo from "../../static/images/GentsLogoNew.png";

const Logo = ({ align, path }) => {
  return (
    <div className={`w-[130px] h-auto mx-${align}`}>
      <Link to={path}>
        <img className="w-full h-full" src={GentLogo} alt="Logo" />
      </Link>
    </div>
  );
};

export default Logo;
