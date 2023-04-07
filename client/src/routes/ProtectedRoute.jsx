import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { loading, isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading === false) {
      if (isAuthenticated === false) {
        return navigate("/login");
      }
    }
  }, [isAuthenticated, loading]);

  return children;
};

export default ProtectedRoute;
