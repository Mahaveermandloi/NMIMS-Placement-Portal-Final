import "react-toastify/dist/ReactToastify.css";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import logo from "../../../../public/images/nmimslogo.png";
import { STUDENT_PATH, SERVER_URL } from "../../../Utils/URLPath.jsx"; // Update to use STUDENT_PATH
import Loader from "../../../Components/Loader.jsx"; // Adjust the import path as needed
import { putApi } from "../../../Utils/API.js"; // Update to use putApi instead of postApi
import { toast } from "react-toastify"; // Import react-toastify for notifications
import { Toast } from "../../../Components/Toast.jsx";

const ChangePassword = () => {
  // Set up react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const navigate = useNavigate();
  const { email } = useParams(); // Use destructuring to get email from params
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state

  const toggleCurrentPasswordVisibility = () => {
    setShowCurrentPassword((prevShowPassword) => !prevShowPassword);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword((prevShowPassword) => !prevShowPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(
      (prevShowConfirmPassword) => !prevShowConfirmPassword
    );
  };

  const onSubmit = async (data) => {
    setLoading(true); // Set loading to true

    try {
      const response = await putApi(
        {
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
        },
        `${SERVER_URL}/api/student/update-student-password` // Updated URL for students
      );

     

      if (response.success) {
        toast.success("Password updated successfully!");
        setTimeout(() => {
          navigate(`${STUDENT_PATH}/profile`); // Navigate to student's profile
        }, 2000);
      } else {
        toast.error(`Failed to update password: ${response.message}`);
      }
    } catch (error) {
      console.error("Error updating password:", error);
      toast.error("An error occurred while updating the password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toast />
      <section className="mt-20 flex flex-col items-center justify-center">
        <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            {/* Current Password */}
            <div>
              <label
                htmlFor="currentPassword"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  id="currentPassword"
                  placeholder="Enter current password"
                  className={`bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${
                    errors.currentPassword ? "border-red-500" : ""
                  }`}
                  {...register("currentPassword", {
                    required: "Current password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters long",
                    },
                  })}
                />
                <span
                  onClick={toggleCurrentPasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                >
                  {showCurrentPassword ? <FaEyeSlash /> : <FaRegEye />}
                </span>
              </div>
              {errors.currentPassword && (
                <span className="text-red-500 text-sm">
                  {errors.currentPassword.message}
                </span>
              )}
            </div>

            {/* New Password */}
            <div>
              <label
                htmlFor="newPassword"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                New Password
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  id="newPassword"
                  placeholder="Enter new password"
                  className={`bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${
                    errors.newPassword ? "border-red-500" : ""
                  }`}
                  {...register("newPassword", {
                    required: "New password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters long",
                    },
                  })}
                />
                <span
                  onClick={toggleNewPasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                >
                  {showNewPassword ? <FaEyeSlash /> : <FaRegEye />}
                </span>
              </div>
              {errors.newPassword && (
                <span className="text-red-500 text-sm">
                  {errors.newPassword.message}
                </span>
              )}
            </div>

            {/* Confirm New Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  placeholder="Confirm your new password"
                  className={`bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${
                    errors.confirmPassword ? "border-red-500" : ""
                  }`}
                  {...register("confirmPassword", {
                    required: "Confirm new password is required",
                    validate: (value) =>
                      value === watch("newPassword") ||
                      "Passwords do not match",
                  })}
                />
                <span
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaRegEye />}
                </span>
              </div>
              {errors.confirmPassword && (
                <span className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>

            {/* Loader and Submit Button */}
            {loading ? (
              <>
                <Loader message={"Updating..."} />
              </>
            ) : (
              <>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:bg-blue-700"
                >
                  Update Password
                </button>
              </>
            )}

            {/* Cancel Button */}
            <button
              type="button"
              onClick={() => navigate(`${STUDENT_PATH}/profile`)} // Navigate to student's profile
              className="bg-gray-500 text-white py-2 px-4 w-full rounded-lg hover:bg-gray-600 transition duration-300"
            >
              Cancel
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default ChangePassword;
