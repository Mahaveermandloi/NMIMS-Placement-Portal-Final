// // UserRoutes.jsx
// import React from "react";
// import { Route, Routes, Navigate } from "react-router-dom";
// import Sidebar from "../Components/Sidebar.jsx"; // Import Sidebar
// import UserLogin from "../Auth/UserLogin.jsx";
// import Companies from "../Pages/User/Companies/Companies.jsx";
// import JobListings from "../Pages/User/Job Listing/JobListing.jsx";
// import ShortlistedStudents from "../Pages/User/Shortlisted Students/ShortlistedStudents.jsx";
// import PlacedStudents from "../Pages/User/Placed Students/PlacedStudents.jsx";
// import Profile from "../Pages/User/Profile/Profile.jsx";
// import Dashboard from "../Pages/User/Dashboard/Dashboard.jsx";
// import ForgetPassword from "../Auth/ForgetPassword.jsx";
// import OTPPage from "../Auth/OTPPage.jsx";
// import UpdatePassword from "../Auth/UpdatePassword.jsx";

// const UserRoutes = () => {
//   const isAuthenticated = localStorage.getItem("accessToken") !== null;

//   return (
//     <Routes>
//       {!isAuthenticated ? (
//         <>
//           <Route path="*" element={<Navigate to="/student/login" replace />} />
//           <Route path="forget-password" element={<ForgetPassword />} /> {/* Relative path */}
//           <Route path="otp-page/:email" element={<OTPPage />} /> {/* Relative path */}
//           <Route path="update-password/:email" element={<UpdatePassword />} /> {/* Relative path */}
//         </>
//       ) : (
//         <Route
//           path="/"
//           element={
//             <Sidebar userRole="user">
//               <Routes>
//                 <Route path="dashboard" element={<Dashboard />} /> {/* Relative path */}
//                 <Route path="companies" element={<Companies />} /> {/* Relative path */}
//                 <Route path="job-listings" element={<JobListings />} /> {/* Relative path */}
//                 <Route
//                   path="shortlisted-students"
//                   element={<ShortlistedStudents />}
//                 />
//                 <Route path="placed-students" element={<PlacedStudents />} />
//                 <Route path="profile" element={<Profile />} />

//                 <Route
//                   path="*"
//                   element={<Navigate to="/dashboard" replace />}
//                 />
//               </Routes>
//             </Sidebar>
//           }
//         />
//       )}

//       <Route path="/login" element={<UserLogin />} />
//     </Routes>
//   );
// };

// export default UserRoutes;

import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import Sidebar from "../Components/Sidebar.jsx"; // Import Sidebar
import UserLogin from "../Auth/UserLogin.jsx";
import Companies from "../Pages/User/Companies/Companies.jsx";
import JobListings from "../Pages/User/Job Listing/JobListing.jsx";
import ShortlistedStudents from "../Pages/User/Shortlisted Students/ShortlistedStudents.jsx";
import PlacedStudents from "../Pages/User/Placed Students/PlacedStudents.jsx";
import Profile from "../Pages/User/Profile/Profile.jsx";
import Dashboard from "../Pages/User/Dashboard/Dashboard.jsx";
import ForgetPassword from "../Auth/ForgetPassword.jsx";
import OTPPage from "../Auth/OTPPage.jsx";
import UpdatePassword from "../Auth/UpdatePassword.jsx";
import ChangePassword from "../Pages/User/Profile/ChangePassword.jsx";
import UpdateProfile from "../Pages/User/Profile/UpdateProfile.jsx";
import CompanyDetail from "../Pages/Admin/Companies/CompanyDetail.jsx";

// const UserRoutes = () => {
//   const isAuthenticated = localStorage.getItem("accessToken") !== null;

//   return (
//     <Routes>
//       {!isAuthenticated ? (
//         <>
//           <Route path="/student/login" element={<UserLogin />} />
//           <Route path="/forget-password" element={<ForgetPassword />} />
//           <Route path="/otp-page/:email" element={<OTPPage />} />
//           <Route path="/update-password/:email" element={<UpdatePassword />} />
//           <Route path="*" element={<Navigate to="/student/login" replace />} />
//         </>
//       ) : (
//         <>
//           <Route
//             path="/student/*"
//             element={
//               <Sidebar userRole="user">
//                 <Routes>
//                   <Route path="dashboard" element={<Dashboard />} />
//                   <Route path="companies" element={<Companies />} />
//                   <Route path="job-listings" element={<JobListings />} />
//                   <Route
//                     path="shortlisted-students"
//                     element={<ShortlistedStudents />}
//                   />

//                   <Route path="placed-students" element={<PlacedStudents />} />
//                   <Route path="profile" element={<Profile />} />
//                   <Route path="change-password" element={<ChangePassword />} />
//                   <Route path="update-profile" element={<UpdateProfile />} />

//                   <Route
//                     path="*"
//                     element={<Navigate to="/student/dashboard" replace />}
//                   />
//                 </Routes>
//               </Sidebar>
//             }
//           />
//         </>
//       )}
//     </Routes>
//   );
// };

const UserRoutes = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Function to get cookie by name
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop().split(";").shift();
    }
    return null;
  };

  useEffect(() => {
    const checkAuthentication = () => {
      const refreshToken = getCookie("refreshToken");

      if (refreshToken) {
        // Optionally, you could verify the refreshToken with the server
        // to ensure it's valid and hasn't expired.
        // For simplicity, assuming the token is valid if it's present.
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        navigate("/student/login"); // Redirect to login if not authenticated
      }
      setLoading(false);
    };

    checkAuthentication();
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>; // Display loading indicator while checking authentication
  }

  return (
    <Routes>
      {!isAuthenticated ? (
        <>
          <Route path="/student/login" element={<UserLogin />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/otp-page/:email" element={<OTPPage />} />
          <Route path="/update-password/:email" element={<UpdatePassword />} />
          <Route path="*" element={<Navigate to="/student/login" replace />} />
        </>
      ) : (
        <>
          <Route
            path="/student/*"
            element={
              <Sidebar userRole="student">
                <Routes>
                  <Route path="dashboard" element={<Dashboard />} />

                  <Route path="companies" element={<Companies />} />
                  <Route
                    path="company-detail/:id"
                    element={<CompanyDetail />}
                  />

                  <Route path="job-listings" element={<JobListings />} />
                  <Route
                    path="shortlisted-students"
                    element={<ShortlistedStudents />}
                  />
                  <Route path="placed-students" element={<PlacedStudents />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="change-password" element={<ChangePassword />} />
                  <Route path="update-profile" element={<UpdateProfile />} />
                  <Route
                    path="*"
                    element={<Navigate to="/student/dashboard" replace />}
                  />
                </Routes>
              </Sidebar>
            }
          />
        </>
      )}
    </Routes>
  );
};

export default UserRoutes;
