import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import Lottie from "react-lottie";
import CheckoutSteps from "../components/Checkout/CheckoutSteps";
import animationData from "../assets/animations/107043-success.json";

const OrderSuccessPage = () => {
  return (
    <div>
      <Header />
      {/* <CheckoutSteps active={4} /> */}
      <Success />
      <Footer />
    </div>
  );
};

export default OrderSuccessPage;

const Success = () => {
  const defaultOptions = {
    loop: false,
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
