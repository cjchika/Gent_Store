import { useState } from "react";
import styles from "../../styles/styles";
import { HiOutlineMinus } from "react-icons/hi";
import { RxCross1 } from "react-icons/rx";

const CartSingleItem = ({ item }) => {
  const [value, setValue] = useState(1);
  const totalPrice = item.price * value;

  return (
    <div className="border-b p-4 border-secColor border-opacity-30">
      <div className="w-full flex items-center">
        <div>
          <div
            className={`bg-secColor text-white border rounded-full  ${styles.normalFlex} justify-center cursor-pointer`}
            onClick={() => setValue(value === 1 ? 1 : value - 1)}
          >
            <HiOutlineMinus size={14} />
          </div>
        </div>
        <img
          className="w-[80px] h-80px] ml-2"
          src="https://bonik-react.vercel.app/assets/images/products/Fashion/Clothes/1.SilverHighNeckSweater.png"
          alt="product"
        />
        <div className="pl-[5px]">
          <h1 className="text-sm">{item.name}</h1>
          <h4 className="font-[400] text-[15px] text-[#00000082]">
            {item.price} * {value}{" "}
          </h4>
          <h4 className="font-[600] text-sm pt-[3px] text-priColor font-Roboto">
            USD ${totalPrice}
          </h4>
        </div>
        <RxCross1 className="cursor-pointer" />
      </div>
    </div>
  );
};

export default CartSingleItem;
