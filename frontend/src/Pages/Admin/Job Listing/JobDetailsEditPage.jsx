import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import { getApi, postApi } from "../../../Utils/API";
import { SERVER_URL } from "../../../Utils/URLPath";
import Loader from "../../../Components/Loader";
import { Toast } from "../../../Components/Toast";

const JobEditDetails = () => {
  const { id } = useParams(); // Extract ID from URL parameters
  const [companies, setCompanies] = useState([]);
  const [years, setYears] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    // Fetch companies
    const fetchCompanies = async () => {
      try {
        const response = await getApi(
          `${SERVER_URL}/api/company/get-all-companies`
        );
        if (response.statusCode === 200) {
          setCompanies(response.data);
        } else {
          toast.error("Failed to fetch companies");
        }
      } catch (error) {
        toast.error("Error fetching companies");
      }
    };

    // Fetch job details
    const fetchJobDetails = async () => {
      try {
        const response = await getApi(`${SERVER_URL}/api/joblisting/${id}`);
        if (response.statusCode === 200) {
          const jobData = response.data;
          // Populate the form with fetched data
          setValue("company_name", jobData.company_id);
          setValue("year", jobData.year);
          setValue("job_title", jobData.job_title);
          setValue("job_description", jobData.job_description);
          setValue("job_type", jobData.job_type);
          setValue("location", jobData.location);
          setValue("ctc", jobData.ctc);
          setValue("application_deadline", jobData.application_deadline);
        } else {
          toast.error("Failed to fetch job details");
        }
      } catch (error) {
        toast.error("Error fetching job details");
      }
    };

    // Generate previous years
    const currentYear = new Date().getFullYear();
    const previousYears = Array.from({ length: 4 }, (_, i) => currentYear - i);
    setYears(previousYears);

    fetchCompanies();
    fetchJobDetails();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    setLoading(true); // Show loader
    const jobData = {
      ...data,
      company_id: data.company_name,
    };

    try {
      const response = await postApi(
        jobData,
        `${SERVER_URL}/api/joblisting/${id}`
      );
      if (response.statusCode === 200) {
        toast.success("Job details updated successfully");
        setTimeout(() => {
          navigate(`${ADMIN_PATH}/job-listings`);
        }, 2000);
      } else {
        toast.error("Failed to update job details");
      }
    } catch (error) {
      toast.error("Error updating job details");
    } finally {
      setLoading(false); // Hide loader
    }
  };

  return (
    <>
      <Toast />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Edit Job Details</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="company_name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Company Name
            </label>
            <select
              id="company_name"
              className={`block w-full p-3 border rounded-md ${
                errors.company_name ? "border-red-500" : "border-gray-300"
              }`}
              {...register("company_name", {
                required: "Company name is required",
              })}
            >
              <option value="">Select Company</option>
              {companies.map((company) => (
                <option key={company._id} value={company._id}>
                  {company.company_name}
                </option>
              ))}
            </select>
            {errors.company_name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.company_name.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="year"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Year
            </label>
            <select
              id="year"
              className={`block w-full p-3 border rounded-md ${
                errors.year ? "border-red-500" : "border-gray-300"
              }`}
              {...register("year", { required: "Year is required" })}
            >
              <option value="">Select Year</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            {errors.year && (
              <p className="text-red-500 text-sm mt-1">{errors.year.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="job_title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Job Title
            </label>
            <input
              type="text"
              id="job_title"
              placeholder="Enter Job Title"
              className={`block w-full p-3 border rounded-md ${
                errors.job_title ? "border-red-500" : "border-gray-300"
              }`}
              {...register("job_title", { required: "Job title is required" })}
            />
            {errors.job_title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.job_title.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="job_description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Job Description
            </label>
            <textarea
              id="job_description"
              placeholder="Enter Job Description"
              className={`block w-full p-3 border rounded-md ${
                errors.job_description ? "border-red-500" : "border-gray-300"
              }`}
              {...register("job_description", {
                required: "Job description is required",
              })}
            />
            {errors.job_description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.job_description.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="job_type"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Job Type
            </label>
            <input
              type="text"
              id="job_type"
              placeholder="Enter Job Type"
              className={`block w-full p-3 border rounded-md ${
                errors.job_type ? "border-red-500" : "border-gray-300"
              }`}
              {...register("job_type", { required: "Job type is required" })}
            />
            {errors.job_type && (
              <p className="text-red-500 text-sm mt-1">
                {errors.job_type.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              placeholder="Enter Location"
              className={`block w-full p-3 border rounded-md ${
                errors.location ? "border-red-500" : "border-gray-300"
              }`}
              {...register("location", { required: "Location is required" })}
            />
            {errors.location && (
              <p className="text-red-500 text-sm mt-1">
                {errors.location.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="ctc"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              CTC
            </label>
            <input
              type="text"
              id="ctc"
              placeholder="Enter CTC"
              className={`block w-full p-3 border rounded-md ${
                errors.ctc ? "border-red-500" : "border-gray-300"
              }`}
              {...register("ctc", { required: "CTC is required" })}
            />
            {errors.ctc && (
              <p className="text-red-500 text-sm mt-1">{errors.ctc.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="application_deadline"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Application Deadline
            </label>
            <input
              type="date"
              id="application_deadline"
              className={`block w-full p-3 border rounded-md ${
                errors.application_deadline
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              {...register("application_deadline", {
                required: "Application deadline is required",
              })}
            />
            {errors.application_deadline && (
              <p className="text-red-500 text-sm mt-1">
                {errors.application_deadline.message}
              </p>
            )}
          </div>
        </div>

        {!loading ? (
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition"
            disabled={loading} // Disable button while loading
          >
            Update
          </button>
        ) : (
          <Loader />
        )}
      </form>
    </>
  );
};

export default JobEditDetails;
