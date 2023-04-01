import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import CartSingleItem from "./CartSingleItem";

const Cart = ({ setOpenCart }) => {
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
              onClick={() => setOpenCart(false)}
            />
          </div>
          {/* Items */}
          <div className={`${styles.normalFlex} p-2 px-4 text-secColor`}>
            <IoBagHandleOutline size={25} />
            <h5 className="pl-5 text-base font-semibold">3 Items</h5>
          </div>
          {/* Single Item */}
          <br />
          <div className="w-full border-t border-secColor border-opacity-30">
            {cartData &&
              cartData.map((item, index) => (
                <CartSingleItem key={index} item={item} />
              ))}
          </div>
        </div>

        <div className="px-5 mb-3">
          <Link to="/checkout">
            <button
              className={`text-sm py-3 text-white flex items-center justify-center w-[100%] hover:bg-deepSecColor bg-secColor rounded-xl`}
            >
              Checkout (USD $2000){" "}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
