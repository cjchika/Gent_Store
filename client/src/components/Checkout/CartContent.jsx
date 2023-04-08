import React from "react";
import styles from "../../styles/styles";

const CartContent = () => {
  return (
    <div className="w-full bg-white rounded-lg p-5 pb-8">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-[#000000a4]">Subtotal:</h3>
        <h5 className="text-lg font-semibold text-secColor">$2500.50</h5>
      </div>
      <br />
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-[#000000a4]">Shipping:</h3>
        <h5 className="text-lg font-semibold text-secColor">-</h5>
      </div>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-[#000000a4]">Discount:</h3>
        <h5 className="text-lg font-semibold text-secColor">-</h5>
      </div>
      <h5 className="text-lg font-semibold text-end pt-5 text-secColor">
        $2500.00
      </h5>
      <br />
      <form>
        <input
          type="text"
          className={`${styles.input} rounded-lg h-[40px] pl-2 border-secColor focus:border-priColor`}
          placeholder="Coupon Code"
          required
        />
        <button
          type="submit"
          className={`w-full h-[40px] border border-priColor text-center text-priColor rounded-lg mt-8`}
        >
          Apply Coupon
        </button>
      </form>
    </div>
  );
};

export default CartContent;
