import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Layout/Loader";

const SellerProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { isLoadingSeller, isSellerAuthenticated } = useSelector(
    (state) => state.seller
  );

  useEffect(() => {
    if (isSellerAuthenticated === false) {
      return navigate("/seller-login");
    }
  }, [isSellerAuthenticated]);

  if (isLoadingSeller) {
    return <Loader />;
  } else {
    if (!isSellerAuthenticated) {
      return navigate("/seller-login");
    }
  }
  return children;
};

export default SellerProtectedRoute;
