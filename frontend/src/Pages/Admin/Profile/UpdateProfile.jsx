import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ADMIN_PATH, SERVER_URL } from "../../../Utils/URLPath";
import { getApi, putApi } from "../../../Utils/API.js";
import { Toast } from "../../../Components/Toast.jsx";
import { toast } from "react-toastify";
import Loader from "../../../Components/Loader.jsx";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState("");
  const [loading, setLoading] = useState(false); // State to manage loading
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // Fetch current admin details on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getApi("/api/admin/get-admin-details");
        const { email, profile_image } = response.data;
        setValue("email", email); // Set email in form
        setCurrentImage(profile_image); // Set current image URL
      } catch (error) {
        console.error("Error fetching profile details:", error);
        toast.error("Failed to fetch profile details");
      }
    };

    fetchProfile();
  }, [setValue]);

  const onSubmit = async (data) => {
    setLoading(true); // Set loading to true when submitting
    try {
      const response = await putApi(data, "/api/admin/update-profile");

      if (response) {
        toast.success("Profile Updated Successfully!!");
        navigate(`${ADMIN_PATH}/profile`);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false); // Reset loading state once request is complete
    }
  };

  return (
    <>
      <Toast />

      <div className="flex flex-col items-center justify-center py-10">
        <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Update Profile
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <div className="flex flex-col items-center mb-6">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                <img
                  src={`${SERVER_URL}${currentImage}`} // Display the current image or a default one
                  // src="https://media.licdn.com/dms/image/C4D03AQGHME97R94JlQ/profile-displayphoto-shrink_200_200/0/1661392392680?e=2147483647&v=beta&t=ba2v62QjNbgX8DTPxr8l7WTeUnx195a_NVUb8fqBm4k"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <label
                htmlFor="profile_image"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Profile Image
              </label>
              <input
                type="file"
                id="profile_image"
                accept="image/*"
                {...register("profile_image")}
                className="mb-4 w-full"
              />
              {errors.profile_image && (
                <p className="text-red-500 text-sm mb-2">
                  {errors.profile_image.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Personal Email
              </label>
              <input
                type="email"
                id="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Invalid email format",
                  },
                })}
                className={`w-full border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-lg py-2 px-4 focus:outline-none focus:border-blue-500`}
                placeholder="Enter your personal email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="flex space-x-4 lg:justify-between">
              {loading ? (
                <Loader message="Uploading..." />
              ) : (
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 w-full rounded-lg hover:bg-blue-600 transition duration-300"
                  disabled={loading} // Disable the button while loading
                >
                  Save Changes
                </button>
              )}

              <button
                type="button"
                onClick={() => navigate(`${ADMIN_PATH}/profile`)}
                className="bg-gray-500 text-white py-2 px-4 w-full rounded-lg hover:bg-gray-600 transition duration-300"
                disabled={loading} // Disable the cancel button while loading
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateProfile;
