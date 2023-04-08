import { useState } from "react";
import styles from "../../styles/styles";
import { useNavigate } from "react-router-dom";
import { Country, State } from "country-state-city";

const Checkout = () => {
  const navigate = useNavigate();
  return (
    <div className="w-fll flex flex-col items-center py-8">
      <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
        <div className="w-full 800px:w-[65%]">
          <ShippingInfo />
        </div>
        <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
          <CartData />
        </div>
      </div>
      <button
        onClick={() => navigate("/payment")}
        className="text-white bg-secColor hover:bg-deepSecColor rounded-lg p-3 px-4 mt-10"
      >
        Continue to Payment
      </button>
    </div>
  );
};

export default Checkout;

const ShippingInfo = () => {
  const [country, setCountry] = useState("");

  return (
    <div className="w-full 800px:w-[95%] bg-white rounded-md p-5 pb-8">
      <h5 className="text-xl font-semibold text-secColor">Shipping Address</h5>
      <br />
      <form>
        <div className="w-full flex items-center pb-3">
          <div className="w-[50%]">
            <label htmlFor="name" className="block pb-2 text-priColor">
              Full Name
            </label>
            <input
              type="name"
              placeholder="Name"
              required
              className={`${styles.input} !w-[95%] border border-secColor focus:border-priColor`}
            />
          </div>

          <div className="w-[50%]">
            <label htmlFor="email" className="block pb-2 text-priColor">
              Email
            </label>
            <input
              type="email"
              placeholder="Email address"
              required
              className={`${styles.input} !w-[95%] border border-secColor focus:border-priColor`}
            />
          </div>
        </div>

        {/* No2  */}
        <div className="w-full flex items-center pb-3">
          <div className="w-[50%]">
            <label htmlFor="number" className="block pb-2 text-priColor">
              Phone Number
            </label>
            <input
              type="number"
              placeholder="Phone number"
              required
              className={`${styles.input} !w-[95%] border border-secColor focus:border-priColor`}
            />
          </div>

          <div className="w-[50%]">
            <label htmlFor="zipcode" className="block pb-2 text-priColor">
              Zip Code
            </label>
            <input
              type="number"
              placeholder="Zip Code"
              required
              className={`${styles.input} !w-[95%] border border-secColor focus:border-priColor`}
            />
          </div>
        </div>

        {/* No3  */}
        <div className="w-full flex items-center pb-3">
          <div className="w-[50%]">
            <label htmlFor="country" className="block pb-2 text-priColor">
              Country
            </label>
            <select
              className="w-[95%] border h-[40px] rounded-lg"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option className="block pb-2 text-priColor" value="">
                Select your country
              </option>
              {Country &&
                Country.getAllCountries().map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>

          <div className="w-[50%]">
            <label htmlFor="country" className="block pb-2 text-priColor">
              State
            </label>
            <select className="w-[95%] border h-[40px] rounded-lg">
              <option className="block pb-2 text-priColor" value="">
                Select your State
              </option>
              {State &&
                State.getStatesOfCountry(country).map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
        </div>

        {/* No4 */}
        <div className="w-full flex pb-3">
          <div className="w-[50%]">
            <label htmlFor="address" className="block pb-2 text-priColor">
              Address 1
            </label>
            <input
              type="address"
              placeholder="Address 1"
              required
              className={`${styles.input} !w-[95%]`}
            />
          </div>
          <div className="w-[50%]">
            <label className="block pb-2 text-priColor">Address 2</label>
            <input
              placeholder="Address 2"
              type="address"
              required
              className={`${styles.input} !w-[95%]`}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

const CartData = () => {
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
        <input
          className={`w-full h-[40px] border border-[#f63b60] text-center text-[#f63b60] rounded-lg mt-8 cursor-pointer`}
          required
          value="Apply code"
          type="submit"
        />
      </form>
    </div>
  );
};
