import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import CartContent from "../Checkout/CartContent";
import { PaystackButton } from "react-paystack";
import orderAPi from "../../config/services/order.api";
import { toast } from "react-toastify";

const Payment = () => {
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    const orderData = JSON.parse(localStorage.getItem("latestOrder"));
    setOrderData(orderData);
  }, []);

  const {
    totalPrice,
    subTotalPrice,
    shipping,
    discountPrice: discountPercentage,
  } = orderData;

  return (
    <div className="w-full flex flex-col items-center py-8">
      <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
        <div className="w-full 800px:w-[65%]">
          <PaymentInfo orderData={orderData} />
        </div>
        <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
          <CartContent
            shipping={shipping}
            subTotalPrice={subTotalPrice}
            totalPrice={totalPrice}
            discountPercentage={discountPercentage}
            isPayment={true}
          />
        </div>
      </div>
    </div>
  );
};

export default Payment;

const PaymentInfo = ({ orderData }) => {
  const publicKey = "pk_test_13fbafc9e6edffe0b87eb781313edbb70d080efc";
  const [select, setSelect] = useState(1);
  const navigate = useNavigate();

  const paystackProps = {
    email: orderData?.user?.email,
    amount: orderData?.totalPrice * 2000,
    metadata: {
      name: orderData?.user?.name,
      phone: orderData?.user?.phoneNumber,
    },
    publicKey,
    text: "Pay Now",
    onSuccess: () => handlePayment(),
    onClose: () => navigate("/payment"),
  };

  const handlePayment = async () => {
    const infoId = Math.floor(Math.random() * 100).toString();

    const paymentInfo = {
      id: infoId,
      status: "Successful",
      type: "PayStack",
    };

    const order = {
      cart: orderData?.cart,
      shippingAddress: orderData?.shippingAddress,
      user: orderData?.user,
      totalPrice: orderData?.totalPrice,
      paymentInfo,
    };

    const { response, error } = await orderAPi.createOrder(order);

    // console.log(response);

    if (response) {
      toast.success("Order Successful");
      navigate("/order/success");
      localStorage.setItem("cartItems", JSON.stringify([]));
      localStorage.setItem("latestOrder", JSON.stringify([]));
      window.location.reload();
    }

    if (error) {
      toast.error(error.message);
    }
  };

  const handlePayOnDelivery = async () => {
    const infoId = Math.floor(Math.random() * 100).toString();

    const paymentInfo = {
      id: infoId,
      status: "Successful",
      type: "PayOnDelivery",
    };

    const order = {
      cart: orderData?.cart,
      shippingAddress: orderData?.shippingAddress,
      user: orderData?.user,
      totalPrice: orderData?.totalPrice,
      paymentInfo,
    };

    const { response, error } = await orderAPi.createOrder(order);

    console.log(response);

    if (response) {
      toast.success("Order Successful");
      navigate("/order/success");
      localStorage.setItem("cartItems", JSON.stringify([]));
      localStorage.setItem("latestOrder", JSON.stringify([]));
      window.location.reload();
    }

    if (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full 800px:w-[95%] bg-white rounded-lg p-5 pb-8">
      {/* Payment Selection */}
      <div>
        <div className="flex w-full pb-5 border-b border-[#cecccccb] mb-3">
          <button
            onClick={() => setSelect(1)}
            className="w-[25px] h-[25px] rounded-full bg-transparent border-2 border-secColor relative flex items-center justify-center"
          >
            {select === 1 && (
              <div className="w-[13px] h-[13px] bg-secColor rounded-full" />
            )}
          </button>
          <h4 className="text-lg pl-3 font-semibold text-secColor">
            Instant Payment
          </h4>
        </div>

        {/* Pay with card */}
        {select === 1 && (
          <div className="w-full flex border-b border-[#cecccccb]">
            <div className=" flex p-2 mb-7 bg-priColor hover:!bg-[#05af6e] text-[#fff] rounded-lg px-10 cursor-pointer text-lg font-medium">
              <PaystackButton
                {...paystackProps}
                onSuccess={() => handlePayment()}
              />
            </div>
          </div>
        )}
      </div>
      <br />

      {/* cash on Delivery */}
      <div>
        <div className="flex w-full pb-5 border-b border-[#cecccccb] mb-2">
          <button
            className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-secColor relative flex items-center justify-center"
            onClick={() => setSelect(2)}
          >
            {select === 2 && (
              <div className="w-[13px] h-[13px] bg-secColor rounded-full" />
            )}
          </button>
          <h4 className="text-[18px] pl-3 font-[600] text-secColor">
            Cash on Delivery
          </h4>
        </div>

        {/* pay with card */}
        {select === 2 && (
          <div className="w-full flex">
            <button
              onClick={handlePayOnDelivery}
              className={`${styles.button} mb-7 !bg-priColor hover:!bg-[#05af6e] text-[#fff] h-[45px] rounded-[5px] cursor-pointer text-lg font-medium`}
            >
              Place Order
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
