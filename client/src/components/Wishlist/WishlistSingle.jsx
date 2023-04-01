import { useState } from "react";
import { BsCartPlus } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";

const WishlistSingle = ({ item }) => {
  const [value, setValue] = useState(1);
  const totalPrice = item.price * value;

  return (
    <div className="border-b p-4 border-secColor border-opacity-30">
      <div className="w-full flex items-center">
        <RxCross1 size={20} className="cursor-pointer" />
        <img
          src="https://bonik-react.vercel.app/assets/images/products/Fashion/Clothes/1.SilverHighNeckSweater.png"
          alt=""
          className="w-[80px] h-[80px] ml-1"
        />

        <div className="pl-[5px]">
          <h1 className="text-sm mb-2">{item.name}</h1>
          <h4 className="font-[600] text-sm pt-[3px] text-priColor font-Roboto">
            USD ${totalPrice}
          </h4>
        </div>
        <div>
          <BsCartPlus
            size={20}
            className="cursor-pointer text-secColor"
            tile="Add to cart"
          />
        </div>
      </div>
    </div>
  );
};

export default WishlistSingle;
