// AdminRoutes.jsx

import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Sidebar from "../Components/Sidebar.jsx";
import AdminLogin from "../Auth/AdminLogin.jsx";
import ForgetPassword from "../Auth/ForgetPassword.jsx";
import Students from "../Pages/Admin/Students/Students.jsx";
import Companies from "../Pages/Admin/Companies/Companies.jsx";
import JobListings from "../Pages/Admin/Job Listing/JobListing.jsx";
import ShortlistedStudents from "../Pages/Admin/Shortlisted Students/ShortlistedStudents.jsx";
import PlacedStudents from "../Pages/Admin/Placed Students/PlacedStudents.jsx";
import Branch from "../Pages/Admin/Branch/Branch.jsx";
import Profile from "../Pages/Admin/Profile/Profile.jsx";
import Dashboard from "../Pages/Admin/Dashboard/Dashboard.jsx";
import { ADMIN_PATH } from "../Utils/URLPath.jsx";
import OTPPage from "../Auth/OTPPage.jsx";
import UpdatePassword from "../Auth/UpdatePassword.jsx";

const AdminRoutes = () => {
  const navigate = useNavigate();
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    // console.log("Document Cookies:", document.cookie); // Log all cookies
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop().split(";").shift();
    }
    return null; // Return null if cookie not found
  };

  useEffect(() => {
    const checkAuthentication = () => {
      const refreshToken = getCookie("refreshToken");

      console.log(document.cookie);
      

      const accessToken = localStorage.getItem("accessToken");

      
      if (refreshToken) {
        setIsAdminAuthenticated(true);
      } else {
        setIsAdminAuthenticated(false);
        navigate(`${ADMIN_PATH}/login`);
      }
      setLoading(false);
    };

    checkAuthentication();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Display loading indicator while checking authentication
  }

  return (
    <Routes>
      {!isAdminAuthenticated ? (
        <>
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/otp-page/:email" element={<OTPPage />} />
          <Route path="/update-password/:email" element={<UpdatePassword />} />
        </>
      ) : (
        <>
          <Route
            path={`/*`}
            element={
              <Sidebar userRole="admin">
                <Routes>
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="students" element={<Students />} />
                  <Route path="companies" element={<Companies />} />
                  <Route path="job-listings" element={<JobListings />} />
                  <Route
                    path="shortlisted-students"
                    element={<ShortlistedStudents />}
                  />
                  <Route path="placed-students" element={<PlacedStudents />} />
                  <Route path="branch" element={<Branch />} />
                  <Route path="profile" element={<Profile />} />
                  <Route
                    path="*"
                    element={<Navigate to="dashboard" replace />}
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

export default AdminRoutes;
