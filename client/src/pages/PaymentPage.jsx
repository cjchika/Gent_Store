import React from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import Payment from "../components/Payment/Payment";
import CheckoutSteps from "../components/Checkout/CheckoutSteps";

const PaymentPage = () => {
  return (
    <div>
      <Header />
      <br />
      <br />
      <CheckoutSteps active={3} />
      <Payment />
      <br />
      <br />
      <Footer />
    </div>
  );
};

export default PaymentPage;
