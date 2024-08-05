import React from "react";

const JobCard = ({ company }) => {
  return (
    <>
      <div className="flex   flex-row items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-md dark:border-gray-700">
        <img
          className="object-cover lg:w-32 lg:h-32 ml-4  h-20 w-20"
          src={company.logo}
          alt="Company Logo"
        />

        <div className="flex flex-col justify-between p-4  leading-normal">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900">
            {company.name}
          </h5>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-400">
            Package: {company.package} LPA
          </p>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-400">
            Year: {company.year}
          </p>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-400">
            Designation: {company.designation}
          </p>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-400">
            Rounds: {company.rounds}
          </p>
          <div className="flex mt-3 space-x-2">
            <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm">
              Edit
            </button>
            <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm">
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobCard;
