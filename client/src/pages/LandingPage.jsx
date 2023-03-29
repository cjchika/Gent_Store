import { useState, useEffect } from "react";
import userApi from "../config/services/userAuth.api";
import { toast } from "react-toastify";

const LandingPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getUserInfo = async () => {
      setIsLoading(true);

      const { response, error } = await userApi.getUser();
      setIsLoading(false);

      if (response) {
        console.log(response);
        toast.success("Login Sucecess!", {
          toastId: "success5",
        });
        // navigate("/");
        // window.location.reload(true);
      }

      if (error) {
        toast.error(error.message, {
          toastId: "error4",
        });
        setErrorMessage(error.message);
      }
    };
    getUserInfo();
  }, []);

  return <div>LandingPage</div>;
};

export default LandingPage;
