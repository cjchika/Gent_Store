import React from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import Checkout from "../components/Checkout/Checkout";
import CheckoutSteps from "../components/Checkout/CheckoutSteps";

const CheckoutPage = () => {
  return (
    <>
      <Header />
      <br />
      <br />
      <CheckoutSteps active={1} />
      <Checkout />
      <br />
      <br />
      <Footer />
    </>
  );
};

export default CheckoutPage;
