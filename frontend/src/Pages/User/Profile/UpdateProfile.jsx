import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ADMIN_PATH, STUDENT_PATH } from "../../../Utils/URLPath";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form data:", data);
    // Add logic to update profile information here, e.g., API request
  };

  return (
    <div className="flex flex-col items-center justify-center py-10">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Update Profile
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col items-center mb-6">
            <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
              <img
                src="https://i.imgur.com/gE97qYj.jpg" // Replace with the actual image URL or variable
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <label
              htmlFor="profileImage"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Profile Image
            </label>
            <input
              type="file"
              id="profileImage"
              accept="image/*"
              {...register("profileImage", {
                required: "Profile image is required",
              })}
              className="mb-4 w-full"
            />
            {errors.profileImage && (
              <p className="text-red-500 text-sm mb-2">
                {errors.profileImage.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="personalEmail"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Personal Email
            </label>
            <input
              type="email"
              id="personalEmail"
              {...register("personalEmail", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email format",
                },
              })}
              className={`w-full border ${
                errors.personalEmail ? "border-red-500" : "border-gray-300"
              } rounded-lg py-2 px-4 focus:outline-none focus:border-blue-500`}
              placeholder="Enter your personal email"
            />
            {errors.personalEmail && (
              <p className="text-red-500 text-sm mt-1">
                {errors.personalEmail.message}
              </p>
            )}
          </div>

          <div className="flex space-x-4 lg:justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 w-full rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => navigate(`${STUDENT_PATH}/profile`)}
              className="bg-gray-500 text-white py-2 px-4 w-full rounded-lg hover:bg-gray-600 transition duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
