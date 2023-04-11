import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { loading, isUserAuthenticated } = useSelector((state) => state.user);
  // const { loading, isSellerAuthenticated } = useSelector((state) => state.seller);

  useEffect(() => {
    if (loading === false) {
      if (isUserAuthenticated === false) {
        return navigate("/login");
      }
    }
  }, [isUserAuthenticated, loading]);

  return children;
};

export default ProtectedRoute;
