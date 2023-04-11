import ShopLogin from "../components/Shop/ShopLogin";
import { useSelector } from "react-redux";
import { ShopLandingPage } from "../routes/ShopRoutes";

const ShopLoginPage = () => {
  const { isLoadingSeller, isSellerAuthenticated } = useSelector(
    (state) => state.seller
  );

  return (
    <div>{!isSellerAuthenticated ? <ShopLogin /> : <ShopLandingPage />}</div>
  );
};

export default ShopLoginPage;
