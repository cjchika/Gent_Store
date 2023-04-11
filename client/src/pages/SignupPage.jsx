import { useEffect } from "react";
import Signup from "../components/Signup/Signup";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const SignupPage = () => {
  const navigate = useNavigate();
  const { isUserAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (isUserAuthenticated === true) navigate("/");
  }, [isUserAuthenticated]);

  return (
    <>
      <Signup />
    </>
  );
};

export default SignupPage;
