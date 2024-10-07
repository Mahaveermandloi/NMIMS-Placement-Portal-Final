 

import React from "react";
import {
  SERVER_URL,
  ADMIN_PATH,
  STUDENT_PATH,
} from "../../../../Utils/URLPath.jsx";
import { toast } from "react-toastify"; // Import toast for notifications
import { deleteApi } from "../../../../Utils/API.js";
import JobDetailsPage from "./JobDetailsPage.jsx";
import { useNavigate } from "react-router-dom";

const JobCard = ({ job }) => {
  const navigate = useNavigate();

  // Format date to DD/MM/YYYY
  const formatDeadline = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Check if the deadline is today
  const isDeadlineToday = (dateString) => {
    const deadlineDate = new Date(dateString);
    const today = new Date();
    return (
      deadlineDate.getDate() === today.getDate() &&
      deadlineDate.getMonth() === today.getMonth() &&
      deadlineDate.getFullYear() === today.getFullYear()
    );
  };

  // Check if the deadline is in the past
  const isDeadlineExpired = (dateString) => {
    const deadlineDate = new Date(dateString);
    const today = new Date();
    return deadlineDate < today;
  };

  const deadlineClass = isDeadlineToday(job.application_deadline)
    ? "text-red-500 font-bold"
    : "text-gray-700 dark:text-gray-400";

  return (
    <div className="relative flex flex-row items-center border hover:border-gray-100 rounded-lg shadow-xl md:flex-row md:max-w-md">
      {/* Show "Expired" label if deadline has passed */}

      {isDeadlineExpired(job.application_deadline) && (
        <span
          className="absolute text-red-500 text-md lg:text-md px-2 py-1 rounded-full
          bottom-2 right-2 lg:bottom-3 lg:right-3 "
        >
          Expired
        </span>
      )}

      <img
        className="lg:w-20 ml-4 w-20"
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
            onClick={() => navigate(`${STUDENT_PATH}/job-listings/${job._id}`)}
          >
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
