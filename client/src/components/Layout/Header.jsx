import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/styles";
import { categoriesData, productData } from "../../static/data";
import Logo from "./Logo";
import { FiSearch } from "react-icons/fi";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState("");

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    console.log(term);

    const filteredProducts =
      productData &&
      productData.filter((product) => {
        product.name.toLowerCase().includes(term.toLowerCase());
      });

    setSearchData(filteredProducts);
  };

  return (
    <div className={`${styles.section}`}>
      <div className="hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between">
        <Logo align="" />
        {/* SEARCH BOX */}
        <div className="w-[50%] relative">
          <input
            type="text"
            placeholder="Search products"
            value={searchTerm}
            onChange={handleSearchChange}
            className="text-sm h-[40px] w-full px-3 rounded-full  focus:border focus:border-secColor"
          />
          <FiSearch
            size={20}
            className="text-secColor absolute right-3 top-2 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
