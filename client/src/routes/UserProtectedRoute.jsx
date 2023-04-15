import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Layout/Loader";

const UserProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { isLoadingUser, isUserAuthenticated } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (isUserAuthenticated === false) {
      return navigate("/login");
    }
  }, [isUserAuthenticated]);

  if (isLoadingUser) {
    return <Loader />;
  } else {
    if (!isUserAuthenticated) {
      return navigate("/login");
    }
  }

  return children;
};

export default UserProtectedRoute;
