import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axios from "axios";
import { RxAvatar } from "react-icons/rx";
import { Link } from "react-router-dom";
import styles from "../../styles/styles";
import { apiUrl } from "../../config/api";
import { toast } from "react-toastify";
import Logo from "../Layout/Logo";

const ShopCreate = () => {
  const [shopName, setShopName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const config = {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    };

    const newForm = new FormData();

    newForm.append("name", shopName);
    newForm.append("email", email);
    newForm.append("password", password);
    newForm.append("avatar", avatar);
    newForm.append("phoneNumber", phoneNumber);
    newForm.append("zipCode", zipCode);
    newForm.append("address", address);

    await axios
      .post(`${apiUrl}seller/createShop`, newForm, config)
      .then((res) => {
        toast.success(res.data.message, {
          toastId: "success6a",
        });
        setShopName("");
        setEmail("");
        setPassword("");
        setAvatar();
        setAddress("");
        setZipCode("");
        setPhoneNumber("");
      })
      .catch((error) => {
        toast.error(error.response.data.message, {
          toastId: "error6a",
        });
      });
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Logo align="auto" path={"/"} />
        <h2 className="text-priColor mt-6 text-center text-xl font-semibold text-gray-900">
          Register as a seller.
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Shop Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-secColor"
              >
                Shop Name
              </label>
              <div className="mt-1">
                <input
                  type="name"
                  name="name"
                  required
                  autoComplete="name"
                  value={shopName}
                  onChange={(e) => setShopName(e.target.value)}
                  className="appearance-none black w-full p-3 border border-[#d1d5db] rounded-md shadow-md placeholder-[#9ca3af] focus:outline-none focus:border-[#3b82f6] sm:text-sm"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-secColor"
              >
                Phone Number
              </label>
              <div className="mt-1">
                <input
                  type="tel"
                  name="phoneNumber"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="appearance-none black w-full p-3 border border-[#d1d5db] rounded-md shadow-md placeholder-[#9ca3af] focus:outline-none focus:border-[#3b82f6] sm:text-sm"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-secColor"
              >
                Email Address
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none black w-full p-3 border border-[#d1d5db] rounded-md shadow-md placeholder-[#9ca3af] focus:outline-none focus:border-[#3b82f6] sm:text-sm"
                />
              </div>
            </div>

            {/* Shop Address */}
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-secColor"
              >
                Address
              </label>
              <div className="mt-1">
                <input
                  type="address"
                  name="address"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="appearance-none black w-full p-3 border border-[#d1d5db] rounded-md shadow-md placeholder-[#9ca3af] focus:outline-none focus:border-[#3b82f6] sm:text-sm"
                />
              </div>
            </div>

            {/* Zip Code */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-secColor"
              >
                Zip Code
              </label>
              <div className="mt-1">
                <input
                  type="zipcode"
                  name="zipCode"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  className="appearance-none black w-full p-3 border border-[#d1d5db] rounded-md shadow-md placeholder-[#9ca3af] focus:outline-none focus:border-[#3b82f6] sm:text-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-secColor"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  type={visible ? "text" : "password"}
                  name="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none black w-full p-3 border border-[#d1d5db] rounded-md shadow-md placeholder-[#9ca3af] focus:outline-none focus:border-[#3b82f6] sm:text-sm"
                />
                {visible ? (
                  <AiOutlineEye
                    className="absolute right-2 top-3 cursor-pointer"
                    size={20}
                    onClick={() => setVisible(false)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className="absolute right-2 top-3 cursor-pointer"
                    size={20}
                    onClick={() => setVisible(true)}
                  />
                )}
              </div>
            </div>

            {/* File Upload */}
            <div>
              <label
                htmlFor="avatar"
                className="block text-sm font-medium text-priColor"
              ></label>
              <div className="mt-2 flex items-center">
                <span className="inline-block h-8 w-8 rounded-full overflow-hidden">
                  {avatar ? (
                    <img
                      src={URL.createObjectURL(avatar)}
                      alt="avatar"
                      className="h-full w-full object-cover rounded-full"
                    />
                  ) : (
                    <RxAvatar className="h-8 w-8 text-secColor" />
                  )}
                </span>
                <label
                  htmlFor="file-input"
                  className="cursor-pointer ml-5 flex items-center justify-center px-4 py-2 border border-faintColor rounded-md shadow-sm text-sm font-medium text-priColor bg-white hover:bg-faintColor"
                >
                  <span>Upload photo</span>
                  <input
                    type="file"
                    name="avatar"
                    id="file-input"
                    accept=".jpg, .jpeg, .png"
                    onChange={handleFileChange}
                    className="sr-only"
                  />
                </label>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-priColor hover:bg-litePriColor"
              >
                {isLoading ? "Please wait..." : "Submit"}
              </button>
            </div>
            <div className={`${styles.normalFlex} gap-3 w-full`}>
              <h4 className="text-secColor">Already have a seller account?</h4>
              <Link
                to="/seller-login"
                className="text-priColor hover:text-litePriColor"
              >
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShopCreate;
