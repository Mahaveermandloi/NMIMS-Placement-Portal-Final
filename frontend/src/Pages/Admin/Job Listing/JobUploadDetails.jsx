import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ADMIN_PATH, SERVER_URL } from "../../../Utils/URLPath";
import { getApi, postApi } from "../../../Utils/API";
import Loader from "../../../Components/Loader";
import { Toast } from "../../../Components/Toast";
import { useNavigate } from "react-router-dom";

const JobUploadDetails = () => {
  const [companies, setCompanies] = useState([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState("");
  const [years, setYears] = useState([]);
  const [loading, setLoading] = useState(false); // State to control the loader

  const navigate = useNavigate();
  const {
    register: registerJob,
    handleSubmit: handleSubmitJob,
    formState: { errors: errorsJob },
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

    // Generate previous years
    const currentYear = new Date().getFullYear();
    const previousYears = Array.from({ length: 4 }, (_, i) => currentYear - i);
    setYears(previousYears);

    fetchCompanies();
  }, []);

  const onSubmitJob = async (data) => {
    setLoading(true); // Show loader
    const jobData = {
      ...data,
      company_id: selectedCompanyId,
      ctc: data.ctc,
    };

    try {
      const response = await postApi(jobData, `${SERVER_URL}/api/joblisting`);
   
      if (response.statusCode === 201) {
        toast.success("Job data uploaded successfully");
        setTimeout(() => {
          navigate(`${ADMIN_PATH}/job-listings`);
        }, 2000);
      }
    } catch (error) {
      toast.error("Failed to upload job data");
    } finally {
      setLoading(false); // Hide loader
    }
  };

  return (
    <>
      <Toast />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Upload Job Details</h1>
      </div>

      <form onSubmit={handleSubmitJob(onSubmitJob)} className="space-y-6">
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
                errorsJob.company_name ? "border-red-500" : "border-gray-300"
              }`}
              {...registerJob("company_name", {
                required: "Company name is required",
                onChange: (e) => setSelectedCompanyId(e.target.value),
              })}
            >
              <option value="">Select Company</option>
              {companies.map((company) => (
                <option key={company._id} value={company._id}>
                  {company.company_name}
                </option>
              ))}
            </select>
            {errorsJob.company_name && (
              <p className="text-red-500 text-sm mt-1">
                {errorsJob.company_name.message}
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
                errorsJob.year ? "border-red-500" : "border-gray-300"
              }`}
              {...registerJob("year", { required: "Year is required" })}
            >
              <option value="">Select Year</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            {errorsJob.year && (
              <p className="text-red-500 text-sm mt-1">
                {errorsJob.year.message}
              </p>
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
                errorsJob.job_title ? "border-red-500" : "border-gray-300"
              }`}
              {...registerJob("job_title", {
                required: "Job title is required",
              })}
            />
            {errorsJob.job_title && (
              <p className="text-red-500 text-sm mt-1">
                {errorsJob.job_title.message}
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
                errorsJob.job_description ? "border-red-500" : "border-gray-300"
              }`}
              {...registerJob("job_description", {
                required: "Job description is required",
              })}
            />
            {errorsJob.job_description && (
              <p className="text-red-500 text-sm mt-1">
                {errorsJob.job_description.message}
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
                errorsJob.job_type ? "border-red-500" : "border-gray-300"
              }`}
              {...registerJob("job_type", {
                required: "Job type is required",
              })}
            />
            {errorsJob.job_type && (
              <p className="text-red-500 text-sm mt-1">
                {errorsJob.job_type.message}
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
                errorsJob.location ? "border-red-500" : "border-gray-300"
              }`}
              {...registerJob("location", {
                required: "Location is required",
              })}
            />
            {errorsJob.location && (
              <p className="text-red-500 text-sm mt-1">
                {errorsJob.location.message}
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
                errorsJob.ctc ? "border-red-500" : "border-gray-300"
              }`}
              {...registerJob("ctc", {
                required: "CTC is required",
              })}
            />
            {errorsJob.ctc && (
              <p className="text-red-500 text-sm mt-1">
                {errorsJob.ctc.message}
              </p>
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
                errorsJob.application_deadline
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              {...registerJob("application_deadline", {
                required: "Application deadline is required",
              })}
            />
            {errorsJob.application_deadline && (
              <p className="text-red-500 text-sm mt-1">
                {errorsJob.application_deadline.message}
              </p>
            )}
          </div>
        </div>

        {!loading ? (
          <>
            <button
              type="submit"
              className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition"
              disabled={loading} // Disable button while loading
            >
              Submit
            </button>
          </>
        ) : (
          <>
            <Loader />
          </>
        )}
      </form>
    </>
  );
};

export default JobUploadDetails;
