import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../../../Components/Loader";
import { Toast } from "../../../Components/Toast";
import { toast } from "react-toastify";
import { getApi, putApi } from "../../../Utils/API.js";
import { SERVER_URL, ADMIN_PATH } from "../../../Utils/URLPath.jsx";

const UpdateAnnouncement = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    // Fetch the announcement data by ID
    const fetchAnnouncement = async () => {
      try {
        const response = await getApi(`${SERVER_URL}/api/announcement/${id}`);
        const data = response.data;

        // Set form values
        setValue("company_name", data.company_name);
        setValue("roles_offered", data.roles_offered);

        // Set today's date
        const today = new Date().toISOString().split("T")[0]; // Format as YYYY-MM-DD
        setValue("date", today);

        setLoading(false);
      } catch (error) {
        toast.error("Failed to fetch announcement data");
        setLoading(false);
      }
    };

    fetchAnnouncement();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      const response = await putApi(
        data,
        `${SERVER_URL}/api/announcement/${id}`
      );
      if (response.statusCode === 200) {
        toast.success("Announcement updated successfully!");


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
      toast.error("Failed to update announcement");
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {loading ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          <Toast />
          <h2 className="text-2xl font-bold mb-4">Update Announcement</h2>
          <div className="mx-auto p-4 bg-white rounded shadow-md">
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

export default UpdateAnnouncement;
