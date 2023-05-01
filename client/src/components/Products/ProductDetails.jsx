import { useState, useEffect } from "react";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import { getAllShopProducts } from "../../redux/actions/product";
import { baseUrl } from "../../config/api";
import { currencyFormatter } from "../utils/currencyFormatter";
import { addToCart } from "../../redux/actions/cart";
import {
  removeFromWishlist,
  addToWishlist,
} from "../../redux/actions/wishlist";
import { toast } from "react-toastify";

const ProductDetails = ({ item }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(getAllShopProducts(item && item.shop._id));
  }, [dispatch, item]);

  // useEffect(() => {
  //   if (wishlist?.find((wItem) => wItem._id === item._id)) setClick(true);
  //   else setClick(false);
  // }, []);

  const removeWishListHandler = (item) => {
    setClick(!click);
    dispatch(removeFromWishlist(item));
  };

  const addWishListHandler = (item) => {
    setClick(!click);
    dispatch(addToWishlist(item));
  };

  const addToCartHandler = (id) => {
    const isItemExist = cart && cart.find((cartItem) => cartItem._id === id);
    if (isItemExist) {
      toast.error("Item already in cart!");
    } else {
      if (item.stock < count) {
        toast.error("Product out of stock!");
      } else {
        const cartData = { ...item, qty: count };
        dispatch(addToCart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  return (
    <div className="bg-white">
      {item && (
        <div className={`${styles.section} w-[90%] 800px:w-[80%]`}>
          <div className="w-full py-5">
            <div className="block w-full 800px:flex">
              <div className="w-full 800px:w-[50%] 800px:p-5 800px:pr-10">
                <img
                  src={`${baseUrl}${item?.images[select]}`}
                  alt=""
                  className="w-[100%]"
                />
                <div className="w-full flex gap-3 mt-8">
                  <div
                    className={`${
                      select === 0 ? "border border-secColor " : "null"
                    } cursor-pointer`}
                  >
                    <img
                      src={`${baseUrl}${item?.images[0]}`}
                      alt=""
                      className="h-[100px] overflow-hidden object-cover"
                      onClick={() => setSelect(0)}
                    />
                  </div>
                  <div
                    className={`${
                      select === 1 ? "border border-secColor " : "null"
                    } cursor-pointer`}
                  >
                    <img
                      src={`${baseUrl}${item?.images[1]}`}
                      alt=""
                      className="h-[100px] overflow-hidden object-cover"
                      onClick={() => setSelect(1)}
                    />
                  </div>
                </div>
              </div>
              <div className="w-full 800px:w-[50%] pt-5">
                <h1
                  className={`${styles.productTitle} mb-3 capitalize text-secColor`}
                >
                  {item.name}
                </h1>
                <p className="text-justify text-sm leading-7 text-secColor text-opacity-80">
                  {item.description}
                </p>
                <div className="flex pt-3">
                  <h4
                    className={`${styles.productDiscountPrice} text-priColor text-xl`}
                  >
                    {currencyFormatter(item.discountPrice)}
                  </h4>
                  <h3 className={`${styles.price}`}>
                    {currencyFormatter(item.originalPrice)
                      ? currencyFormatter(item.originalPrice)
                      : null}
                  </h3>
                </div>

                <div className="flex items-center mt-12 justify-between pr-3">
                  <div>
                    <button
                      className="bg-deepSecColor text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={count > 1 && (() => setCount(count - 1))}
                    >
                      -
                    </button>
                    <span className=" font-medium px-4 py-[11px]">{count}</span>
                    <button
                      className="bg-deepSecColor text-white font-bold rounded-r px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={() => setCount(count + 1)}
                    >
                      +
                    </button>
                  </div>
                  <div>
                    {click ? (
                      <AiFillHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={() => removeWishListHandler(item)}
                        color={click ? "red" : "#333"}
                        title="Remove from wishlist"
                      />
                    ) : (
                      <AiOutlineHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={() => addWishListHandler(item)}
                        color={click ? "red" : "#333"}
                        title="Add to wishlist"
                      />
                    )}
                  </div>
                </div>
                <button
                  onClick={() => addToCartHandler(item._id)}
                  className={`${styles.button} bg-secColor hover:bg-deepSecColor !mt-6 !rounded !h-11 flex items-center`}
                >
                  <span className="text-white flex items-center">
                    Add to cart <AiOutlineShoppingCart className="ml-1" />
                  </span>
                </button>
                <div className="flex items-center pt-8">
                  <Link to={`/shop/preview/${item?.shop._id}`}>
                    <img
                      src={`${baseUrl}${item?.shop?.avatar}`}
                      alt=""
                      className="w-[60px] h-[60px] rounded-full mr-2 object-cover"
                    />
                  </Link>

                  <div className="pr-8">
                    <Link to={`/shop/preview/${item?.shop._id}`}>
                      <h3
                        className={`font-semibold text-deepSecColor pb-1 pt-1`}
                      >
                        {item.shop.name}
                      </h3>
                    </Link>
                    <h5 className="py-1 text-base text-deepSecColor">
                      (4/5) Ratings
                    </h5>
                  </div>
                  <button
                    className={`bg-secColor hover:bg-deepSecColor p-2 rounded-md text-white`}
                    onClick={console.log("Clicked")}
                  >
                    <span className="flex items-center">
                      Send Message <AiOutlineMessage className="ml-1" />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <ProductDetailsInfo item={item} products={products} />
          <br />
          <br />
        </div>
      )}
    </div>
  );
};

const ProductDetailsInfo = ({ item, products }) => {
  const [active, setActive] = useState(1);

  return (
    <div className="bg-[#f5f6fb] px-3 800px:px-10 py-2 rounded">
      <div className="w-full flex justify-between border-b border-[#6b6b6d] border-opacity-10  pt-10 pb-3">
        <div className="relative">
          <h5
            className={
              "text-secColor text-lg px-1 leading-5 font-medium cursor-pointer 800px:text-xl"
            }
            onClick={() => setActive(1)}
          >
            Product Details
          </h5>
          {active === 1 && <div className={`${styles.active_indicator}`} />}
        </div>
        <div className="relative">
          <h5
            className={
              "text-secColor text-lg px-1 leading-5 font-medium cursor-pointer 800px:text-xl"
            }
            onClick={() => setActive(2)}
          >
            Product Reviews
          </h5>
          {active === 2 && <div className={`${styles.active_indicator}`} />}
        </div>
        <div className="relative">
          <h5
            className={
              "text-secColor text-lg px-1 leading-5 font-medium cursor-pointer 800px:text-xl"
            }
            onClick={() => setActive(3)}
          >
            Seller Information
          </h5>
          {active === 3 && <div className={`${styles.active_indicator}`} />}
        </div>
      </div>
      {active === 1 && (
        <>
          <p className="py-5 text-base text-secColor text-opacity-80 leading-8 pb-10 text-justify whitespace-pre-line">
            {item.description}
          </p>
        </>
      )}

      {active === 2 && (
        <div className="w-full text-secColor justify-center min-h-[40vh] flex items-center">
          <p>No Reviews yet!</p>
        </div>
      )}

      {active === 3 && (
        <div className="w-full block 800px:flex p-5">
          <div className="w-full 800px:w-[50%]">
            <Link to={`/shop/preview/${item.shop._id}`}>
              <div className="flex items-center">
                <img
                  src={`${baseUrl}${item?.shop?.avatar}`}
                  className="w-[80px] h-[80px] rounded-full object-cover"
                  alt=""
                />
                <div className="pl-3">
                  <h3 className={`font-semibold text-deepSecColor`}>
                    {item?.shop.name}
                  </h3>
                  <h5 className="py-2 text-base text-deepSecColor">
                    (4/5) Ratings
                  </h5>
                </div>
              </div>
            </Link>
            <p className="pt-2 text-secColor">{item?.shop.description}</p>
          </div>
          <div className="w-full 800px:w-[50%] mt-5 800px:mt-0 800px:flex flex-col items-end">
            <div className="text-left">
              <h5 className="font-semibold text-secColor">
                Joined on:{" "}
                <span className="font-medium text-secColor">
                  {item.shop?.createdAt?.slice(0, 10)}
                </span>
              </h5>
              <h5 className="font-semibold text-secColor pt-3">
                Total Products:{" "}
                <span className="font-medium text-secColor">
                  {products?.length}
                </span>
              </h5>
              <h5 className="font-semibold text-secColor pt-3">
                Total Reviews: <span className="font-medium">324</span>
              </h5>
              <Link to="/">
                <button
                  className={`${styles.button} !rounded-[4px] !h-[39.5px] mt-3 hover:bg-deepSecColor`}
                >
                  Back to Shop
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ProductDetails;
