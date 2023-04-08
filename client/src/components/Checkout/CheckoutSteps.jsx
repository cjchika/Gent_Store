import React from "react";
import styles from "../../styles/styles";

const CheckoutSteps = ({ active }) => {
  return (
    <div className="w-full flex justify-center mx-auto">
      <div className="w-[90%] 800px:w-[80%] flex justify-center items-center flex-wrap">
        <div className={`${styles.normalFlex}`}>
          <div className={`${styles.cart_button} !bg-priColor`}>
            <span className={`${styles.cart_button_text}`}>1. Shipping</span>
          </div>
          <div
            className={`${
              active > 1
                ? "w-[30px] 800px:w-[70px] h-[4px] !bg-priColor"
                : "w-[30px] 800px:w-[70px] h-[4px] !bg-[#05af6e] !bg-opacity-10"
            }`}
          />
        </div>

        {/* No2 */}
        <div className={`${styles.normalFlex}`}>
          <div
            className={`${
              active > 2
                ? `${styles.cart_button} !bg-priColor`
                : `${styles.cart_button} !bg-[#05af6e] !bg-opacity-10`
            }`}
          >
            <span
              className={`${
                active > 2
                  ? `${styles.cart_button_text}`
                  : `${styles.cart_button_text} !text-priColor`
              }`}
            >
              2. Payment
            </span>
          </div>
        </div>
        {/* No3 */}
        <div className={`${styles.normalFlex}`}>
          <div
            className={`${
              active > 3
                ? "w-[30px] 800px:w-[70px] h-[4px] !bg-priColor"
                : "w-[30px] 800px:w-[70px] h-[4px] !bg-[#05af6e] !bg-opacity-10"
            }`}
          />
          <div
            className={`${
              active > 3
                ? `${styles.cart_button} !bg-priColor`
                : `${styles.cart_button} !bg-[#05af6e] !bg-opacity-10`
            }`}
          >
            <span
              className={`${
                active > 3
                  ? `${styles.cart_button_text} `
                  : `${styles.cart_button_text} !text-priColor`
              }`}
            >
              3. Success
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSteps;
