import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { BsCartPlus } from "react-icons/bs";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import WishlistSingle from "./WishlistSingle";

const Wishlist = ({ setOpenWishlist }) => {
  const cartData = [
    {
      name: "Iphone 14 pro max 256 gb ssd and 8gb ram sliver colour",
      description: "test",
      price: 999,
    },
    {
      name: "Iphone 14 pro max 256 gb ssd and 8gb ram sliver colour",
      description: "test",
      price: 245,
    },
    {
      name: "Iphone 14 pro max 256 gb ssd and 8gb ram sliver colour",
      description: "test",
      price: 645,
    },
  ];
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
            <h5 className="pl-5 text-base font-semibold">3 items</h5>
          </div>

          {/* cart Single Items */}
          <br />
          <div className="w-full border-t border-secColor border-opacity-30">
            {cartData &&
              cartData.map((item, index) => (
                <WishlistSingle key={index} item={item} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
