import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import { toast } from "react-toastify";
import userApi from "../../config/services/userAuth.api";
import Logo from "../Layout/Logo";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const loginData = { email, password };

    const { response, error } = await userApi.loginUser(loginData);
    setIsLoading(false);

    if (response) {
      console.log(response);
      toast.success("Login Success!", {
        toastId: "success3",
      });
      navigate("/");
      window.location.reload(true);
    }

    if (error) {
      toast.error(error.message, {
        toastId: "error4",
      });
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mx-auto sm:mx-auto sm:w-full sm:max-w-md">
        <Logo align="auto" path={"/"} />
        <h2 className="text-priColor mt-6 text-center text-xl font-semibold text-gray-900">
          Login to your account
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
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
            <div className={`${styles.normalFlex} justify-between`}>
              <div className={`${styles.normalFlex}`}>
                <input
                  type="checkbox"
                  name="remember-me"
                  id="remember-me"
                  className="h-4 w-4 text-priColor focus:[#3b82f6] border-[#93c5fd] rounded"
                />
                <label className="ml-2 block text-sm">Remember me</label>
              </div>
              <a
                href="/forgot-password"
                className="font-medium text-priColor hover:text-litePriColor text-sm"
              >
                Forgot your password?
              </a>
            </div>
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-priColor hover:bg-litePriColor"
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </div>
            <div className={`${styles.normalFlex} gap-3 w-full`}>
              <h4 className="text-secColor">Don't have an account?</h4>
              <Link
                to="/signup"
                className="text-priColor hover:text-litePriColor"
              >
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
