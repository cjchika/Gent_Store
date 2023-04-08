import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import Lottie from "react-lottie";
import animationData from "../assets/animations/107043-success.json";

const OrderSuccessPage = () => {
  return (
    <div>
      <Header />
      <Success />
      <Footer />
    </div>
  );
};

export default OrderSuccessPage;

const Success = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div>
      <Lottie options={defaultOptions} width={300} height={300} />
      <h5 className="text-center mb-8 text-xl text-priColor">
        Your order was successful.
      </h5>
      <br />
      <br />
    </div>
  );
};
