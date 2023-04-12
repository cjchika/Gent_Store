import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllShopProducts } from "../../redux/actions/product";

const ShopProducts = () => {
  const dispatch = useDispatch();
  const { products, isLoadingProduct } = useSelector((state) => state.products);
  const { seller } = useSelector((state) => state.seller);

  useEffect(() => {
    dispatch(getAllShopProducts(seller._id));
  }, [dispatch]);

  console.log(products);

  return <div>ShopProducts</div>;
};

export default ShopProducts;
