import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { apiUrl } from "../config/api";
import { Link } from "react-router-dom";

const ActivationPage = () => {
  const { activationCode } = useParams();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (activationCode) {
      const sendRequest = async () => {
        await axios
          .get(`${apiUrl}/user/activation/${activationCode}`)
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            setError(true);
          });
      };
      sendRequest();
    }
  }, []);

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
          <p>Your account has been verified!</p>
          <Link to={"/login"}> Please Login </Link>
        </div>
      )}
    </div>
  );
};

export default ActivationPage;
