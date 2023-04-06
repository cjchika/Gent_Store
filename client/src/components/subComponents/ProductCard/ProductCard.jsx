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
      <div className="w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer">
        <div className="flex justify-end"></div>
        <Link to={`/product/${productName}`}>
          <img
            className="w-full h-[170px] object-contain"
            src={item.image_Url[0].url}
            alt="product image"
          />
        </Link>
      </div>
    </>
  );
};

export default ProductCard;
