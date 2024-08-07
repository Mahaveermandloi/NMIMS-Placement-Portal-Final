// import React from "react";
// import PlacedStudentCard from "./Components/PlacedStudentCard";

// const PlacedStudents = () => {
//   return (
//     <>
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-3xl font-bold mb-4">Placed Students</h1>
//         </div>
//       </div>

//       <div>{/* dropdown filter year  wise , company wise */}</div>
//       <div className="lg:grid  lg:grid-cols-3  gap-10">
//         <PlacedStudentCard />
//         <PlacedStudentCard />
//         <PlacedStudentCard />
//         <PlacedStudentCard />
//         <PlacedStudentCard />
//         <PlacedStudentCard />
//         <PlacedStudentCard />
//         <PlacedStudentCard />
//       </div>
//     </>
//   );
// };

// export default PlacedStudents;

import React, { useState } from "react";
import PlacedStudentCard from "./Components/PlacedStudentCard";

const PlacedStudents = () => {
  // State for dropdown filters
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");

  // Sample data for dropdown options
  const years = ["2021", "2022", "2023", "2024"];
  const companies = ["Company A", "Company B", "Company C"];

  // Handle filter changes
  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleCompanyChange = (event) => {
    setSelectedCompany(event.target.value);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Placed Students</h1>
      </div>

      <div className="flex gap-4 mb-6">
        <div>
          
          <select
            id="year-filter"
            value={selectedYear}
            onChange={handleYearChange}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="">All Years</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div>
          
          <select
            id="company-filter"
            value={selectedCompany}
            onChange={handleCompanyChange}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="">All Companies</option>
            {companies.map((company) => (
              <option key={company} value={company}>
                {company}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="lg:grid lg:grid-cols-3 gap-10">
        {/* Filtered PlacedStudentCards */}
        <PlacedStudentCard />
        <PlacedStudentCard />
        <PlacedStudentCard />
        <PlacedStudentCard />
        <PlacedStudentCard />
        <PlacedStudentCard />
        <PlacedStudentCard />
        <PlacedStudentCard />
      </div>
    </>
  );
};

export default PlacedStudents;
