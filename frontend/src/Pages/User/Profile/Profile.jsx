// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { STUDENT_PATH, SERVER_URL } from "../../../Utils/URLPath";
// import { getApi } from "../../../Utils/API";
// import Loader from "../../../Components/Loader";

// const ProfilePage = () => {
//   const [profile, setProfile] = useState(null); // State to store profile data
//   const [loading, setLoading] = useState(true); // State to handle loading state
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const response = await getApi("/api/student/get-profile");
//         console.log(response.data);
//         setProfile(response.data);
//       } catch (error) {
//         console.error("Failed to fetch profile", error);
//       } finally {
//         setLoading(false); // Hide loader after fetching data
//       }
//     };

//     fetchProfile();
//   }, []);

//   if (loading) {
//     return <Loader message="Loading..." />; // Show loader while data is being fetched
//   }

//   const handleDownload = (fileUrl) => {
//     const link = document.createElement("a");
//     link.href = fileUrl;
//     link.download = fileUrl.split("/").pop(); // Extract file name from URL
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   return (
//     <div className="flex flex-col items-center justify-center py-10">
//       <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
//         <div className="flex flex-col items-center mb-8">
//           <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
//             <img
//               src={`${SERVER_URL}${profile.student_profile_image}`} // Use profile image URL from API
//               alt="Profile"
//               className="w-full h-full object-cover"
//             />
//           </div>
//           <h2 className="text-xl font-semibold mb-1">
//             {profile.name_of_student}
//           </h2>
//           <p className="text-gray-600">SAP ID: {profile.student_sap_no}</p>
//           <p className="text-gray-600">Email: {profile.student_email_id}</p>
//           <p className="text-gray-600">
//             College Mail: {profile.student_alternate_email_id}
//           </p>
//           <p className="text-gray-600">
//             Mobile No: {profile.student_mobile_no}
//           </p>
//         </div>

//         <div className="grid grid-cols-2 gap-4 ">
//           <button
//             onClick={() => navigate(`${STUDENT_PATH}/update-profile`)}
//             className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
//           >
//             Update Profile
//           </button>

//           <button
//             onClick={() => navigate(`${STUDENT_PATH}/change-password`)}
//             className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
//           >
//             Change Password
//           </button>

//           {profile.student_cv && (
//             <button
//               onClick={() =>
//                 handleDownload(`${SERVER_URL}${profile.student_cv}`)
//               }
//               className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
//             >
//               Download Resume
//             </button>
//           )}

//           {profile.student_marksheet && (
//             <button
//               onClick={() =>
//                 handleDownload(`${SERVER_URL}${profile.student_marksheet}`)
//               }
//               className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition duration-300"
//             >
//               Download Marksheet
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { STUDENT_PATH, SERVER_URL } from "../../../Utils/URLPath";
import { getApi } from "../../../Utils/API";
import Loader from "../../../Components/Loader";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null); // State to store profile data
  const [loading, setLoading] = useState(true); // State to handle loading state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getApi("/api/student/get-profile");
        console.log(response.data);
        setProfile(response.data);
      } catch (error) {
        console.error("Failed to fetch profile", error);
      } finally {
        setLoading(false); // Hide loader after fetching data
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <Loader message="Loading..." />; // Show loader while data is being fetched
  }

  const handleDownload = (fileUrl) => {
    window.open(fileUrl, "_blank"); // Open the file URL in a new tab
  };

  return (
    <div className="flex flex-col items-center justify-center py-10">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <div className="flex flex-col items-center mb-8">
          <div className="w-32 h-32 rounded-full overflow-hidden mb-4  ">
            <img
              src={`${SERVER_URL}${profile.student_profile_image}`} // Use profile image URL from API
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="text-center flex flex-col gap-2">
            <h2 className="text-xl font-bold mb-1">
              {profile.name_of_student}
            </h2>
            <p className="text-gray-600 lg:text-lg font-bold text-sm">
              SAP ID: {profile.student_sap_no}
            </p>
            <p className="text-gray-600 lg:text-lg text-sm">
              Email: {profile.student_email_id}
            </p>
            <p className="text-gray-600 lg:text-lg text-sm">
              College Mail: {profile.student_alternate_email_id}
            </p>
            <p className="text-gray-600 lg:text-lg text-sm">
              Mobile No: {profile.student_mobile_no}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => navigate(`${STUDENT_PATH}/update-profile`)}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 "
          >
            Update Profile
          </button>

          <button
            onClick={() => navigate(`${STUDENT_PATH}/change-password`)}
            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
          >
            Change Password
          </button>

          {profile.student_cv && (
            <button
              onClick={() =>
                handleDownload(`${SERVER_URL}${profile.student_cv}`)
              }
              className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
            >
              View Resume
            </button>
          )}

          {profile.student_marksheet && (
            <button
              onClick={() =>
                handleDownload(`${SERVER_URL}${profile.student_marksheet}`)
              }
              className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition duration-300"
            >
              View Marksheet
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
