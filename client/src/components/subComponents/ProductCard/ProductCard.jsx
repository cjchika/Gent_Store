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
  const productName = p.replace;

  return <div>Product Card</div>;
};

export default ProductCard;
