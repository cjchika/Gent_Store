import { useState } from "react";
import { BsCartPlus } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import { baseUrl } from "../../config/api";

const WishlistSingle = ({ item, removeWishlistHandler, addToCartHandler }) => {
  const [value, setValue] = useState(1);
  const totalPrice = item.discountPrice * value;

  return (
    <div className="border-b p-4 border-secColor border-opacity-30">
      <div className="w-full flex items-center">
        <RxCross1
          onClick={() => removeWishlistHandler(item)}
          size={20}
          className="cursor-pointer"
        />
        <img
          src={`${baseUrl}${item?.images[0]}`}
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
            onClick={() => addToCartHandler(item)}
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
