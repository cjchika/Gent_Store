import { useEffect } from "react";
import Login from "../components/Login/Login.jsx";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const LoginPage = () => {
  const navigate = useNavigate();
  const { isUserAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (isUserAuthenticated === true) navigate("/");
  }, [isUserAuthenticated]);

  return (
    <>
      <Login />
    </>
  );
};

export default LoginPage;
