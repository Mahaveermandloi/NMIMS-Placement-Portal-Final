import React from "react";
import { useForm } from "react-hook-form";

const CompanyVisitAnnouncement = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      visitDate: new Date().toISOString().split("T")[0], // Set default date to today
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission, e.g., send data to the backend
  };

  return (
    <div className=" mx-auto p-4 bg-white rounded shadow-md">
      {/* <h2 className="text-2xl font-bold mb-4">Company Visit Announcement</h2> */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Company Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Company Name
          </label>
          <input
            type="text"
            {...register("companyName", {
              required: "Company Name is required",
            })}
            className={`w-full px-3 py-2 border ${
              errors.companyName ? "border-red-500" : "border-gray-300"
            } rounded focus:outline-none focus:ring-2 focus:ring-blue-600`}
          />
          {errors.companyName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.companyName.message}
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
            {...register("companyLogo", {
              required: "Company Logo is required",
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          {errors.companyLogo && (
            <p className="text-red-500 text-sm mt-1">
              {errors.companyLogo.message}
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
            {...register("rolesOffered", {
              required: "Roles Offered is required",
            })}
            className={`w-full px-3 py-2 border ${
              errors.rolesOffered ? "border-red-500" : "border-gray-300"
            } rounded focus:outline-none focus:ring-2 focus:ring-blue-600`}
          />
          {errors.rolesOffered && (
            <p className="text-red-500 text-sm mt-1">
              {errors.rolesOffered.message}
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
            {...register("visitDate")}
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
  );
};

export default CompanyVisitAnnouncement;
