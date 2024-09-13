import React from "react";
import { useForm } from "react-hook-form";

const TrainingandWorkshopAnnouncement = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission, e.g., send data to the backend
  };

  return (
    <div className=" mx-auto p-4 bg-white rounded shadow">
      {/* <h2 className="text-2xl font-bold mb-4">
        Training and Workshop Announcement
      </h2> */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Training and Workshop Title */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            className={`w-full px-3 py-2 border ${
              errors.title ? "border-red-500" : "border-gray-300"
            } rounded focus:outline-none focus:ring-2 focus:ring-blue-600`}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Date and Time */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date and Time
          </label>
          <input
            type="datetime-local"
            {...register("dateTime", {
              required: "Date and Time are required",
            })}
            className={`w-full px-3 py-2 border ${
              errors.dateTime ? "border-red-500" : "border-gray-300"
            } rounded focus:outline-none focus:ring-2 focus:ring-blue-600`}
          />
          {errors.dateTime && (
            <p className="text-red-500 text-sm mt-1">
              {errors.dateTime.message}
            </p>
          )}
        </div>

        {/* Venue */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Venue
          </label>
          <input
            type="text"
            {...register("venue", { required: "Venue is required" })}
            className={`w-full px-3 py-2 border ${
              errors.venue ? "border-red-500" : "border-gray-300"
            } rounded focus:outline-none focus:ring-2 focus:ring-blue-600`}
          />
          {errors.venue && (
            <p className="text-red-500 text-sm mt-1">{errors.venue.message}</p>
          )}
        </div>

        {/* Registration Deadline */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Registration Deadline
          </label>
          <input
            type="date"
            {...register("registrationDeadline", {
              required: "Registration Deadline is required",
            })}
            className={`w-full px-3 py-2 border ${
              errors.registrationDeadline ? "border-red-500" : "border-gray-300"
            } rounded focus:outline-none focus:ring-2 focus:ring-blue-600`}
          />
          {errors.registrationDeadline && (
            <p className="text-red-500 text-sm mt-1">
              {errors.registrationDeadline.message}
            </p>
          )}
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

export default TrainingandWorkshopAnnouncement;
