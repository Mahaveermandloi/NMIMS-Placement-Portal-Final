import React from "react";
import { SERVER_URL } from "../../../../Utils/URLPath";

const PlacedStudentCard = ({ student }) => {
  return (
    <>
      <div class=" max-w-sm bg-white  lg:mt-0 mt-4 rounded-lg shadow-lg  dark:border-gray-700">
        <div class="flex flex-col items-center pb-5">
          <img
            class="w-32 h-32 mb-3 rounded-full shadow-lg mt-2"
            src={`${student.student_profile_image}`}
            alt="Bonnie image"
          />

          <h5 class="mb-1 text-xl font-medium text-gray-900 ">
            {student.name_of_student}
          </h5>
          <span class="text-sm text-gray-500 dark:text-gray-400">
            {student.job_title}
          </span>
          <span class="text-sm text-gray-500 dark:text-gray-400">
            {student.ctc} LPA | {student.year}
          </span>
          <span class="text-sm text-gray-500 dark:text-gray-400">
            <img
              src={`${student.company_logo}`}
              className="mt-2 w-20"
            />
          </span>
        </div>
      </div>
    </>
  );
};

export default PlacedStudentCard;
