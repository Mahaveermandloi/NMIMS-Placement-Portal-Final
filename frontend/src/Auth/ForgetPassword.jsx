import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import logo from "../../public/images/nmimslogo.png";
import { postApi } from "../Utils/API.js"; // Import your postApi function
import { SERVER_URL } from "../Utils/URLPath";
import { Toast } from "../Components/Toast.jsx";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  // Set up react-hook-form
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // State for password visibility toggle (not needed for this form, but keep it if needed for future use)
  const [showPassword, setShowPassword] = useState(false);

  // State to track if OTP has been sent
  const [otpSent, setOtpSent] = useState(false);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  // Form submission handler
  const onSubmit = async (data) => {
    setOtpSent(true);

    try {
      // Call the postApi function to send the email to the server
      const response = await postApi(
        data,
        `${SERVER_URL}/api/admin/forget-password`
      );

      if (response.statusCode === 200) {
        toast.success("OTP Sent Successfully!");
        setTimeout(() => {
          navigate(`/otp-page/${data.email}`); // Navigate to OTP page with email
        }, 2000);
      }
    } catch (error) {
      console.error("Error:", error);

      toast.error(error.response.data.message);
    } finally {
      setOtpSent(false);
    }
  };

  return (
    <>
      <Toast />
      <section className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="flex flex-col items-center mb-6">
          <img className="h-20 mb-4" src={logo} alt="logo" />
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                EMAIL
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className={`bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${
                  errors.email ? "border-red-500" : ""
                }`}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid Email",
                  },
                })}
                disabled={otpSent} // Disable input after OTP is sent
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>
            <button
              type="submit"
              className={`w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center ${
                otpSent
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
              disabled={otpSent} // Disable button after OTP is sent
            >
              Submit
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default ForgetPassword;
