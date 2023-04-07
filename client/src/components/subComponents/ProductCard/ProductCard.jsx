import { useState } from "react";
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";

const ProductCard = ({ item }) => {
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);

  const p = item.name;
  const productName = p.replace(/\s+/g, "-");

  return (
    <>
      <div className="w-full h-[350px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer">
        <div className="flex justify-end"></div>
        <Link to={`/product/${productName}`}>
          <img
            className="w-full h-[170px] object-contain"
            src={item.image_Url[0].url}
            alt="product image"
          />
        </Link>
        <Link to="/">
          <h5 className={`${styles.shop_name} text-secColor`}>
            {item.shop.name}
          </h5>
        </Link>
        <Link to="/">
          <h4>
            {item.name.length > 40 ? item.name.slice(0, 40) + "..." : item.name}
          </h4>

          <div className="flex">
            <AiFillStar
              className="mr-2 cursor-pointer"
              size={15}
              color="#F6BA00"
            />
            <AiFillStar
              className="mr-2 cursor-pointer"
              size={15}
              color="#F6BA00"
            />
            <AiFillStar
              className="mr-2 cursor-pointer"
              size={15}
              color="#F6BA00"
            />
            <AiFillStar
              className="mr-2 cursor-pointer"
              color="#F6BA00"
              size={15}
            />
            <AiOutlineStar
              size={15}
              className="mr-2 cursor-pointer"
              color="#F6BA00"
            />
          </div>
          <div className="py-2 flex items-center justify-between">
            <div className="flex">
              <h5 className={`${styles.productDiscountPrice}`}>
                {item.originalPrice === 0
                  ? item.originalPrice
                  : item.discountPrice}
                $
              </h5>
              <h4 className={`${styles.price}`}>
                {item.originalPrice ? item.originalPrice + " $" : null}
              </h4>
            </div>
            <span className="font-[400] text-[17px] text-[#68d284]">
              50 sold
            </span>
          </div>
        </Link>

        {/* side options */}
        <div>
          {click ? (
            <AiFillHeart
              size={20}
              className="cursor-pointer absolute right-2 top-5"
              onClick={() => setClick(!click)}
              color={click ? "red" : "#0b2a3f"}
              title="Remove from wishlist"
            />
          ) : (
            <AiOutlineHeart
              size={20}
              className="cursor-pointer absolute right-2 top-5"
              onClick={() => setClick(!click)}
              color={click ? "red" : "#0b2a3f"}
              title="Add to wishlist"
            />
          )}
          <AiOutlineEye
            size={20}
            className="cursor-pointer absolute right-2 top-14"
            onClick={() => setOpen(!open)}
            color="#0b2a3f"
            title="Quick view"
          />
          <AiOutlineShoppingCart
            size={20}
            className="cursor-pointer absolute right-2 top-24"
            onClick={() => setOpen(!open)}
            color="#0b2a3f"
            title="Add to cart"
          />
          {/* {
                open ? (
                    <ProductDetailsCard setOpen={setOpen} data={data} />
                ) : null
               } */}
        </div>
      </div>
    </>
  );
};

export default ProductCard;
