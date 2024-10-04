import React, { useState, useEffect } from "react";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useFormContext } from "react-hook-form";
import { SERVER_URL, STUDENT_PATH } from "../../../Utils/URLPath.jsx";

const FormSideBar = ({ currentPage, setPage }) => {
  const navigate = useNavigate();
  const [validationStatus, setValidationStatus] = useState(
    Array(6).fill(true) // Initialize with true (valid) status for all steps
  );

  const steps = [
    { title: "Personal Details", page: 0 },
    { title: "Class 10th", page: 1 },
    { title: "Class 12th", page: 2 },
    { title: "Diploma", page: 3 },
    { title: "College", page: 4 },
    { title: "Additional Details", page: 5 },
  ];

  return (
    <div className="w-1/3 p-5">
      <div className="hidden lg:flex my-8">
        <button onClick={() => navigate(`${STUDENT_PATH}/login`)}>
          <IoArrowBackCircleOutline size={30} />
        </button>
      </div>

      <ol className="space-y-4 mt-10 w-72">
        {steps.map((step, index) => (
          <li
            // key={index}
            // onClick={() => handleStepClick(step.page)}
            className="cursor-pointer"
          >
            <div
              className={`lg:w-full w-[80%] p-4 shadow-sm rounded-lg ${
                validationStatus[step.page]
                  ? currentPage > step.page
                    ? "text-green-700 hover:bg-green-100 bg-green-50 dark:border-green-800 dark:text-green-400"
                    : currentPage === step.page
                    ? "text-blue-700 bg-blue-100 hover:bg-blue-200 dark:border-blue-800 dark:text-blue-400"
                    : "text-gray-900 bg-gray-100 hover:bg-gray-200 dark:border-gray-700 dark:text-gray-400"
                  : "bg-red-100 text-red-700 hover:bg-red-200 dark:border-red-800 dark:text-red-400"
              }`}
              role="alert"
            >
              <div className="flex items-center space-x-20 lg:justify-between">
                <h3 className="font-medium">
                  {index + 1}. {step.title}
                </h3>
                {currentPage > step.page ? (
                  <svg
                    className="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 16 12"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5.917 5.724 10.5 15 1.5"
                    />
                  </svg>
                ) : currentPage === step.page ? (
                  <svg
                    className="rtl:rotate-180 w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                ) : null}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default FormSideBar;
