import React, { useEffect, useState } from "react";
import { SERVER_URL } from "../../../Utils/URLPath";
import { getApi, putApi } from "../../../Utils/API";
import Loader from "../../../Components/Loader";
import { BasicDetails } from "./BasicDetails.jsx";
import { TenthStats } from "./TenthStats.jsx";
import { TwelfthStats } from "./TwelfthStats.jsx";
import { DiplomaStats } from "./DiplomaStats.jsx";
import { CollegeStats } from "./CollegeStats.jsx";
import { Skills } from "./Skills.jsx";
import { GiBookCover } from "react-icons/gi";
import { IoCamera } from "react-icons/io5";

import { InternshipAndExperienceDetails } from "./InternshipAndExperienceDetails.jsx";
import { Projects } from "./Projects.jsx";
import { ExtraCurricularActivities } from "./ExtraCurricularActivities.jsx";
import { AdditionalDetails } from "./AdditionalDetails.jsx";

// const ProfilePage = () => {
//   const [profile, setProfile] = useState(null); // State to store profile data
//   const [studentData, setStudentData] = useState({});
//   const [loading, setLoading] = useState(true); // Loading state
//   const [activeSection, setActiveSection] = useState("basic-details"); // Track active section

//   // Fetch the student profile and SAP number
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const response = await getApi("/api/student/get-profile");
//         setProfile(response.data);
//         const studentSapNo = response.data.student_sap_no;
//         fetchStudentData(studentSapNo);
//       } catch (error) {
//         console.error("Failed to fetch profile", error);
//       } finally {
//         setLoading(false); // Hide loader after fetching data
//       }
//     };

//     fetchProfile();
//   }, []);

//   // Fetch student details by SAP number
//   const fetchStudentData = async (student_sap_no) => {
//     try {
//       setLoading(true); // Start loading before fetching
//       const response = await getApi(
//         `/api/student/get-student-details-by-id/${student_sap_no}`
//       );
//       console.log(response);
//       setStudentData(response.data);
//     } catch (error) {
//       console.error("Error fetching student data:", error);
//     } finally {
//       setLoading(false); // End loading after fetching is complete
//     }
//   };

//   // Loader
//   if (loading) {
//     return <Loader message="Loading..." />;
//   }

//   // Dynamic section rendering
//   const renderSection = () => {
//     switch (activeSection) {
//       case "basic-details":
//         return <BasicDetails studentData={studentData} />;
//       case "education-details":
//         return <EducationDetails studentData={studentData} />;
//       case "skills":
//         return <Skills studentData={studentData} />;
//       case "internship-experience":
//         return <InternshipAndExperienceDetails studentData={studentData} />;
//       // case "projects":
//       //   return <Projects studentData={studentData} />;
//       // case "extra-curricular":
//       //   return <ExtraCurricularActivities studentData={studentData} />;
//       default:
//         return <BasicDetails studentData={studentData} />;
//     }
//   };

//   return (
//     <div className="flex lg:flex-row flex-col  w-full gap-5 ">
//       {/* Sidebar with 1/3 width */}
//       <div className="lg:w-1/4  lg:h-[86vh] overflow-y-auto bg-white shadow-md rounded-lg p-4">
//         {/* <div className="flex flex-col items-center mb-8">
//           <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
//             <img
//               src={`${SERVER_URL}${profile.student_profile_image}`}
//               alt="Profile"
//               className="w-full h-full"
//             />

//           </div>
//           <h2 className="text-xl font-serif">{profile.name_of_student}</h2>
//           <h2 className="text-lg font-serif mb-4">
//             SAP ID: {profile.student_sap_no}
//           </h2>
//         </div> */}

//         <div className="flex flex-col items-center mb-8">
//           <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4 group">
//             <img
//               src={`${SERVER_URL}${profile.student_profile_image}`}
//               alt="Profile"
//               className="w-full h-full"
//             />

