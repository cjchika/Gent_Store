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
  ShopDashboardPage,
  ShopPreviewPage,
  ShopCreateProduct,
  ShopAllProducts,
  ShopCreateEvent,
  ShopAllEvents,
  ShopAllCoupons,
} from "./routes/ShopRoutes.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import store from "./redux/store.js";
import { getUser } from "./redux/actions/user.js";
import { getSeller } from "./redux/actions/seller.js";
import { getAllProducts } from "./redux/actions/product.js";
import { useSelector } from "react-redux";
import UserProtectedRoute from "./routes/UserProtectedRoute.jsx";
import SellerProtectedRoute from "./routes/SellerProtectedRoute.jsx";
import { ScrollToTop } from "./components/utils/ScrollToTop.jsx";

const App = () => {
  // const { user } = useSelector((state) => state.user);
  // const { seller } = useSelector((state) => state.seller);
  // const { allProducts } = useSelector((state) => state.products);
  // console.log(user);
  // console.log(seller);
  // console.log(allProducts);

  useEffect(() => {
    store.dispatch(getUser());
    store.dispatch(getSeller());
    store.dispatch(getAllProducts());
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop>
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
          <Route path="/product/:id" element={<ProductDetailsPage />} />
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
          <Route path="/order/success" element={<OrderSuccessPage />} />
          <Route
            path="/profile"
            element={
              <UserProtectedRoute>
                <ProfilePage />
              </UserProtectedRoute>
            }
          />

          {/* SHOP ROUTES */}
          <Route path="/shop/preview/:id" element={<ShopPreviewPage />} />
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
          <Route
            path="/dashboard"
            element={
              <SellerProtectedRoute>
                <ShopDashboardPage />
              </SellerProtectedRoute>
            }
          />

          <Route
            path="/dashboard-create-product"
            element={
              <SellerProtectedRoute>
                <ShopCreateProduct />
              </SellerProtectedRoute>
            }
          />

          <Route
            path="/dashboard-products"
            element={
              <SellerProtectedRoute>
                <ShopAllProducts />
              </SellerProtectedRoute>
            }
          />

          <Route
            path="/dashboard-create-event"
            element={
              <SellerProtectedRoute>
                <ShopCreateEvent />
              </SellerProtectedRoute>
            }
          />

          <Route
            path="/dashboard-events"
            element={
              <SellerProtectedRoute>
                <ShopAllEvents />
              </SellerProtectedRoute>
            }
          />

          <Route
            path="/dashboard-coupons"
            element={
              <SellerProtectedRoute>
                <ShopAllCoupons />
              </SellerProtectedRoute>
            }
          />
        </Routes>
      </ScrollToTop>

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
