import { useEffect } from "react";
import ShopLogin from "../components/Shop/ShopLogin";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ShopLoginPage = () => {
  const { seller, isSellerAuthenticated } = useSelector(
    (state) => state.seller
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (isSellerAuthenticated) {
      return navigate(`/dashboard`);
    }
  }, [isSellerAuthenticated]);

  return (
    <div>
      <ShopLogin />{" "}
    </div>
  );
};

export default ShopLoginPage;
