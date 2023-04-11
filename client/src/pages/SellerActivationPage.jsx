import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import shopApi from "../config/services/shop.api";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const SellerActivationPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { activationCode } = useParams();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (activationCode) {
      const sendRequest = async () => {
        setIsLoading(true);

        const { response, error } = await shopApi.activateShop({
          activationCode,
        });
        setIsLoading(false);

        if (response) {
          console.log(response);
          toast.success("Shop verified, please login!", {
            toastId: "success8",
          });
          // navigate("/");
          // window.location.reload(true);
        }
        if (error) {
          toast.error(error.message, {
            toastId: "error8",
          });
          setError(true);
          // setErrorMessage(error.message);
          console.log(error.message);
        }
      };
      sendRequest();
    }
  }, [activationCode]);

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
          <p className="mb-5 text-lg">Your seller account has been verified!</p>
          <Link
            className="bg-priColor hover:bg-litePriColor p-3 px-5 rounded-md text-white"
            to={"/seller-login"}
          >
            {" "}
            Please Login{" "}
          </Link>
        </div>
      )}
    </div>
  );
};

export default SellerActivationPage;
