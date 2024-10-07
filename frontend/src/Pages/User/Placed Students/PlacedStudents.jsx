import React, { useEffect, useState } from "react";
import PlacedStudentCard from "./Components/PlacedStudentCard";
import nodata from "../../../../public/images/no-data.png";
import Loader from "../../../Components/Loader.jsx";
import { getApi } from "../../../Utils/API.js";
import { SERVER_URL } from "../../../Utils/URLPath.jsx";
const PlacedStudents = () => {
  // State for dropdown filters
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [placedStudents, setPlacedStudents] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Generate the last 4 years
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 4 }, (_, i) => currentYear - i);

  // Fetch placed student data

  const fetchPlacedStudents = async () => {
    setLoading(true);
    try {
      const response = await getApi(`${SERVER_URL}/api/placedstudents`);

   
      
      if (response.statusCode === 200) {
        setPlacedStudents(response.data);
      } else {
        setError("Failed to fetch placed students");
      }
    } catch (err) {
      setError("Error fetching placed students");
    } finally {
      setLoading(false);
    }
  };

  // Fetch companies for the dropdown
  const fetchCompanies = async () => {
    try {
      const response = await getApi(
        `${SERVER_URL}/api/company/get-all-companies`
      );

      if (response.statusCode === 200) {
        setCompanies(response.data);
      } else {
        setError("Failed to fetch companies");
      }
    } catch (err) {
      setError("Error fetching companies");
    }
  };

  useEffect(() => {
    fetchPlacedStudents();
    fetchCompanies();
  }, []);

  // Filter the placed students based on selected year and company

  const filteredStudents = placedStudents.filter((student) => {
    return (
      (selectedYear === "" || student.year.toString() === selectedYear) &&
      (selectedCompany === "" || student.company_name === selectedCompany)
    );
  });

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
            onChange={(e) => setSelectedYear(e.target.value)}
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
            onChange={(e) => setSelectedCompany(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="">All Companies</option>
            {companies.map((company) => (
              <option key={company._id} value={company.company_name}>
                {company.company_name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <Loader message="Loading..." />
      ) : error ? (
        <div className="flex justify-center items-center h-96">
          <p className="text-red-500">{error}</p>
        </div>
      ) : filteredStudents.length === 0 ? (
        <div className="flex justify-center items-center h-96">
          <img
            src={nodata}
            alt="No data found"
            className="w-64 h-64 object-contain"
          />
        </div>
      ) : (
        <div className="lg:grid lg:grid-cols-3 gap-10">
          {filteredStudents.map((student) => (
            <>
              <PlacedStudentCard key={student._id} student={student} />
            </>
          ))}
        </div>
      )}
    </>
  );
};

export default PlacedStudents;
