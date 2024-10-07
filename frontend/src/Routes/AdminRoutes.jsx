// AdminRoutes.jsx
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Sidebar from "../Components/Sidebar.jsx";
import AdminLogin from "../Auth/AdminLogin.jsx";
import ForgetPassword from "../Auth/ForgetPassword.jsx";
import Companies from "../Pages/Admin/Companies/Companies.jsx";
import JobListings from "../Pages/Admin/Job Listing/JobListing.jsx";
import ShortlistedStudents from "../Pages/Admin/Shortlisted Students/ShortlistedStudents.jsx";
import PlacedStudents from "../Pages/Admin/Placed Students/PlacedStudents.jsx";
import Branch from "../Pages/Admin/Branch/Branch.jsx";
import Profile from "../Pages/Admin/Profile/Profile.jsx";
import Dashboard from "../Pages/Admin/Dashboard/Dashboard.jsx";
import { ADMIN_PATH, SERVER_URL } from "../Utils/URLPath.jsx";
import OTPPage from "../Auth/OTPPage.jsx";
import UpdatePassword from "../Auth/UpdatePassword.jsx";
import ChangePassword from "../Pages/Admin/Profile/ChangePassword.jsx";
import UpdateProfile from "../Pages/Admin/Profile/UpdateProfile.jsx";
import StudentRequest from "../Pages/Admin/Students/StudentRequest.jsx";
import StudentDetails from "../Pages/Admin/Students/StudentDetails.jsx";
import UploadStudentData from "../Pages/Admin/Students/UploadStudentData.jsx";
import StudentCompleteDetails from "../Pages/Admin/Students/Components/StudentCompleteDetails.jsx";
import UploadCompaniesDetails from "../Pages/Admin/Companies/CompaniesUploadDetails.jsx";
import JobUploadDetails from "../Pages/Admin/Job Listing/JobUploadDetails.jsx";
import CompanyDetail from "../Pages/Admin/Companies/CompanyDetail.jsx";
import EditCompaniesDetails from "../Pages/Admin/Companies/EditCompanyDetails.jsx";
import AddShortlistedStudent from "../Pages/Admin/Shortlisted Students/AddShortlistedStudent.jsx";
import JobDetailsPage from "../Pages/Admin/Job Listing/Components/JobDetailsPage.jsx";
import JobDetailsEditPage from "../Pages/Admin/Job Listing/JobDetailsEditPage.jsx";
import EditBranch from "../Pages/Admin/Branch/EditBranch.jsx";
import CreateBranch from "../Pages/Admin/Branch/CreateBranch.jsx";
import EditPlacedStudent from "../Pages/Admin/Placed Students/EditPlacedStudent.jsx";
import AddPlacedStudent from "../Pages/Admin/Placed Students/AddPlacedStudent.jsx";
import ShortlistedStudentDetails from "../Pages/Admin/Shortlisted Students/ShortlistedStudentDetails.jsx";
import UploadExcel from "../Pages/Admin/Shortlisted Students/UploadExcel.jsx";
import { removeTokensAndRedirectForAdminRoutes } from "../Components/AdminTokenManager.jsx";
import { getApi } from "../Utils/API.js";
import Announcements from "../Pages/Admin/Announcements/Announcements.jsx";
import RequestedStudentInfo from "../Pages/Admin/Students/RequestedStudentInfo.jsx";
import AddAnnouncement from "../Pages/Admin/Announcements/AddAnnouncements.jsx";
import UpdateAnnouncement from "../Pages/Admin/Announcements/UpdateAnnouncements.jsx";

const AdminRoutes = () => {
  const navigate = useNavigate();

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthentication = () => {
      const refreshToken = localStorage.getItem("refreshToken");

      if (refreshToken) {
        setIsAdminAuthenticated(true);
      } else {
        setIsAdminAuthenticated(false);
        navigate(`${ADMIN_PATH}/login`);
      }
    };

    checkAuthentication();
  }, []);

 

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

                  <Route path="student-request" element={<StudentRequest />} />

                  <Route
                    path="student-request/:student_sap_no"
                    element={<RequestedStudentInfo />}
                  />

                  <Route path="student-details" element={<StudentDetails />} />
                  <Route
                    path="student-details/:student_sap_no"
                    element={<StudentCompleteDetails />}
                  />

                  <Route
                    path="upload-student-details"
                    element={<UploadStudentData />}
                  />

                  <Route
                    path="add-shortlisted-student"
                    element={<AddShortlistedStudent />}
                  />

                  <Route path="companies" element={<Companies />} />

                  <Route path="announcements" element={<Announcements />} />

                  <Route
                    path="add-announcements"
                    element={<AddAnnouncement />}
                  />

                  <Route
                    path="update-announcement/:id"
                    element={<UpdateAnnouncement />}
                  />

                  <Route
                    path="company-detail/:id"
                    element={<CompanyDetail />}
                  />

                  <Route
                    path="edit-company-details/:id"
                    element={<EditCompaniesDetails />}
                  />
                  <Route
                    path="upload-companies-details"
                    element={<UploadCompaniesDetails />}
                  />

                  <Route path="job-listings" element={<JobListings />} />

                  <Route path="job-listings/:id" element={<JobDetailsPage />} />

                  <Route
                    path="upload-job-listings-details"
                    element={<JobUploadDetails />}
                  />
                  <Route
                    path="edit-job-listings-details/:id"
                    element={<JobDetailsEditPage />}
                  />

                  <Route
                    path="shortlisted-students"
                    element={<ShortlistedStudents />}
                  />
                  <Route
                    path="shortlisted-student-details/:id"
                    element={<ShortlistedStudentDetails />}
                  />

                  <Route
                    path="upload-shortlisted-students"
                    element={<UploadExcel />}
                  />

                  <Route path="placed-students" element={<PlacedStudents />} />

                  <Route
                    path="edit-placed-student/:id"
                    element={<EditPlacedStudent />}
                  />

                  <Route
                    path="add-placed-student"
                    element={<AddPlacedStudent />}
                  />

                  <Route path="branch" element={<Branch />} />

                  <Route path="edit-branch/:id" element={<EditBranch />} />

                  <Route path="create-branch" element={<CreateBranch />} />

                  <Route path="profile" element={<Profile />} />
                  <Route path="change-password" element={<ChangePassword />} />
                  <Route path="update-profile" element={<UpdateProfile />} />
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
