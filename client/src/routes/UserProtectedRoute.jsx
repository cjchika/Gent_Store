import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { isLoadingUser, isUserAuthenticated } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (isLoadingUser === false) {
      if (isUserAuthenticated === false) {
        return navigate("/login");
      }
    }
  }, [isUserAuthenticated, isLoadingUser]);

  return children;
};

export default UserProtectedRoute;
