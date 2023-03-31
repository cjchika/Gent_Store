import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  LoginPage,
  SignupPage,
  ActivationPage,
  LandingPage,
} from "./Routes.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import store from "./redux/store.js";
import { getUser } from "./redux/actions/user.js";
import { useSelector } from "react-redux";

const App = () => {
  const { user } = useSelector((state) => state.user);
  console.log(user);

  useEffect(() => {
    store.dispatch(getUser());
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/activation/:activationCode"
          element={<ActivationPage />}
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
