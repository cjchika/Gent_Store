import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/styles";
import { categoriesData, productData } from "../../static/data";
import Logo from "./Logo";
import { FiSearch } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";
import { MdFavoriteBorder } from "react-icons/md";
import { IoIosArrowForward, IoMdArrowDropdown } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import DropDown from "./DropDown";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import Cart from "../Cart/Cart";
import Wishlist from "../Wishlist/Wishlist";

const Header = ({ activeHeader }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [dropdown, setDropDown] = useState(false);
  const [active, setActive] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [open, setOpen] = useState(false);

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

  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });

  return (
    <>
      <div
        className={`${
          active === true && "shadow-sm fixed top-0 left-0 z-10"
        } transition hidden 800px:flex items-center justify-between w-full bg-white h-[70px] px-10`}
      >
        <Logo align="" />
        <div className={`pl-10 relative ${styles.normalFlex} justify-between`}>
          {/* NAVITEMS */}

          {/* Categories Dropdown */}
          <div
            onClick={() => setDropDown(!dropdown)}
            className="relative  hidden 1000px:block pr-10"
          >
            <div className="flex items-center gap-1 cursor-pointer text-sm text-secColor">
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
          {/* Other items */}
          <Navbar active={activeHeader} />

          {/* SEARCH BOX */}
          <div className="w-full relative">
            <input
              type="text"
              placeholder="Search products"
              value={searchTerm}
              onChange={handleSearchChange}
              className="text-sm h-[40px] w-full px-3 rounded-full bg-[#F6F6F5]  focus:border focus:border-secColor"
            />
            <FiSearch
              size={20}
              className="text-secColor absolute right-3 top-2 cursor-pointer"
            />
            {searchData && searchData.length !== 0 && (
              <div className="absolute min-h-[30vh] bg-[#fff] shadow-sm z-[9] p-4 mt-1">
                {searchData &&
                  searchData.map((i, index) => {
                    const m = i.name;

                    const product_name = m.replace(/\s+/g, "-");
                    return (
                      <Link to={`/product/${product_name}`}>
                        <div className="text-sm text-secColor  w-full flex items-start py-3 hover:text-priColor">
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
            )}
          </div>
        </div>

        {/* USER | WISHLIST | CART*/}
        <div className="flex items-center gap-4 ml-5">
          {/* User */}
          <div className={`${styles.normalFlex} `}>
            <div className="relative cursor-pointer">
              {isAuthenticated ? (
                <Link to="/profile">
                  <AiOutlineUser size={25} className="text-secColor" />
                </Link>
              ) : (
                <Link to="/login">
                  <AiOutlineUser size={25} className="text-secColor" />
                </Link>
              )}
            </div>
          </div>

          {/* Wishlist */}
          <div className={`${styles.normalFlex} `}>
            <div
              className="relative cursor-pointer"
              onClick={() => setOpenWishlist(true)}
            >
              <MdFavoriteBorder size={25} className="text-secColor" />
              <span className="absolute right-0 top-0 rounded-full bg-priColor w-3 top right p-0 m-0 text-white text-xs leading-tight text-center">
                0
              </span>
            </div>
          </div>

          {/* Cart */}
          <div className={`${styles.normalFlex} `}>
            <div
              className="relative cursor-pointer"
              onClick={() => setOpenCart(true)}
            >
              <IoCartOutline size={25} className="text-secColor" />
              <span className="absolute right-0 top-0 rounded-full bg-priColor w-3 top right p-0 m-0 text-white text-xs leading-tight text-center">
                3
              </span>
            </div>
          </div>

          {/* CART POPUP */}
          {openCart && <Cart setOpenCart={setOpenCart} />}

          {/* WISHLIST POPUP */}
          {openWishlist && <Wishlist setOpenWishlist={setOpenWishlist} />}
        </div>

        {/* <button
          className={`text-white text-sm bg-secColor p-3 px-4 rounded-full cursor-pointer hover:bg-deepSecColor`}
        >
          <Link to="/seller" className="flex items-center">
            <p>Become Seller</p> <IoIosArrowForward className="ml-1" />
          </Link>
        </button> */}
      </div>
    </>
  );
};

export default Header;
