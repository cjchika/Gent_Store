import React from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/styles";
import { categoriesData, productData } from "../../static/data";
import Logo from "../../static/images/GentsLogo.png";

const Header = () => {
  return (
    <div className={`${styles.section}`}>
      <div className="hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between">
        <div className="w-[130px] h-auto">
          <Link to="/">
            <img className="w-full h-full" src={Logo} alt="Logo" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
