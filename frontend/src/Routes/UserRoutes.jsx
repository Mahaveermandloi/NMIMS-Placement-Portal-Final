// UserRoutes.jsx
import React from "react";
import { Route, Routes } from "react-router-dom";
import Companies from "../Pages/User/Companies/Companies.jsx";
import JobListings from "../Pages/User/Job Listing/JobListing.jsx";
import ShortlistedStudents from "../Pages/User/Shortlisted Students/ShortlistedStudents.jsx";
import PlacedStudents from "../Pages/User/Placed Students/PlacedStudents.jsx";
import Profile from "../Pages/User/Profile/Profile.jsx";

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/companies" element={<Companies />} />
      <Route path="/job-listings" element={<JobListings />} />
      <Route path="/shortlisted-students" element={<ShortlistedStudents />} />
      <Route path="/placed-students" element={<PlacedStudents />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
};

export default UserRoutes;
