import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/styles";
import { categoriesData, productData } from "../../static/data";
import { useParams } from "react-router-dom";
import Logo from "./Logo";
import { FiSearch } from "react-icons/fi";
import {
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";
import { MdFavoriteBorder } from "react-icons/md";
import { IoIosArrowForward, IoMdArrowDropdown } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { BiMenuAltLeft } from "react-icons/bi";
import DropDown from "./DropDown";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import Cart from "../Cart/Cart";
import Wishlist from "../Wishlist/Wishlist";
import { RxCross1 } from "react-icons/rx";
import { baseUrl } from "../../config/api";

const Header = ({ activeHeader }) => {
  const { isUserAuthenticated, user } = useSelector((state) => state.user);
  const { allProducts } = useSelector((state) => state.products);
  const { isSellerAuthenticated, seller } = useSelector(
    (state) => state.seller
  );
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [dropdown, setDropDown] = useState(false);
  const [active, setActive] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [open, setOpen] = useState(false);
  const [openSearchBox, setOpenSearchBox] = useState(false);

  const { id } = useParams();

  const handleSearchChange = (e) => {
    setOpenSearchBox(true);
    const term = e.target.value;
    setSearchTerm(term);

    setSearchData(
      allProducts?.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      )
    );
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
        <Logo align="" path={"/"} />
        <div className={`pl-10 relative ${styles.normalFlex} justify-between`}>
          {/* NAVITEMS */}

          {/* Categories Dropdown */}
          <div
            onClick={() => setDropDown(!dropdown)}
            className="relative  hidden 1000px:block pr-6"
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
              className="text-sm h-[40px] w-full lg:w-[300px] px-3 rounded-full bg-[#F6F6F5]  focus:border focus:border-secColor"
            />
            <FiSearch
              size={20}
              className="text-secColor absolute right-3 top-2 cursor-pointer"
            />
            {searchData?.length !== 0 && openSearchBox && (
              <div className="absolute min-h-[30vh] bg-[#fff] shadow-sm z-[9] p-4 mt-1">
                {searchData?.map((prod, index) => {
                  return (
                    <Link
                      onClick={() => setOpenSearchBox(false)}
                      to={`/product/${prod._id}`}
                    >
                      <div className="text-sm text-secColor  w-full flex items-start py-3 hover:text-priColor">
                        <img
                          src={`${baseUrl}${prod.images[0]}`}
                          alt=""
                          className="w-[40px] h-[40px] mr-[10px]"
                        />
                        <h1>{prod.name}</h1>
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
              {isUserAuthenticated ? (
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
                {wishlist?.length}
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
                {cart?.length}
              </span>
            </div>
          </div>

          {/* CART POPUP */}
          {openCart && <Cart setOpenCart={setOpenCart} />}

          {/* WISHLIST POPUP */}
          {openWishlist && <Wishlist setOpenWishlist={setOpenWishlist} />}

          <button
            className={`ml-2 bg-secColor hover:bg-deepSecColor p-2 px-3 rounded-lg`}
          >
            <Link to="/create-shop">
              <h1 className="text-[#fff] xl:flex items-center text-sm hidden">
                Become Seller <IoIosArrowForward className="ml-1" />
              </h1>
              <h1 className="text-[#fff] flex items-center text-sm xl:hidden">
                Seller <IoIosArrowForward className="ml-1" />
              </h1>
            </Link>
          </button>
        </div>
      </div>

      {/* mobile header */}
      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        }
      w-full h-[60px] bg-[#fff] z-50 top-0 left-0 shadow-sm 800px:hidden`}
      >
        <div className="w-full flex items-center justify-between">
          <div>
            <BiMenuAltLeft
              size={40}
              className="ml-4 text-secColor"
              onClick={() => setOpen(true)}
            />
          </div>
          <div className="my-2">
            <Logo align="" path={"/"} />
          </div>
          <div>
            <div
              onClick={() => setOpenCart(true)}
              className="relative mr-[20px]"
            >
              <AiOutlineShoppingCart size={30} className="text-secColor" />
              <span class="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center">
                {cart?.length}
              </span>
            </div>
          </div>

          {/* CART POPUP */}
          {openCart && <Cart setOpenCart={setOpenCart} />}
        </div>

        {/* header sidebar */}
        {open && (
          <div
            className={`fixed w-full bg-[#0000005f] z-20 h-full top-0 left-0`}
          >
            <div className="fixed w-[60%] bg-[#fff] h-screen top-0 left-0 z-10 overflow-y-scroll">
              <div className="w-full justify-between flex pr-3">
                <div>
                  <div className="relative mr-[15px]">
                    <AiOutlineHeart
                      size={25}
                      className="mt-5 ml-3 text-secColor"
                    />
                    <span class="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center">
                      {wishlist?.length}
                    </span>
                  </div>
                </div>
                <RxCross1
                  size={20}
                  className="ml-4 mt-5 text-secColor"
                  onClick={() => setOpen(false)}
                />
              </div>

              <div className="my-8 w-[92%] m-auto h-[40px]  relative">
                <input
                  type="search"
                  placeholder="Search Product..."
                  className="h-[40px] w-full px-2 border-secColor border rounded-md"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                {searchData && (
                  <div className="absolute bg-[#fff] z-10 shadow w-full left-0 p-3">
                    {searchData?.map((prod) => {
                      return (
                        <Link
                          onClick={() => setOpen(false)}
                          to={`/product/${prod._id}`}
                        >
                          <div className="flex items-center">
                            <img
                              src={`${baseUrl}${prod.images[0]}`}
                              alt=""
                              className="w-[50px] mr-2"
                            />
                            <h5 className="text-secColor text-xs">
                              {prod.name}
                            </h5>
                          </div>
                          <hr className="text-[#bdbaba] text-opacity-90 my-3 " />
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              <Navbar active={activeHeader} />

              <div className="flex flex-col p-2 px-3 w-full justify-center text-secColor">
                {isUserAuthenticated ? (
                  <div>
                    <Link to="/profile" className="flex items-center">
                      <AiOutlineUser size={25} className="text-secColor mr-3" />
                      <span>My Profile </span>
                    </Link>
                  </div>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="text-base text-white my-1 bg-secColor rounded-md p-2 px-3"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      className="text-base text-white my-1 bg-secColor rounded-md p-2 px-3"
                    >
                      Sign up
                    </Link>
                  </>
                )}
              </div>
              <button
                className={`ml-3 border border-secColor hover:bg-deepSecColor p-2 px-3 w-[90%] 600px:w-[95%] rounded-lg`}
              >
                <Link to="/create-shop">
                  <h1 className="text-secColor flex items-center text-base ">
                    Become Seller <IoIosArrowForward className="ml-1" />
                  </h1>
                </Link>
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
