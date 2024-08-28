// import React from "react";

// const CompanyCard = ({ company }) => {
//   return (
//     <>
//       <div className="flex   flex-row items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-md dark:border-gray-700">
//         <img
//           className="object-cover lg:w-32 lg:h-32 ml-4  h-20 w-20"
//           src={company.logo}
//           alt="Company Logo"
//         />

//         <div className="flex flex-col justify-between p-4  leading-normal">
//           <h5 className="text-xl font-semibold tracking-tight text-gray-900">
//             {company.name}
//           </h5>
//           <p className="text-sm font-medium text-gray-700 dark:text-gray-400">
//             Package: {company.package} LPA
//           </p>
//           <p className="text-sm font-medium text-gray-700 dark:text-gray-400">
//             Year: {company.year}
//           </p>
//           <p className="text-sm font-medium text-gray-700 dark:text-gray-400">
//             Designation: {company.designation}
//           </p>
//           <p className="text-sm font-medium text-gray-700 dark:text-gray-400">
//             Rounds: {company.rounds}
//           </p>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CompanyCard;

import React from "react";
import { SERVER_URL } from "../../../../Utils/URLPath";

const CompanyCard = ({ company }) => {
  return (
    <div className="flex flex-row items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-md dark:border-gray-700">
      <div className="flex-shrink-0">
        <img
          className="object-contain w-20 p-2"
          src={`${SERVER_URL}${company.logo}`}
          alt={`${company.name} Logo`}
        />
      </div>

      <div className="flex flex-col justify-between p-4 leading-normal">
        <h5 className="text-xl font-semibold tracking-tight text-gray-900">
          {company.name}
        </h5>
        <p className="text-sm font-medium text-gray-700 dark:text-gray-400">
          Year: {company.year}
        </p>
      </div>
    </div>
  );
};

export default CompanyCard;
