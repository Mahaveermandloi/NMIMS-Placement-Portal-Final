import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import logo from "../../public/images/nmimslogo.png";
import { postApi } from "../Utils/API.js"; // Adjust this import if needed
import { useParams, useNavigate } from "react-router-dom";
import { SERVER_URL } from "../Utils/URLPath";
import { toast } from "react-toastify";
import { Toast } from "../Components/Toast.jsx";
import Loader from "../Components/Loader.jsx";

const OTPPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [otpSent, setOtpSent] = useState(false);
  const [otpMessage, setOtpMessage] = useState("");
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes in seconds
  const [resendDisabled, setResendDisabled] = useState(false);

  const [loader, setLoader] = useState(false);
  const param = useParams();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    // Prepare request payload
    const payload = {
      email: param.email,
      otp: data.otp,
    };

    try {
      // Make the POST request to verify OTP
      const response = await postApi(
        payload,
        `${SERVER_URL}/api/admin/verify-otp`
      );

      if (response.success) {
        toast.success("OTP verified successfully!");
        setTimeout(() => {
          navigate(`/update-password/${param.email}`);
        }, 2000);
      } else {
        toast.error("Failed to verify OTP. Please try again.");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleResendOTP = async () => {
    // Disable resend button and start timer

    setResendDisabled(true);
    setOtpSent(false);

    // Prepare the request payload
    const payload = {
      email: param.email,
    };
    setLoader(true);

    try {
      // Make the POST request to resend OTP
      const response = await postApi(
        payload,
        `${SERVER_URL}/api/admin/resend-otp`
      );

      if (response.success) {
        toast.success("OTP has been resent!");
        setOtpMessage("OTP has been resent!");
        setTimeout(() => setOtpMessage(""), 5000);
        setTimeLeft(120);
        reset();
        // Re-enable the resend button after 60 seconds
        setTimeout(() => setResendDisabled(false), 60000);
      } else {
        toast.error("Failed to resend OTP. Please try again.");
        // Re-enable the resend button if there was an error
        setResendDisabled(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error resending OTP");
      // Re-enable the resend button if there was an error
      setResendDisabled(false);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    if (timeLeft === 0) {
      setOtpSent(false);
      return;
    }

    const timerInterval = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
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
                htmlFor="otp"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Enter OTP
              </label>
              <input
                type="text"
                id="otp"
                placeholder="Enter OTP"
                className={`bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${
                  errors.otp ? "border-red-500" : ""
                }`}
                {...register("otp", {
                  required: "OTP is required",
                  pattern: {
                    value: /^\d{6}$/, // Assuming OTP is a 6-digit number
                    message: "Invalid OTP",
                  },
                })}
              />
              {errors.otp && (
                <span className="text-red-500 text-sm">
                  {errors.otp.message}
                </span>
              )}
            </div>

            {loader ? (
              <>
                <div className="flex items-center justify-between">
                  <div className="flex items-start"></div>
                  <Loader message={"Resending OTP"} />
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <div className="flex items-start"></div>

                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (!resendDisabled) handleResendOTP();
                    }}
                    className={`text-sm font-medium text-blue-700 hover:underline ${
                      resendDisabled ? "cursor-not-allowed opacity-50" : ""
                    }`}
                    style={{ pointerEvents: resendDisabled ? "none" : "auto" }}
                  >
                    Resend OTP
                  </a>
                </div>
              </>
            )}

            <button
              type="submit"
              className="w-full text-white bg-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:bg-blue-700"
            >
              Submit
            </button>

            {/* {otpMessage && (
              <div className="text-green-500 text-sm mt-2">{otpMessage}</div>
            )} */}

            <div className="text-red-600 text-sm mt-2">
              {`Time remaining: ${formatTime(timeLeft)}`}
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default OTPPage;
