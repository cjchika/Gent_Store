import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  LoginPage,
  SignupPage,
  ActivationPage,
  LandingPage,
  ProductsPage,
  BestSellingPage,
  FAQPage,
  CheckoutPage,
  PaymentPage,
  OrderSuccessPage,
  ProfilePage,
  ProductDetailsPage,
} from "./routes/UserRoutes.js";
import {
  ShopCreatePage,
  ShopLoginPage,
  ShopActivationPage,
  ShopLandingPage,
} from "./routes/ShopRoutes.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import store from "./redux/store.js";
import { getUser } from "./redux/actions/user.js";
import { getSeller } from "./redux/actions/seller.js";
import { useSelector } from "react-redux";
import UserProtectedRoute from "./routes/UserProtectedRoute.jsx";
import SellerProtectedRoute from "./routes/SellerProtectedRoute.jsx";

const App = () => {
  const { user } = useSelector((state) => state.user);
  const { seller } = useSelector((state) => state.seller);
  // console.log(user);
  // console.log(seller);

  useEffect(() => {
    store.dispatch(getUser());
    store.dispatch(getSeller());
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* USER ROUTES */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/activation/:activationCode"
          element={<ActivationPage />}
        />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product/:name" element={<ProductDetailsPage />} />
        <Route path="/best-selling" element={<BestSellingPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route
          path="/checkout"
          element={
            <UserProtectedRoute>
              <CheckoutPage />
            </UserProtectedRoute>
          }
        />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/order/success/:id" element={<OrderSuccessPage />} />
        <Route
          path="/profile"
          element={
            <UserProtectedRoute>
              <ProfilePage />
            </UserProtectedRoute>
          }
        />

        {/* SHOP ROUTES */}
        <Route path="/seller-login" element={<ShopLoginPage />} />
        <Route path="/create-shop" element={<ShopCreatePage />} />
        <Route
          path="/seller/activation/:activationCode"
          element={<ShopActivationPage />}
        />
        <Route
          path="/shop/:id"
          element={
            <SellerProtectedRoute>
              <ShopLandingPage />
            </SellerProtectedRoute>
          }
        />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </BrowserRouter>
  );
};

export default App;
