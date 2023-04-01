import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/styles";
import { categoriesData, productData } from "../../static/data";
import Logo from "./Logo";
import { FiSearch } from "react-icons/fi";
import { IoIosArrowForward, IoMdArrowDropdown } from "react-icons/io";
import DropDown from "./DropDown";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [dropdown, setDropDown] = useState(false);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filteredProducts =
      productData &&
      productData.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );

    console.log(filteredProducts);
    setSearchData(filteredProducts);
    console.log(searchData);
  };

  return (
    <div className={`${styles.section}`}>
      <div className="hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between">
        <Logo align="" />

        {/* NAVITEMS */}

        {/* Categories Dropdown */}

        <div
          onClick={() => setDropDown(!dropdown)}
          className="relative   w-[270px] hidden 1000px:block"
        >
          <div className="flex items-center gap-1 cursor-pointer text-sm">
            <p>Categories</p>
            <IoMdArrowDropdown />
          </div>

          {dropdown && (
            <DropDown
              categoriesData={categoriesData}
              setDropDown={setDropDown}
            />
          )}
        </div>

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
          {searchData && searchData.length !== 0 ? (
            <div className="absolute min-h-[30vh] bg-[#f8fafc] shadow-sm z-[9] p-4 mt-1">
              {searchData &&
                searchData.map((i, index) => {
                  const m = i.name;

                  const product_name = m.replace(/\s+/g, "-");
                  return (
                    <Link to={`/product/${product_name}`}>
                      <div className="w-full flex items-start py-3 hover:bg-white">
                        <img
                          src={i.image_Url[0].url}
                          alt=""
                          className="w-[40px] h-[40px] mr-[10px]"
                        />
                        <h1>{i.name}</h1>
                      </div>
                    </Link>
                  );
                })}
            </div>
          ) : null}
        </div>

        {/* <button
          className={`text-white text-sm bg-secColor p-3 px-4 rounded-full cursor-pointer hover:bg-deepSecColor`}
        >
          <Link to="/seller" className="flex items-center">
            <p>Become Seller</p> <IoIosArrowForward className="ml-1" />
          </Link>
        </button> */}
      </div>
    </div>
  );
};

export default Header;
