import { useState } from "react";
import styles from "../../styles/styles";
import couponApi from "../../config/services/coupon";
// import { apiUrl } from "../../config/api";
import { useNavigate } from "react-router-dom";
import { Country, State } from "country-state-city";
import CartContent from "./CartContent";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Checkout = () => {
  const { user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [userInfo, setUserInfo] = useState(false);
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [zipCode, setZipCode] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [couponCodeData, setCouponCodeData] = useState(null);
  const [discountPrice, setDiscountPrice] = useState(null);
  const navigate = useNavigate();

  const subTotalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0
  );

  // SHIPPING COST
  const shipping = subTotalPrice * 0.1;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = couponCode;

    const { response, error } = await couponApi.getCouponCodeByName(name);
    // console.log(response);

    if (response) {
      const shopId = response.couponCode?.shopId;
      const couponCodeValue = response.couponCode?.value;
      if (response.couponCode !== null) {
        const validCoupon = cart?.filter((item) => item.shopId === shopId);
        if (validCoupon.length === 0) {
          toast.error("Coupon code is not valid for this shop");
          setCouponCode("");
        } else {
          const normalPrice = validCoupon.reduce(
            (acc, item) => acc + item.qty * item.discountPrice,
            0
          );
          const discountPrice = (normalPrice * couponCodeValue) / 100;
          setDiscountPrice(discountPrice);
          setCouponCodeData(response.couponCode);
          setCouponCode("");
        }
      }
    }

    if (error || response.couponCode === null) {
      toast.error("Coupon code doesn't exists!");
      setCouponCode("");
    }
  };

  const discountPercentage = couponCodeData ? discountPrice : "";

  const totalPrice = couponCodeData
    ? (subTotalPrice + shipping - discountPercentage).toFixed(2)
    : (subTotalPrice + shipping).toFixed(2);

  console.log(discountPercentage);

  const paymentSubmit = () => {
    if (
      address1 === "" ||
      address2 === "" ||
      zipCode === null ||
      country === "" ||
      city === ""
    ) {
      toast.error("Please choose your delivery address!");
    } else {
      const shippingAddress = {
        address1,
        address2,
        zipCode,
        country,
        city,
      };

      const orderData = {
        cart,
        totalPrice,
        subTotalPrice,
        shipping,
        discountPrice,
        shippingAddress,
        user,
      };

      // update local storage with the updated orders array
      localStorage.setItem("latestOrder", JSON.stringify(orderData));
      navigate("/payment");
    }
  };

  return (
    <div className="w-fll flex flex-col items-center py-8">
      <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
        <div className="w-full 800px:w-[65%]">
          <ShippingInfo
            user={user}
            country={country}
            setCountry={setCountry}
            city={city}
            setCity={setCity}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            address1={address1}
            setAddress1={setAddress1}
            address2={address2}
            setAddress2={setAddress2}
            zipCode={zipCode}
            setZipCode={setZipCode}
          />
        </div>
        <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
          <CartContent
            handleSubmit={handleSubmit}
            totalPrice={totalPrice}
            shipping={shipping}
            subTotalPrice={subTotalPrice}
            couponCode={couponCode}
            setCouponCode={setCouponCode}
            discountPercentage={discountPercentage}
          />
        </div>
      </div>
      <button
        onClick={paymentSubmit}
        className="text-white bg-secColor hover:bg-deepSecColor rounded-lg p-3 px-4 mt-10"
      >
        Continue to Payment
      </button>
    </div>
  );
};

export default Checkout;

const ShippingInfo = ({
  user,
  country,
  setCountry,
  city,
  setCity,
  userInfo,
  setUserInfo,
  address1,
  setAddress1,
  address2,
  setAddress2,
  zipCode,
  setZipCode,
}) => {
  // const [country, setCountry] = useState("");

  return (
    <div className="w-full 800px:w-[95%] bg-white rounded-md p-5 pb-8">
      <h5 className="text-xl font-semibold text-secColor">Shipping Address</h5>
      <br />
      <form>
        <div className="w-full flex items-center pb-3">
          <div className="w-[50%]">
            <label htmlFor="name" className="block pb-2 text-secColor">
              Full Name
            </label>
            <input
              type="name"
              placeholder="Name"
              value={user?.name}
              required
              className={`p-2 px-3 rounded-xl !w-[95%] border border-secColor focus:border-priColor`}
            />
          </div>

          <div className="w-[50%]">
            <label htmlFor="email" className="block pb-2 text-secColor">
              Email
            </label>
            <input
              type="email"
              value={user?.email}
              placeholder="Email address"
              required
              className={`p-2 px-3 rounded-xl !w-[95%] border border-secColor focus:border-priColor`}
            />
          </div>
        </div>

        {/* No2  */}
        <div className="w-full flex items-center pb-3">
          <div className="w-[50%]">
            <label htmlFor="number" className="block pb-2 text-secColor">
              Phone Number
            </label>
            <input
              value={user?.phoneNumber}
              type="number"
              placeholder="Phone number"
              required
              className={`p-2 px-3 rounded-xl !w-[95%] border border-secColor focus:border-priColor`}
            />
          </div>

          <div className="w-[50%]">
            <label htmlFor="zipcode" className="block pb-2 text-secColor">
              Zip Code
            </label>
            <input
              type="number"
              placeholder="Zip Code"
              value={zipCode}
              required
              className={`p-2 px-3 rounded-xl !w-[95%] border border-secColor focus:border-priColor`}
            />
          </div>
        </div>

        {/* No3  */}
        <div className="w-full flex items-center pb-3">
          <div className="w-[50%]">
            <label htmlFor="country" className="block pb-2 text-secColor">
              Country
            </label>
            <select
              className="p-2 px-3 rounded-xl w-[95%]  border border-secColor h-[40px] text-secColor"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option className="block pb-2 text-secColor" value="">
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
            <label htmlFor="country" className="block pb-2 text-secColor">
              State
            </label>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="p-2 px-3 rounded-xl w-[95%]  border border-secColor h-[40px] text-secColor"
            >
              <option className="block pb-2 text-secColor" value="">
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
            <label htmlFor="address" className="block pb-2 text-secColor">
              Address 1
            </label>
            <input
              type="address"
              placeholder="Address 1"
              value={address1}
              required
              className={`p-2 px-3 rounded-xl !w-[95%]  border border-secColor focus:border-priColor`}
            />
          </div>
          <div className="w-[50%]">
            <label className="block pb-2 text-secColor">Address 2</label>
            <input
              placeholder="Address 2"
              value={address2}
              type="address"
              required
              className={`p-2 px-3 rounded-xl !w-[95%] border border-secColor focus:border-priColor`}
            />
          </div>
        </div>
      </form>

      <h5
        className="text-lg text-white p-2 rounded-xl cursor-pointer inline-block mt-3 bg-secColor"
        onClick={() => setUserInfo(!userInfo)}
      >
        Choose from saved address
      </h5>
      {userInfo && (
        <div>
          {user &&
            user.addresses.map((item, index) => (
              <div className="w-full flex mt-1">
                <input
                  type="checkbox"
                  className="mr-3 "
                  value={item.addressType}
                  onClick={() =>
                    setAddress1(item.address1) ||
                    setAddress2(item.address2) ||
                    setZipCode(item.zipCode) ||
                    setCountry(item.country) ||
                    setCity(item.city)
                  }
                />
                <h2 className="text-secColor">{item.addressType}</h2>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};
