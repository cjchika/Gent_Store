import React from "react";
import { Link } from "react-router-dom";
import GentLogo from "../../static/images/GentsLogo.png";

const Logo = ({ align }) => {
  return (
    <div className={`w-[130px] h-auto mx-${align}`}>
      <Link to="/">
        <img className="w-full h-full" src={GentLogo} alt="Logo" />
      </Link>
    </div>
  );
};

export default Logo;
