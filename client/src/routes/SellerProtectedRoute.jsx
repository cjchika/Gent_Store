import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SellerProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { isLoadingSeller, isSellerAuthenticated } = useSelector(
    (state) => state.seller
  );

  useEffect(() => {
    if (isLoadingSeller === false) {
      if (isSellerAuthenticated === false) {
        return navigate("/login");
      }
    }
  }, [isSellerAuthenticated, isLoadingSeller]);

  return children;
};

export default SellerProtectedRoute;
