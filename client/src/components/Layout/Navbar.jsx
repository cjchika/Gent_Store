import React from "react";
import { Link } from "react-router-dom";
import { navItems } from "../../static/data";
import styles from "../../styles/styles";

const Navbar = ({ active }) => {
  return (
    <div className={`block 800px:${styles.normalFlex}`}>
      {navItems &&
        navItems.map((nav, index) => (
          <div className="flex">
            <Link
              to={nav.url}
              className={`${
                active === index + 1
                  ? "text-priColor"
                  : "text-black 800px:text-[#fff]"
              }`}
            >
              {nav.title}
            </Link>
          </div>
        ))}
    </div>
  );
};

export default Navbar;
