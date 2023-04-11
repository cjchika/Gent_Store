import { useEffect } from "react";
import ShopCreate from "../components/Shop/ShopCreate";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ShopCreatePage = () => {
  const { seller, isSellerAuthenticated } = useSelector(
    (state) => state.seller
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (isSellerAuthenticated) {
      return navigate(`/shop/${seller._id}`);
    }
  }, [isSellerAuthenticated]);

  return (
    <div>
      <ShopCreate />
    </div>
  );
};

export default ShopCreatePage;
