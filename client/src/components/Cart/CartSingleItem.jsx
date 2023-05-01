import { useState } from "react";
import styles from "../../styles/styles";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { baseUrl } from "../../config/api";
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const CartSingleItem = ({
  item,
  quantityChangeHandler,
  removeCartItemHandler,
}) => {
  const [value, setValue] = useState(item.qty);
  const totalPrice = item.discountPrice * value;

  const incrementCartItem = (item) => {
    if (item.stock < value) {
      toast.error("Product out of stock!");
    } else {
      setValue(value + 1);
      const updateCartData = { ...item, qty: value + 1 };
      quantityChangeHandler(updateCartData);
    }
  };

  const decrementCartItem = (item) => {
    setValue(value === 1 ? 1 : value - 1);
    const updateCartData = { ...item, qty: value === 1 ? 1 : value - 1 };
    quantityChangeHandler(updateCartData);
  };

  return (
    <div className="border-b p-4 border-secColor border-opacity-30">
      <div className="w-full flex items-center">
        <div className="flex flex-col justify-center items-center">
          <div
            className={`bg-[#e44343] rounded-full w-[20px] h-[20px]   ${styles.normalFlex} justify-center cursor-pointer`}
            onClick={() => incrementCartItem(item)}
          >
            <HiPlus size={14} color="#fff" />
          </div>
          <span className="text-secColor font-semibold">{value}</span>
          <div
            className={`bg-priColor rounded-full w-[20px] h-[20px]   ${styles.normalFlex} justify-center cursor-pointer`}
            onClick={() => decrementCartItem(item)}
          >
            <HiOutlineMinus size={14} color="#fff" />
          </div>
        </div>
        <img
          className="w-[80px] h-80px] ml-2"
          src={`${baseUrl}${item?.images[0]}`}
          alt="product"
        />
        <div className="pl-[5px]">
          <h1 className="text-[10px] md:text-sm">{item.name}</h1>
          <h4 className="font-[400] text-[15px] text-[#00000082]">
            {item.discountPrice} x {value}{" "}
          </h4>
          <h4 className="font-[600] text-sm pt-[3px] text-priColor font-Roboto">
            USD ${totalPrice}
          </h4>
        </div>
        <RxCross1
          onClick={() => removeCartItemHandler(item)}
          size={25}
          className="cursor-pointer text-[#e44343]"
        />
      </div>
    </div>
  );
};

export default CartSingleItem;