//             {/* Overlay that appears on hover */}
//             <div className="absolute inset-0 bg-gray-600 bg-opacity-60 opacity-0 group-hover:opacity-100 flex justify-center items-center transition-opacity duration-300">
//               <label
//                 htmlFor="profile-image-upload"
//                 className="text-white text-sm cursor-pointer px-3 py-1  rounded-lg"
//               >
//                 <IoCamera size={30} className="text-white " />
//               </label>
//               <input
//                 type="file"
//                 id="profile-image-upload"
//                 className="hidden"
//                 // onChange={handleProfileImageUpload}

//               />
//             </div>
//           </div>

//           <h2 className="text-xl font-serif">{profile.name_of_student}</h2>
//           <h2 className="text-lg font-serif mb-4">
//             SAP ID: {profile.student_sap_no}
//           </h2>
//         </div>

//         <div className="space-y-4 font-serif">
//           {/* Sidebar Links */}
//           <button
//             onClick={() => setActiveSection("basic-details")}
//             className={`block w-full text-left py-2 px-4 rounded ${
//               activeSection === "basic-details" ? "bg-gray-300" : "bg-gray-100"
//             } hover:bg-gray-200`}
//           >
//             Basic Details
//           </button>
//           <button
//             onClick={() => setActiveSection("education-details")}
//             className={`block w-full text-left py-2 px-4 rounded ${
//               activeSection === "education-details"
//                 ? "bg-gray-300"
//                 : "bg-gray-100"
//             } hover:bg-gray-200`}
//           >
//             Education Details
//           </button>
//           <button
//             onClick={() => setActiveSection("skills")}
//             className={`block w-full text-left py-2 px-4 rounded ${
//               activeSection === "skills" ? "bg-gray-300" : "bg-gray-100"
//             } hover:bg-gray-200`}
//           >
//             Skills
//           </button>
//           <button
//             onClick={() => setActiveSection("internship-experience")}
//             className={`block w-full text-left py-2 px-4 rounded ${
//               activeSection === "internship-experience"
//                 ? "bg-gray-300"
//                 : "bg-gray-100"
//             } hover:bg-gray-200`}
//           >
//             Internship & Experience
//           </button>
//         </div>
//       </div>

