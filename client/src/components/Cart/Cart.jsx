import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { useSelector, useDispatch } from "react-redux";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import CartSingleItem from "./CartSingleItem";
import { removeFromCart, addToCart } from "../../redux/actions/cart.js";

const Cart = ({ setOpenCart }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const removeCartItemHandler = (item) => {
    dispatch(removeFromCart(item));
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0
  );

  const quantityChangeHandler = (item) => {
    dispatch(addToCart(item));
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
      <div className="fixed top-0 right-0 min-h-full w-[60%] md:w-[40%] lg:w-[25%] bg-white flex flex-col justify-between shadow-sm">
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
            <h5 className="pl-5 text-base font-semibold">
              {cart?.length} Items
            </h5>
          </div>
          {/* Single Item */}
          <br />
          <div className="w-full border-t border-secColor border-opacity-30">
            {cart &&
              cart.map((item, index) => (
                <CartSingleItem
                  key={index}
                  item={item}
                  quantityChangeHandler={quantityChangeHandler}
                  removeCartItemHandler={removeCartItemHandler}
                />
              ))}
            {cart?.length === 0 && (
              <div className="p-5 text-center text-secColor">
                <h1 className="text-lg font-medium">
                  Cart is empty! <br />{" "}
                  <span className="text-sm">Start adding to cart.</span>
                </h1>
              </div>
            )}
          </div>
        </div>

        <div className="px-5 mb-3">
          <Link to="/checkout">
            <button
              disabled={totalPrice === 0}
              className={`text-sm py-3 text-white flex items-center justify-center w-[100%] hover:bg-deepSecColor bg-secColor rounded-xl`}
            >
              Checkout (USD ${totalPrice})
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
