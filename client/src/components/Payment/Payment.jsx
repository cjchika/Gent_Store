import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import CartContent from "../Checkout/CartContent";

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
          <PaymentInfo />
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

const PaymentInfo = () => {
  const [select, setSelect] = useState(1);
  const navigate = useNavigate();

  const handlePayment = (e) => {
    e.preventDefault();
    navigate("/order/success/fdbxf9848");
  };

  return (
    <div className="w-full 800px:w-[95%] bg-white rounded-lg p-5 pb-8">
      {/* Payment Selection */}
      <div>
        <div className="flex w-full pb-5 border-b border-[#cecccccb] mb-3">
          <button
            onClick={() => setSelect(1)}
            className="w-[25px] h-[25px] rounded-full bg-transparent border-2 border-[#1d1a1ab4] relative flex items-center justify-center"
          >
            {select === 1 && (
              <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
            )}
          </button>
          <h4 className="text-lg pl-3 font-semibold text-[#000000b1]">
            Pay with Debit/Credit Card
          </h4>
        </div>

        {/* Pay with card */}
        {select === 1 && (
          <div className="w-full flex border-b border-[#cecccccb]">
            <form onSubmit={handlePayment}>
              <div className="w-full flex pb-2">
                <div className="w-[50%]">
                  <label className="block pb-2">Card Number</label>
                  <input
                    required
                    className={`${styles.input} !w-[95%] focus:border-priColor`}
                  />
                </div>
                <div className="w-[50%]">
                  <label className="block pb-2">Exp Date</label>
                  <input
                    type="number"
                    required
                    className={`${styles.input} !w-[95%] focus:border-priColor`}
                  />
                </div>
              </div>
              <div className="w-full flex pb-3">
                <div className="w-[50%]">
                  <label className="block pb-2">Name On Card</label>
                  <input
                    required
                    className={`${styles.input} !w-[95%] focus:border-priColor`}
                  />
                </div>
                <div className="w-[50%]">
                  <label className="block pb-2">Billing Address</label>
                  <input
                    type="text"
                    required
                    className={`${styles.input} !w-[95%] focus:border-priColor`}
                  />
                </div>
              </div>
              <button
                type="submit"
                className={`${styles.button} mb-7 !bg-priColor hover:!bg-[#05af6e] text-[#fff] h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
              >
                Submit
              </button>
            </form>
          </div>
        )}
      </div>

      <br />
      {/* paypal payment */}
      <div>
        <div className="flex w-full pb-5 border-b border-[#cecccccb] mb-2">
          <button
            className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
            onClick={() => setSelect(2)}
          >
            {select === 2 && (
              <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
            )}
          </button>
          <h4 className="text-[18px] pl-3 font-[600] text-[#000000b1]">
            Pay with Paypal
          </h4>
        </div>

        {/* pay with card */}
        {select === 2 && (
          <div className="w-full flex border-b border-[#cecccccb]">
            <form className="w-full" onSubmit={handlePayment}>
              <div className="w-full flex pb-3">
                <div className="w-full">
                  <label className="block pb-2">Paypal Email</label>
                  <input
                    required
                    className={`${styles.input} focus:border-priColor`}
                  />
                </div>
              </div>
              <button
                type="submit"
                className={`${styles.button} mb-7 !bg-priColor hover:!bg-[#05af6e] text-[#fff] h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
              >
                Submit
              </button>
            </form>
          </div>
        )}
      </div>

      <br />
      {/* cash on Delivery */}
      <div>
        <div className="flex w-full pb-5 border-b border-[#cecccccb] mb-2">
          <button
            className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
            onClick={() => setSelect(3)}
          >
            {select === 3 && (
              <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
            )}
          </button>
          <h4 className="text-[18px] pl-3 font-[600] text-[#000000b1]">
            Cash on Delivery
          </h4>
        </div>

        {/* pay with card */}
        {select === 3 && (
          <div className="w-full flex">
            <button
              onClick={handlePayment}
              className={`${styles.button} mb-7 !bg-priColor hover:!bg-[#05af6e] text-[#fff] h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
            >
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
