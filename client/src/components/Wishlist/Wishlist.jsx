import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { BsCartPlus } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import WishlistSingle from "./WishlistSingle";
import { removeFromWishlist } from "../../redux/actions/wishlist";
import { addToCart } from "../../redux/actions/cart";

const Wishlist = ({ setOpenWishlist }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const removeWishlistHandler = (data) => {
    dispatch(removeFromWishlist(data));
  };

  const addToCartHandler = (data) => {
    const newData = { ...data, qty: 1 };
    dispatch(addToCart(newData));
    setOpenWishlist(false);
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
      <div className="fixed top-0 right-0 min-h-full w-[25%] bg-white flex flex-col justify-between shadow-sm">
        <div>
          <div className="flex w-full justify-end pt-5 pr-5">
            <RxCross1
              size={16}
              className="cursor-pointer"
              onClick={() => setOpenWishlist(false)}
            />
          </div>
          {/* Item */}
          <div className={`${styles.normalFlex} p-2 px-4 text-secColor`}>
            <AiOutlineHeart size={25} />
            <h5 className="pl-5 text-base font-semibold">
              {wishlist?.length} items
            </h5>
          </div>

          {/* cart Single Items */}
          <br />
          <div className="w-full border-t border-secColor border-opacity-30">
            {wishlist &&
              wishlist.map((item, index) => (
                <WishlistSingle
                  key={index}
                  item={item}
                  removeWishlistHandler={removeWishlistHandler}
                  addToCartHandler={addToCartHandler}
                />
              ))}
          </div>
          {wishlist?.length === 0 && (
            <div className="p-5 text-center text-secColor">
              <h1 className="text-lg font-medium">
                Wishlist is empty! <br />{" "}
                <span className="text-sm">Start adding to wishlist.</span>
              </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
