import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const JobUploadDetails = () => {
  const [tab, setTab] = useState("uploadJob");

  const {
    register: registerJob,
    handleSubmit: handleSubmitJob,
    control: controlJob,
    formState: { errors: errorsJob },
  } = useForm();

  const onSubmitJob = (data) => {
    console.log("Upload Job Data:", data);
    toast.success("Job data uploaded successfully");
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Upload Job Details</h1>
      </div>

      <form onSubmit={handleSubmitJob(onSubmitJob)} className="space-y-4">
        <div>
          <label
            htmlFor="job_title"
            className="block text-sm font-medium text-gray-700"
          >
            Job Title
          </label>
          <input
            type="text"
            id="job_title"
            placeholder="Enter Job Title"
            className={`block w-full p-2 border rounded ${
              errorsJob.job_title ? "border-red-500" : ""
            }`}
            {...registerJob("job_title", {
              required: "Job title is required",
            })}
          />
          {errorsJob.job_title && (
            <p className="text-red-500 text-sm">
              {errorsJob.job_title.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="job_description"
            className="block text-sm font-medium text-gray-700"
          >
            Job Description
          </label>
          <textarea
            id="job_description"
            placeholder="Enter Job Description"
            className={`block w-full p-2 border rounded ${
              errorsJob.job_description ? "border-red-500" : ""
            }`}
            {...registerJob("job_description", {
              required: "Job description is required",
            })}
          />
          {errorsJob.job_description && (
            <p className="text-red-500 text-sm">
              {errorsJob.job_description.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="job_type"
            className="block text-sm font-medium text-gray-700"
          >
            Job Type
          </label>
          <input
            type="text"
            id="job_type"
            placeholder="Enter Job Type"
            className={`block w-full p-2 border rounded ${
              errorsJob.job_type ? "border-red-500" : ""
            }`}
            {...registerJob("job_type", {
              required: "Job type is required",
            })}
          />
          {errorsJob.job_type && (
            <p className="text-red-500 text-sm">{errorsJob.job_type.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700"
          >
            Location
          </label>
          <input
            type="text"
            id="location"
            placeholder="Enter Location"
            className={`block w-full p-2 border rounded ${
              errorsJob.location ? "border-red-500" : ""
            }`}
            {...registerJob("location", {
              required: "Location is required",
            })}
          />
          {errorsJob.location && (
            <p className="text-red-500 text-sm">{errorsJob.location.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="company_name"
            className="block text-sm font-medium text-gray-700"
          >
            Company Name
          </label>
          <input
            type="text"
            id="company_name"
            placeholder="Enter Company Name"
            className={`block w-full p-2 border rounded ${
              errorsJob.company_name ? "border-red-500" : ""
            }`}
            {...registerJob("company_name", {
              required: "Company name is required",
            })}
          />
          {errorsJob.company_name && (
            <p className="text-red-500 text-sm">
              {errorsJob.company_name.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="package"
            className="block text-sm font-medium text-gray-700"
          >
            Package
          </label>
          <input
            type="number"
            id="package"
            placeholder="Enter Package"
            className={`block w-full p-2 border rounded ${
              errorsJob.package ? "border-red-500" : ""
            }`}
            {...registerJob("package", {
              required: "Package is required",
            })}
          />
          {errorsJob.package && (
            <p className="text-red-500 text-sm">{errorsJob.package.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="application_deadline"
            className="block text-sm font-medium text-gray-700"
          >
            Application Deadline
          </label>
          <input
            type="date"
            id="application_deadline"
            className={`block w-full p-2 border rounded ${
              errorsJob.application_deadline ? "border-red-500" : ""
            }`}
            {...registerJob("application_deadline", {
              required: "Application deadline is required",
            })}
          />
          {errorsJob.application_deadline && (
            <p className="text-red-500 text-sm">
              {errorsJob.application_deadline.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="year"
            className="block text-sm font-medium text-gray-700"
          >
            Year
          </label>
          <select
            id="year"
            className={`block w-full p-2 border rounded ${
              errorsJob.year ? "border-red-500" : ""
            }`}
            {...registerJob("year", { required: "Year is required" })}
          >
            <option value="">Select Year</option>
            <option value={2021}>2021</option>
            <option value={2022}>2022</option>
            <option value={2023}>2023</option>
            <option value={2024}>2024</option>
          </select>
          {errorsJob.year && (
            <p className="text-red-500 text-sm">{errorsJob.year.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default JobUploadDetails;
