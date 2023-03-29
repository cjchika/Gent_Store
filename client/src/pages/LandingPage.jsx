import { useState, useEffect } from "react";
import axios from "axios";
import { apiUrl } from "../config/api";
import { toast } from "react-toastify";

const LandingPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getUserInfo = async () => {
      await axios
        .get(`${apiUrl}/user/getUser`)
        .then((res) => {
          toast.success(res.data.message, {
            toastId: "success2",
          });
          console.log(res.data);
          console.log(res.headers);
        })
        .catch((error) => {
          toast.error(error.response.data.message, {
            toastId: "error2",
          });
        });
      setIsLoading(false);
    };
    getUserInfo();
  }, []);

  return <div>LandingPage</div>;
};

export default LandingPage;
