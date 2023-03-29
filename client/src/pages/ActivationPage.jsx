import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { apiUrl } from "../config/api";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ActivationPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { activationCode } = useParams();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (activationCode) {
      const sendRequest = async () => {
        setIsLoading(true);
        await axios
          .get(`${apiUrl}/user/activation/${activationCode}`)
          .then((res) => {
            console.log(res.data);
            toast.success(res.data.message);
          })
          .catch((err) => {
            setError(true);
            toast.error(err.response.data.message);
          });
        setIsLoading(false);
      };
      sendRequest();
    }
  }, [activationCode]);

  console.log(isLoading);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {error ? (
        <p>Your token is expired!</p>
      ) : (
        <div className="text-center">
          <p className="mb-5 text-lg">Your account has been verified!</p>
          <Link
            className="bg-primaryColor hover:bg-deepColor p-3 px-5 rounded-md text-white"
            to={"/login"}
          >
            {" "}
            Please Login{" "}
          </Link>
        </div>
      )}
    </div>
  );
};

export default ActivationPage;
