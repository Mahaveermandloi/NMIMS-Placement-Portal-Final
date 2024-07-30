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
import { BASE_PATH } from "../Utils/URLPath.jsx";

const AdminRoutes = () => {
  const navigate = useNavigate();
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Function to get cookie by name
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  useEffect(() => {
    const checkAuthentication = () => {
      const refreshToken = getCookie("refreshToken");
      if (refreshToken) {
        setIsAdminAuthenticated(true);
      } else {
        setIsAdminAuthenticated(false);
        navigate(`${BASE_PATH}/login`);
      }
      setLoading(false); // Set loading to false after checking
    };

    checkAuthentication();
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>; // Display loading indicator while checking authentication
  }

  return (
    <Routes>
      {!isAdminAuthenticated ? (
        <>
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
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
