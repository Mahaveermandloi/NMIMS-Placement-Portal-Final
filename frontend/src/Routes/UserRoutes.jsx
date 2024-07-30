// UserRoutes.jsx
import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Sidebar from "../Components/Sidebar.jsx"; // Import Sidebar
import UserLogin from "../Auth/UserLogin.jsx";
import Companies from "../Pages/User/Companies/Companies.jsx";
import JobListings from "../Pages/User/Job Listing/JobListing.jsx";
import ShortlistedStudents from "../Pages/User/Shortlisted Students/ShortlistedStudents.jsx";
import PlacedStudents from "../Pages/User/Placed Students/PlacedStudents.jsx";
import Profile from "../Pages/User/Profile/Profile.jsx";
import Dashboard from "../Pages/User/Dashboard/Dashboard.jsx";

const UserRoutes = () => {
  const isAuthenticated = localStorage.getItem("accessToken") !== null;

  return (
    <Routes>
      {!isAuthenticated ? (
        <Route path="*" element={<Navigate to="/login" replace />} />
      ) : (
        
        <Route
          path="/"
          element={
            <Sidebar userRole="user">

              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/companies" element={<Companies />} />
                <Route path="/job-listings" element={<JobListings />} />
                <Route
                  path="/shortlisted-students"
                  element={<ShortlistedStudents />}
                />
                <Route path="/placed-students" element={<PlacedStudents />} />
                <Route path="/profile" element={<Profile />} />

                <Route
                  path="*"
                  element={<Navigate to="/dashboard" replace />}
                />
              </Routes>
            </Sidebar>
          }
        />
      )}

      <Route path="/login" element={<UserLogin />} />
    </Routes>
  );
};

export default UserRoutes;