//       {/* Main content area with 2/3 width */}
//       <div className="lg:w-3/4  lg:h-[86vh]   lg:overflow-y-auto bg-white shadow-md rounded-lg p-4 lg:p-8">
//         {renderSection()}
//       </div>
//     </div>
//   );
// };

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [studentData, setStudentData] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("basic-details");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getApi("/api/student/get-profile");
        setProfile(response.data);
        const studentSapNo = response.data.student_sap_no;
        fetchStudentData(studentSapNo);
      } catch (error) {
        console.error("Failed to fetch profile", error);
      } finally {
        setLoading(false); // Hide loader after fetching data
      }
    };

    fetchProfile();
  }, []);

  const fetchStudentData = async (student_sap_no) => {
    try {
      setLoading(true); // Start loading before fetching
      const response = await getApi(
        `/api/student/get-student-details-by-id/${student_sap_no}`
      );
      console.log(response);
      setStudentData(response.data);
    } catch (error) {
      console.error("Error fetching student data:", error);
    } finally {
      setLoading(false); // End loading after fetching is complete
    }
  };

  // const handleProfileImageUpload = async (event) => {
  //   const file = event.target.files[0];
  //   if (!file) return;

  //   const payload = { studentData.student_sap_no , file }

  //   try {
  //     setLoading(true);
  //     const response = await putApi(payload, "/api/updateprofileimage");

  //     if (response.statusCode === 200) {
  //       setProfile((prevProfile) => ({
  //         ...prevProfile,
  //         student_profile_image: response.data.updatedImage,
  //       }));
  //     }
  //   } catch (error) {
  //     console.error("Failed to upload profile image", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleProfileImageUpload = async (event) => {
    const student_profile_image = event.target.files[0];
    if (!student_profile_image) return;

    const payload = {
      student_sap_no: studentData.student_sap_no,
      student_profile_image,
    };

    try {
      setLoading(true);
      const response = await putApi(payload, "/api/updateprofileimage");

      if (response.statusCode === 200) {
        setProfile((prevProfile) => ({
          ...prevProfile,
          student_profile_image: response.data.profileImagePath,
        }));
      }
    } catch (error) {
      console.error("Failed to upload profile image", error);
    } finally {
      setLoading(false);
    }
  };

  // Loader
  if (loading) {
    return <Loader message="Loading..." />;
  }

  // Dynamic section rendering
  const renderSection = () => {
    switch (activeSection) {
      case "basic-details":
        return <BasicDetails studentData={studentData} />;
      case "education-details":
        return <EducationDetails studentData={studentData} />;
      case "skills":
        return <Skills studentData={studentData} />;
      // case "internship-experience":
      // return <InternshipAndExperienceDetails studentData={studentData} />;
      default:
        return <BasicDetails studentData={studentData} />;
    }
  };

  return (
    <div className="flex lg:flex-row flex-col  w-full gap-5 ">
      {/* Sidebar with 1/3 width */}
      <div className="lg:w-1/4 lg:h-[86vh] overflow-y-auto bg-white shadow-md rounded-lg p-4">
        <div className="flex flex-col items-center mb-8">
          <div className="relative  w-32 h-32 rounded-full overflow-hidden mb-4 group">
            <img
              src={`${SERVER_URL}${profile.student_profile_image}`}
              alt="Profile"
              className="w-full h-full"
            />

            {/* Overlay that appears on hover */}
            <div className="absolute inset-0 bg-gray-600 bg-opacity-60 opacity-0 group-hover:opacity-100 flex justify-center items-center transition-opacity duration-300">
              <label
                htmlFor="student_profile_image"
                className="text-white text-sm cursor-pointer px-3 py-1  rounded-lg"
              >
                <IoCamera size={30} className="text-white " />
                <input
                  type="file"
                  id="student_profile_image"
                  className="hidden"
                  onChange={handleProfileImageUpload}
                />
              </label>
            </div>
          </div>

          <h2 className="text-xl font-serif">{profile.name_of_student}</h2>
          <h2 className="text-lg font-serif mb-4">
            SAP ID: {profile.student_sap_no}
          </h2>
        </div>

        <div className="space-y-4 font-serif">
          {/* Sidebar Links */}
          <button
            onClick={() => setActiveSection("basic-details")}
            className={`block w-full text-left py-2 px-4 rounded ${
              activeSection === "basic-details" ? "bg-gray-300" : "bg-gray-100"
            } hover:bg-gray-200`}
          >
            Basic Details
          </button>
          <button
            onClick={() => setActiveSection("education-details")}
            className={`block w-full text-left py-2 px-4 rounded ${
              activeSection === "education-details"
                ? "bg-gray-300"
                : "bg-gray-100"
            } hover:bg-gray-200`}
          >
            Education Details
          </button>
          <button
            onClick={() => setActiveSection("skills")}
            className={`block w-full text-left py-2 px-4 rounded ${
              activeSection === "skills" ? "bg-gray-300" : "bg-gray-100"
            } hover:bg-gray-200`}
          >
            Skills
          </button>
        </div>
      </div>

      {/* Main content area with 2/3 width */}
      <div className="lg:w-3/4 lg:h-[86vh] lg:overflow-y-auto bg-white shadow-md rounded-lg p-4 lg:p-8">
        {renderSection()}
      </div>
    </div>
  );
};

export default ProfilePage;

// EducationDetails Component
const EducationDetails = ({ studentData }) => {
  return (
    <div className="">
      <h3 className="font-serif w-full font-bold text-lg text-gray-800 flex-shrink-0 pr-4 py-4">
        <div className="flex w-full justify-between gap-3 items-center">
          <div className="flex gap-5 items-center">
            {/* <TbListDetails size={30} /> */}
            <GiBookCover size={30} />
            Educational Details
          </div>
        </div>
      </h3>
      <div className="flex-grow border-t border-gray-300 mb-4"></div>

      <div className="px-5">
        <TenthStats studentData={studentData} />
        <TwelfthStats studentData={studentData} />
        <DiplomaStats studentData={studentData} />
        <CollegeStats studentData={studentData} />
        <AdditionalDetails studentData={studentData} />
      </div>
    </div>
  );
};
