import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../Components/Loader.jsx";
import { Toast } from "../Components/Toast.jsx";
import { postApi } from "../Utils/API.js";
import { SERVER_URL, ADMIN_PATH, STUDENT_PATH } from "../Utils/URLPath.jsx";
import logo from "../../public/images/nmimslogo.png";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await postApi(data, `${SERVER_URL}/api/student/login`);

      if (response.statusCode === 200) {
        const { accessToken, refreshToken } = response.data;

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        toast.success("Login successful");

        setTimeout(() => {
          navigate(`${STUDENT_PATH}/dashboard`);
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      if (error.response) {
        const { message } = error.response.data;

     

        toast.error(message || "An error occurred. Please try again.");
      } else {
        toast.error("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toast />
      <section className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="flex flex-col items-center mb-6">
          <img className="h-20 mb-4" src={logo} alt="logo" />
          <h1 className="text-2xl font-bold text-gray-900">
            STUDENT LOGIN PANEL
          </h1>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
          {loading ? (
            <Loader message="Signing in..." />
          ) : (
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label
                  htmlFor="student_sap_no"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  SAP ID
                </label>
                <input
                  type="text"
                  id="student_sap_no"
                  placeholder="Enter your SAP ID"
                  className={`bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${
                    errors.student_sap_no ? "border-red-500" : ""
                  }`}
                  {...register("student_sap_no", {
                    required: "SAP ID is required",
                    pattern: {
                      value: /^[0-9]{11}$/,
                      message: "SAP ID must be 11 digits",
                    },
                  })}
                />
                {errors.student_sap_no && (
                  <span className="text-red-500 text-sm">
                    {errors.student_sap_no.message}
                  </span>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="••••••••"
                    className={`bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${
                      errors.password ? "border-red-500" : ""
                    }`}
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password should have at least 6 characters",
                      },
                    })}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-500"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaRegEye />}
                  </button>
                </div>
                {errors.password && (
                  <span className="text-red-500 text-sm">
                    {errors.password.message}
                  </span>
                )}
              </div>

              <div className="flex items-center ">
                <div className="flex items-start">
                  <div className=" text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    ></label>
                  </div>
                </div>

                <Link
                  to="/forget-password"
                  className="text-sm font-medium text-blue-700"
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign in
              </button>

              <div className="mt-5">
                <Link
                  to="/register"
                  className="text-sm font-medium text-blue-700"
                >
                  Dont have account ? Register Now
                </Link>
              </div>
            </form>
          )}
        </div>
      </section>
    </>
  );
};

export default Login;
