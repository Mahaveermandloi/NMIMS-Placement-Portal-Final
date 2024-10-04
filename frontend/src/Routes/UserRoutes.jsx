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
import JobDetailsPage from "../Pages/User/Job Listing/Components/JobDetailsPage.jsx";
import FormPage from "../Pages/User/Register/FormPage.jsx";
import { STUDENT_PATH } from "../Utils/URLPath.jsx";
import Notifications from "../Pages/User/Notifications/Notifications.jsx";

const UserRoutes = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    const checkAuthentication = () => {
      const refreshToken = localStorage.getItem("refreshToken");

      if (refreshToken) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }

      setLoading(false); // Finish loading after checking authentication
    };

    checkAuthentication();
  }, []);

  // Show a loading spinner or similar while loading
  if (loading) {
    return <div>Loading...</div>; // You can replace this with a spinner or placeholder
  }

  return (
    <>
      <Routes>
        {!isAuthenticated ? (
          <>
            <Route path="/student/login" element={<UserLogin />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route path="/register" element={<FormPage />} />
            <Route path="/otp-page/:email" element={<OTPPage />} />
            <Route
              path="/update-password/:email"
              element={<UpdatePassword />}
            />
            <Route
              path="*"
              element={<Navigate to="/student/login" replace />}
            />
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
                    <Route path="notifications" element={<Notifications />} />
                    <Route
                      path="company-detail/:id"
                      element={<CompanyDetail />}
                    />
                    <Route path="job-listings" element={<JobListings />} />
                    <Route
                      path="job-listings/:id"
                      element={<JobDetailsPage />}
                    />
                    <Route
                      path="shortlisted-students"
                      element={<ShortlistedStudents />}
                    />
                    <Route
                      path="placed-students"
                      element={<PlacedStudents />}
                    />
                    <Route path="profile" element={<Profile />} />
                    <Route
                      path="change-password"
                      element={<ChangePassword />}
                    />
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
    </>
  );
};

export default UserRoutes;
