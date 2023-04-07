import { useState } from "react";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";
import { baseUrl } from "../../../config/api";
import styles from "../../../styles/styles";

const ProductdetailsCard = ({ setOpen, item }) => {
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);

  return (
    <div className="bg-[#fff]">
      {item && (
        <div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-40 flex items-center justify-center">
          <div className="w-[90%] 800px:w-[80%] lg:w-[60%] overflow-y-scroll md:overflow-y-hidden  h-[90vh] md:h-auto  p-6 bg-white rounded-md shadow-sm relative">
            <RxCross1
              size={18}
              className="absolute right-3 top-3 z-50 text-deepSecColor"
              onClick={() => setOpen(false)}
            />

            <div className="block w-full 800px:flex">
              <div className="w-full 800px:w-[50%]">
                <img
                  className="mx-auto"
                  src={`${item.image_Url[0].url}`}
                  alt=""
                />
                <div className="flex">
                  <Link to={`/shop/preview/${item.shop._id}`} className="flex">
                    <img
                      src={`${item.shop.shop_avatar.url}`}
                      alt=""
                      className="w-[50px] h-[50px] rounded-full mr-2 object-cover"
                    />
                    <div>
                      <h3
                        className={`${styles.shop_name} text-deepSecColor font-semibold`}
                      >
                        {item.shop.name}
                      </h3>
                      <h5 className="pb-3 text-[15px] text-deepSecColor">
                        (4.5) Ratings
                      </h5>
                    </div>
                  </Link>
                </div>
              </div>

              <div className="w-full 800px:w-[50%] pt-5 pl-[5px] pr-[5px]">
                <h1
                  className={`${styles.productTitle} text-base text-deepSecColor capitalize`}
                >
                  {item.name}
                </h1>
                <p className="text-secColor text-justify text-xs text-opacity-90 pt-4">
                  {item.description}
                </p>

                <div className="flex pt-3">
                  <h4
                    className={`${styles.productDiscountPrice} text-priColor text-xl font-bold`}
                  >
                    ${item.discountPrice}
                  </h4>
                  <h3 className={`${styles.price} text-sm`}>
                    {item.originalPrice && "$" + item.originalPrice}
                  </h3>
                </div>
                <div className="flex items-center mt-7 justify-between pr-3">
                  <div>
                    {click ? (
                      <AiFillHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={() => setClick(!click)}
                        color={click ? "red" : "#0b2a3f"}
                        title="Remove from wishlist"
                      />
                    ) : (
                      <AiOutlineHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={() => setClick(!click)}
                        color={click ? "red" : "#0b2a3f"}
                        title="Add to wishlist"
                      />
                    )}
                  </div>
                  <div>
                    <button
                      className="bg-secColor  text-white font-bold rounded-l p-1 px-3 shadow-lg hover:bg-deepSecColor transition duration-300 ease-in-out"
                      onClick={() => setCount(count - 1)}
                    >
                      -
                    </button>
                    <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[11px] text-secColor">
                      {count}
                    </span>
                    <button
                      className="bg-secColor  text-white font-bold rounded-r p-1 px-3 shadow-lg hover:bg-deepSecColor transition duration-300 ease-in-out"
                      onClick={() => setCount(count + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  className={`w-full justify-center flex ml-auto items-center p-2 px-3 bg-secColor hover:bg-deepSecColor mt-6 rounded-md  text-white`}
                >
                  <span>Add To Cart</span>{" "}
                  <AiOutlineShoppingCart size={20} className="ml-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductdetailsCard;
