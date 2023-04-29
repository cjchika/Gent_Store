import React from "react";
import styles from "../../styles/styles";

const CartContent = ({
  handleSubmit,
  totalPrice,
  shipping,
  subTotalPrice,
  couponCode,
  setCouponCode,
  discountPercentage,
  isPayment,
}) => {
  return (
    <div className="w-full bg-white rounded-lg p-5 pb-8">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-[#000000a4]">Subtotal:</h3>
        <h5 className="text-lg font-semibold text-secColor">
          ${subTotalPrice}
        </h5>
      </div>
      <br />
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-[#000000a4]">Shipping:</h3>
        <h5 className="text-lg font-semibold text-secColor">
          {shipping?.toFixed(2)}
        </h5>
      </div>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-[#000000a4]">Discount:</h3>
        <h5 className="text-lg font-semibold text-secColor">
          - {discountPercentage ? "$" + discountPercentage.toString() : null}
        </h5>
      </div>
      <h5 className="text-lg font-semibold text-end pt-5 text-secColor">
        ${totalPrice}
      </h5>
      <br />
      {!isPayment && (
        <form onSubmit={handleSubmit}>
          <input
            value={couponCode}
            type="text"
            className={`${styles.input} rounded-lg h-[40px] pl-2 border-secColor focus:border-priColor`}
            placeholder="Coupon Code"
            required
            onChange={(e) => setCouponCode(e.target.value)}
          />
          <button
            type="submit"
            className={`w-full h-[40px] border border-priColor text-center text-priColor rounded-lg mt-8`}
          >
            Apply Coupon
          </button>
        </form>
      )}
    </div>
  );
};

export default CartContent;
