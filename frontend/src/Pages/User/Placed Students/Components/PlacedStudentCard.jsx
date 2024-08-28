// import React from "react";
// import { SERVER_URL } from "../../../../Utils/URLPath";

// const PlacedStudentCard = () => {
//   return (
//     <>
//       <div class=" max-w-sm bg-white  lg:mt-0 mt-4 rounded-lg shadow-lg  dark:border-gray-700">

//         <div class="flex flex-col items-center mt-5 pb-10">
//           <img
//             class="w-32 h-32 mb-3 rounded-full shadow-lg"
//             src="https://media.licdn.com/dms/image/v2/D4D03AQGWs5dU2e5omA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1703488826683?e=2147483647&v=beta&t=YkrgLeCV7j3EMSqPC0jxMOiV2DWtwI1xgJurn7e4pQI"
//             alt="Bonnie image"
//           />
//           <h5 class="mb-1 text-xl font-medium text-gray-900 ">Sneh Bagdi</h5>
//           <span class="text-sm text-gray-500 dark:text-gray-400">
//             Associate Software Developer
//           </span>
//           <span class="text-sm text-gray-500 dark:text-gray-400">11.6 LPA</span>
//           <span class="text-sm text-gray-500 dark:text-gray-400">
//             <img
//               src="https://upload.wikimedia.org/wikipedia/commons/0/04/Nomura_Holdings_logo.svg"
//               alt=""
//               className="mt-2"
//             />
//           </span>
//         </div>
//       </div>
//     </>
//   );
// };

// export default PlacedStudentCard;

// import React from "react";
// import { SERVER_URL } from "../../../../Utils/URLPath.jsx";

// const PlacedStudentCard = ({ student }) => {
//   return (
//     <>
//       <div class=" max-w-sm bg-white  lg:mt-0 mt-4 rounded-lg shadow-lg  dark:border-gray-700">
//         <div class="flex flex-col items-center pb-10">
//           <img
//             class="w-32 h-32 mb-3 rounded-full shadow-lg"
//             src={student.student_profile_image}
//             alt="Bonnie image"
//           />
//           <h5 class="mb-1 text-xl font-medium text-gray-900 ">
//             {student.name_of_student}
//           </h5>
//           <span class="text-sm text-gray-500 dark:text-gray-400">
//             {student.job_title}
//           </span>
//           <span class="text-sm text-gray-500 dark:text-gray-400">
//             {student.ctc}
//           </span>
//           <span class="text-sm text-gray-500 dark:text-gray-400">
//             <img
//               src={`${SERVER_URL}${student.company_logo}`}
//               className="mt-2"
//             />
//           </span>
//         </div>
//       </div>
//     </>
//   );
// };

// export default PlacedStudentCard;

import React from "react";
import { SERVER_URL } from "../../../../Utils/URLPath";

const PlacedStudentCard = ({ student }) => {
  return (
    <>
      <div class=" max-w-sm bg-white  lg:mt-0 mt-4 rounded-lg shadow-lg  dark:border-gray-700">
        <div class="flex flex-col items-center pb-5">
          <img
            class="w-32 h-32 mb-3 rounded-full shadow-lg mt-2"
            src={student.student_profile_image}
            alt="Bonnie image"
          />
          <h5 class="mb-1 text-xl font-medium text-gray-900 ">
            {student.name_of_student}
          </h5>
          <span class="text-sm text-gray-500 dark:text-gray-400">
            {student.job_title}
          </span>
          <span class="text-sm text-gray-500 dark:text-gray-400">
            {student.ctc} | {student.year}
          </span>
          <span class="text-sm text-gray-500 dark:text-gray-400">
            <img
              src={`${SERVER_URL}${student.company_logo}`}
              className="mt-2 w-20"
            />
          </span>
        </div>
      </div>
    </>
  );
};

export default PlacedStudentCard;
