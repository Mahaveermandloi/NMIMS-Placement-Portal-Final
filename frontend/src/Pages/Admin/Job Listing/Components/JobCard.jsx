import React from "react";
import { SERVER_URL, ADMIN_PATH } from "../../../../Utils/URLPath.jsx";
import { toast } from "react-toastify"; // Import toast for notifications
import { deleteApi } from "../../../../Utils/API.js";
import JobDetailsPage from "./JobDetailsPage.jsx";
import { useNavigate } from "react-router-dom";
const JobCard = ({ job }) => {
  const navigate = useNavigate();
  const formatDeadline = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const isDeadlineToday = (dateString) => {
    const deadlineDate = new Date(dateString);
    const today = new Date();
    return (
      deadlineDate.getDate() === today.getDate() &&
      deadlineDate.getMonth() === today.getMonth() &&
      deadlineDate.getFullYear() === today.getFullYear()
    );
  };

  const deadlineClass = isDeadlineToday(job.application_deadline)
    ? "text-red-500 font-bold"
    : "text-gray-700 dark:text-gray-400";

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this job listing?")) {
      try {
        const response = await deleteApi(
          `${SERVER_URL}/api/joblisting/${job._id}`
        );
        if (response.statusCode === 200) {
          toast.success("Job listing deleted successfully");
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      } catch (error) {
        console.error("Error deleting job listing:", error);
        toast.error("Error deleting job listing");
      }
    }
  };

  return (
    <div className="flex flex-row items-center border hover:border-gray-100 rounded-lg shadow-xl md:flex-row md:max-w-md">
      <img
        className=" lg:w-24 lg:h-20 ml-4 h-20 w-20"
        src={`${job.company_logo}`}
        alt={`${job.company_name} Logo`}

      />

      <div className="flex flex-col justify-between p-4 leading-normal">
        <h5 className="text-xl font-semibold tracking-tight text-gray-900">
          {job.job_title}
        </h5>
        <p className="text-sm font-medium text-gray-700 dark:text-gray-400">
          Company: {job.company_name}
        </p>
        <p className="text-sm font-medium text-gray-700 dark:text-gray-400">
          CTC: ₹{job.ctc.toLocaleString()}
        </p>
        <p className="text-sm font-medium text-gray-700 dark:text-gray-400">
          Year: {job.year}
        </p>
        <p className={`text-sm font-medium ${deadlineClass}`}>
          Deadline: {formatDeadline(job.application_deadline)}
        </p>
        <div className="flex mt-3 space-x-2">
          <button
            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm"
            onClick={() => navigate(`${ADMIN_PATH}/job-listings/${job._id}`)}
          >
            Read More
          </button>
          <button
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
            onClick={() =>
              navigate(`${ADMIN_PATH}/edit-job-listings-details/${job._id}`)
            }
          >
            Edit
          </button>
          <button
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
            onClick={handleDelete} // Add click handler for delete
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
