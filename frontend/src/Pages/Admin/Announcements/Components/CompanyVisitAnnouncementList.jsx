// import React from "react";
// import { FiEdit } from "react-icons/fi";
// import { AiOutlineDelete } from "react-icons/ai";
// import { getApi  } from "../../../../Utils/API";

// const CompanyVisitAnnouncementList = () => {
//   // Dummy data for the company visit announcements
//   const announcements = [
//     {
//       companyName: "Tech Innovators Inc.",
//       companyLogo: "https://via.placeholder.com/64", // Placeholder image
//       rolesOffered: "Software Engineer, Product Manager",
//       date: "2024-09-15",
//     },
//     {
//       companyName: "Creative Solutions Ltd.",
//       companyLogo: "https://via.placeholder.com/64", // Placeholder image
//       rolesOffered: "UX Designer, Frontend Developer",
//       date: "2024-09-20",
//     },
//     {
//       companyName: "Future Tech Co.",
//       companyLogo: "https://via.placeholder.com/64", // Placeholder image
//       rolesOffered: "Data Scientist, Backend Engineer",
//       date: "2024-09-25",
//     },
//     {
//       companyName: "Future Tech Co.",
//       companyLogo: "https://via.placeholder.com/64", // Placeholder image
//       rolesOffered: "Data Scientist, Backend Engineer",
//       date: "2024-09-25",
//     },
//   ];

  
//   // 

//   return (
//     <div className=" grid grid-cols-4 gap-5">
//       {announcements.map((announcement, index) => (
//         <CompanyVisitAnnouncementCard
//           key={index}
//           companyName={announcement.companyName}
//           companyLogo={announcement.companyLogo}
//           rolesOffered={announcement.rolesOffered}
//           date={announcement.date}
//         />
//       ))}
//     </div>
//   );
// };

// export default CompanyVisitAnnouncementList;

// const CompanyVisitAnnouncementCard = ({
//   companyName,
//   companyLogo,
//   rolesOffered,
//   date,
// }) => {
//   return (
//     <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
//       {/* Company Logo */}

//       <div className="flex gap-5 ">
//         <img
//           src={companyLogo}
//           alt={`${companyName} Logo`}
//           className="mb-4 w-16 h-16 object-cover rounded-full"
//         />

//         {/* Company Name */}
//         <h5 className="mb-2 text-xl   text-gray-900 ">
//           {companyName}
//         </h5>
//       </div>
//       {/* Roles Offered */}
//       <p className="mb-2 font-normal text-gray-700 dark:text-gray-400">
//         Roles Offered: {rolesOffered}
//       </p>

//       {/* Date */}
//       <p className="mb-4 font-normal text-gray-700 dark:text-gray-400">
//         Date: {date}
//       </p>

//       <div className="flex space-x-4">
//         <button
//           type="button"
//           className="text-blue-500 hover:text-blue-700"
//           aria-label="Edit"
//         >
//           <FiEdit size={24} />
//         </button>
//         <button
//           type="button"
//           className="text-red-500 hover:text-red-700"
//           aria-label="Delete"
//         >
//           <AiOutlineDelete size={24} />
//         </button>
//       </div>
//     </div>
//   );
// };



import React from "react";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";

const CompanyVisitAnnouncementList = ({ announcements }) => {
  return (
    <div className="grid grid-cols-4 gap-5">
      {announcements.map((announcement, index) => (
        <CompanyVisitAnnouncementCard
          key={index}
          companyName={announcement.companyName}
          companyLogo={announcement.companyLogo || "https://via.placeholder.com/64"} // Fallback image
          rolesOffered={announcement.rolesOffered}
          date={announcement.date}
        />
      ))}
    </div>
  );
};

export default CompanyVisitAnnouncementList;

const CompanyVisitAnnouncementCard = ({
  companyName,
  companyLogo,
  rolesOffered,
  date,
}) => {
  return (
    <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
      {/* Company Logo */}
      <div className="flex gap-5">
        <img
          src={companyLogo}
          alt={`${companyName} Logo`}
          className="mb-4 w-16 h-16 object-cover rounded-full"
        />

        {/* Company Name */}
        <h5 className="mb-2 text-xl text-gray-900">{companyName}</h5>
      </div>
      {/* Roles Offered */}
      <p className="mb-2 font-normal text-gray-700 dark:text-gray-400">
        Roles Offered: {rolesOffered}
      </p>

      {/* Date */}
      <p className="mb-4 font-normal text-gray-700 dark:text-gray-400">
        Date: {date}
      </p>

      <div className="flex space-x-4">
        <button
          type="button"
          className="text-blue-500 hover:text-blue-700"
          aria-label="Edit"
        >
          <FiEdit size={24} />
        </button>
        <button
          type="button"
          className="text-red-500 hover:text-red-700"
          aria-label="Delete"
        >
          <AiOutlineDelete size={24} />
        </button>
      </div>
    </div>
  );
};
