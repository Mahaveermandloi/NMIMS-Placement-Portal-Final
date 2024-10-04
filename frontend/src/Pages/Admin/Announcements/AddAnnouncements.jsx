import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Loader from "../../../Components/Loader";
import { Toast } from "../../../Components/Toast.jsx";
import { postApi } from "../../../Utils/API";
import { toast } from "react-toastify";
import { ADMIN_PATH, SERVER_URL } from "../../../Utils/URLPath";
import { useNavigate } from "react-router-dom";
const AddAnnouncement = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      date: new Date().toISOString().split("T")[0], // Set default date to today
    },
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

 


  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await postApi(data, `${SERVER_URL}/api/announcement`);
  
      if (response.statusCode === 201) {
        toast.success("Announcement Added Successfully!");
  
        // Extract email details from the response
        const { emailArray, emailSubject, emailMessage } = response.data;
        
        // Create a mailto link
        const mailtoLink = `mailto:${emailArray.join(",")}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailMessage)}`;
  
        // Trigger mail client (Outlook, etc.)
        window.location.href = mailtoLink;
  
        setTimeout(() => {
          navigate(`${ADMIN_PATH}/announcements`);
        }, 1000);
      }
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <>
      {loading ? (
        <>
          <Toast />

          <Loader />
        </>
      ) : (
        <>
          <Toast />
          <h2 className="text-2xl font-bold mb-4"> Add Announcement</h2>
          <div className=" mx-auto p-4 bg-white rounded shadow-md">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  {...register("company_name", {
                    required: "Company Name is required",
                  })}
                  className={`w-full px-3 py-2 border ${
                    errors.company_name ? "border-red-500" : "border-gray-300"
                  } rounded focus:outline-none focus:ring-2 focus:ring-blue-600`}
                />
                {errors.company_name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.company_name.message}
                  </p>
                )}
              </div>

              {/* Company Logo */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Logo
                </label>
                <input
                  type="file"
                  accept="image/*"
                  {...register("company_logo", {
                    required: "Company Logo is required",
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                {errors.company_logo && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.company_logo.message}
                  </p>
                )}
              </div>

              {/* Roles Offered */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Roles Offered
                </label>
                <input
                  type="text"
                  {...register("roles_offered", {
                    required: "Roles Offered is required",
                  })}
                  className={`w-full px-3 py-2 border ${
                    errors.roles_offered ? "border-red-500" : "border-gray-300"
                  } rounded focus:outline-none focus:ring-2 focus:ring-blue-600`}
                />
                {errors.roles_offered && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.roles_offered.message}
                  </p>
                )}
              </div>

              {/* Date */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  {...register("date")}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                Submit Announcement
              </button>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default AddAnnouncement;
