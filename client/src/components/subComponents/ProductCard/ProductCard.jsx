import { useState, useEffect } from "react";
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard";
import { baseUrl } from "../../../config/api";
import { currencyFormatter } from "../../utils/currencyFormatter";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/actions/wishlist";
import { addToCart } from "../../../redux/actions/cart";
import { toast } from "react-toastify";

const ProductCard = ({ item }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (wishlist?.find((wItem) => wItem._id === item._id)) setClick(true);
    else setClick(false);
  }, [wishlist]);

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
      if (item.stock < 1) {
        toast.error("Product out of stock!");
      } else {
        const cartData = { ...item, qty: 1 };
        dispatch(addToCart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  return (
    <>
      <div className="w-full h-auto bg-white border border-opacity-10 hover:border-opacity-40 hover:border-priColor border-secColor rounded-lg shadow-sm  relative cursor-pointer">
        <div className="p-2">
          <Link to={`/product/${item._id}`}>
            <img
              className="w-full h-[150px] object-cover rounded-lg"
              src={`${baseUrl}${item.images && item.images[0]}`}
              alt="product image"
            />
          </Link>
        </div>
        <div className=" bg-priColor bg-opacity-10 rounded-b-lg  px-3">
          <Link to={`/product/${item._id}`}>
            <h5
              className={`${styles.shop_name} text-secColor font-semibold text-xs`}
            >
              {item.shop.name}
            </h5>
          </Link>
          <Link to={`/product/${item._id}`}>
            <h4 className="text-sm text-deepSecColor">
              {item.name.length > 40
                ? item.name.slice(0, 40) + "..."
                : item.name}
            </h4>

            <div className="flex mb-2 mt-3">
              <AiFillStar
                className="mr-2 cursor-pointer"
                size={16}
                color="#F6BA00"
              />
              <AiFillStar
                className="mr-2 cursor-pointer"
                size={16}
                color="#F6BA00"
              />
              <AiFillStar
                className="mr-2 cursor-pointer"
                size={16}
                color="#F6BA00"
              />
              <AiFillStar
                className="mr-2 cursor-pointer"
                color="#F6BA00"
                size={16}
              />
              <AiOutlineStar
                size={16}
                className="mr-2 cursor-pointer"
                color="#F6BA00"
              />
            </div>
            <div className="py-2 flex items-center justify-between">
              <div className="flex">
                <h5
                  className={`${styles.productDiscountPrice} text-deepSecColor text-base`}
                >
                  {item.originalPrice === 0
                    ? currencyFormatter(item.originalPrice)
                    : currencyFormatter(item.discountPrice)}
                </h5>
                <h4 className={`${styles.price} text-xs`}>
                  {item.originalPrice
                    ? currencyFormatter(item.originalPrice)
                    : null}
                </h4>
              </div>
              <span className="font-[400] text-sm text-priColor">
                {item.sold_out} sold
              </span>
            </div>
          </Link>
        </div>

        {/* side options */}
        <div>
          {click ? (
            <AiFillHeart
              size={30}
              className="cursor-pointer absolute right-2 top-5 bg-white rounded-l p-1"
              onClick={() => removeWishListHandler(item)}
              color={click ? "red" : "#0b2a3f"}
              title="Remove from wishlist"
            />
          ) : (
            <AiOutlineHeart
              size={30}
              className="cursor-pointer absolute right-2 top-5 bg-white rounded-l p-1"
              onClick={() => addWishListHandler(item)}
              color={click ? "red" : "#0b2a3f "}
              title="Add to wishlist"
            />
          )}
          <AiOutlineEye
            size={30}
            className="cursor-pointer absolute right-2 top-14 bg-white rounded-l p-1"
            onClick={() => setOpen(!open)}
            color="#0b2a3f"
            title="Quick view"
          />
          <AiOutlineShoppingCart
            size={30}
            className="cursor-pointer absolute right-2 top-24 bg-white rounded-l p-1"
            onClick={() => addToCartHandler(item._id)}
            color="#0b2a3f"
            title="Add to cart"
          />
          {open ? <ProductDetailsCard setOpen={setOpen} item={item} /> : null}
        </div>
      </div>
    </>
  );
};

export default ProductCard;
