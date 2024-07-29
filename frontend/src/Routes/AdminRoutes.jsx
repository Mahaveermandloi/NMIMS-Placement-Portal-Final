// AdminRoutes.jsx
import React from "react";
import { Route, Routes } from "react-router-dom";
import { BASE_PATH } from "../Utils/URLPath.jsx";
import Students from "../Pages/Admin/Students/Students.jsx";
import Companies from "../Pages/Admin/Companies/Companies.jsx";
import JobListings from "../Pages/Admin/Job Listing/JobListing.jsx";
import ShortlistedStudents from "../Pages/Admin/Shortlisted Students/ShortlistedStudents.jsx";
import PlacedStudents from "../Pages/Admin/Placed Students/PlacedStudents.jsx";
import Branch from "../Pages/Admin/Branch/Branch.jsx";
import Profile from "../Pages/Admin/Profile/Profile.jsx";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path={`/students`} element={<Students />} />
      <Route path={`/companies`} element={<Companies />} />
      <Route path={`/job-listings`} element={<JobListings />} />
      <Route path={`/shortlisted-students`} element={<ShortlistedStudents />} />
      <Route path={`/placed-students`} element={<PlacedStudents />} />
      <Route path={`/branch`} element={<Branch />} />
      <Route path={`/profile`} element={<Profile />} />
    </Routes>
  );
};

export default AdminRoutes;
