import React from "react";
import { Link } from "react-router-dom";
import { navItems } from "../../static/data";
import styles from "../../styles/styles";

const Navbar = ({ active }) => {
  return (
    <>
      <div
        className={`hidden 800px:${styles.normalFlex} gap-5 1100px:gap-6 pr-7 text-sm`}
      >
        {navItems &&
          navItems.map((nav, index) => (
            <Link
              key={index}
              to={nav.url}
              className={`${
                active === index + 1 ? "text-priColor" : "text-secColor"
              } whitespace-nowrap`}
            >
              {nav.title}
            </Link>
          ))}
      </div>

      <div className={`flex flex-col px-3  800px:hidden`}>
        {navItems &&
          navItems.map((nav, index) => (
            <Link
              key={index}
              to={nav.url}
              className={`${
                active === index + 1 ? "text-priColor" : "text-secColor"
              } whitespace-nowrap mb-3`}
            >
              {nav.title}
            </Link>
          ))}
      </div>
    </>
  );
};

export default Navbar;
