import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { SERVER_URL, STUDENT_PATH } from "../../../Utils/URLPath";
import Loader from "../../../Components/Loader";
import { getApi, putApi } from "../../../Utils/API";
import { toast } from "react-toastify";
import { Toast } from "../../../Components/Toast";

const UpdateProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imagePreview, setImagePreview] = useState("");
  const [files, setFiles] = useState({
    profile_image: null,
    student_cv: null,
    student_marksheet: null,
  });

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getApi("/api/student/get-profile");
        setProfile(response.data);
        setImagePreview(response.data.student_profile_image);
        setValue("student_email_id", response.data.student_email_id);
      } catch (error) {
        console.error("Failed to fetch profile", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [setValue]);

  const onSubmit = async (data) => {
  
    setLoading(true);

    try {
      // Construct the request body
      const requestBody = {
        student_email_id: data.student_email_id,
        student_profile_image: files.student_profile_image,
        student_cv: files.student_cv,
        student_marksheet: files.student_marksheet,
      };

 
      // Note: This approach may not work well for file uploads due to encoding issues
      const response = await putApi(requestBody, "/api/student/update-profile");

      if (response.statusCode === 200) {
        toast.success("Profile Updated Successfully");

        // Refresh profile data
        const updatedProfile = await getApi("/api/student/get-profile");
        
        setProfile(updatedProfile.data);

        setTimeout(() => {
          navigate(`${STUDENT_PATH}/profile`);
        }, 2000);
      } else {
        toast.error("Update Failed!!");
      }
    } catch (error) {
      toast.error("Update Failed!!");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
   
    const { id, files: selectedFiles } = e.target;
    const file = selectedFiles[0];
    if (file) {
      setFiles((prevFiles) => ({
        ...prevFiles,
        [id]: file,
      }));
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col items-center mb-6">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                <img
                  src={`${SERVER_URL}${imagePreview}`}
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
                id="student_profile_image"
                accept="image/*"
                onChange={handleFileChange}
                className="mb-4 w-full"
              />
              {errors.student_profile_image && (
                <p className="text-red-500 text-sm mb-2">
                  {errors.student_profile_image.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="student_email_id"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Personal Email
              </label>
              <input
                type="email"
                id="student_email_id"
                {...register("student_email_id", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Invalid email format",
                  },
                })}
                className={`w-full border ${
                  errors.student_email_id ? "border-red-500" : "border-gray-300"
                } rounded-lg py-2 px-4 focus:outline-none focus:border-blue-500`}
                placeholder="Enter your personal email"
              />
              {errors.student_email_id && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.student_email_id.message}
                </p>
              )}
            </div>

            <div className="flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4 mb-6">
              <div className="flex flex-col">
                <label
                  htmlFor="student_cv"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Upload Resume
                </label>
                <input
                  type="file"
                  id="student_cv"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="mb-4 w-full"
                />
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="student_marksheet"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Upload Marksheet
                </label>
                <input
                  type="file"
                  id="student_marksheet"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="mb-4 w-full"
                />
              </div>
            </div>

            <div className="flex space-x-4 lg:justify-between">
              {loading ? (
                <Loader message="Loading..." />
              ) : (
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 w-full rounded-lg hover:bg-blue-600 transition duration-300"
                >
                  Save Changes
                </button>
              )}

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
    </>
  );
};

export default UpdateProfile;
