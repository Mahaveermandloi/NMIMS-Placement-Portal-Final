import React, { useState, useEffect } from "react";
import PlacedStudentCard from "./Components/PlacedStudentCard";
import Loader from "../../../Components/Loader";
import { getApi } from "../../../Utils/API";
import { Toast } from "../../../Components/Toast";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import nodata from "../../../../public/images/no-data.png";
import { ADMIN_PATH } from "../../../Utils/URLPath";

import { IoAddCircleOutline } from "react-icons/io5";

const PlacedStudents = () => {
  const [students, setStudents] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [branches, setBranches] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [year, setYear] = useState("");
  const [company, setCompany] = useState("");
  const [branch, setBranch] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // State for dropdown filters
  const [years, setYears] = useState([]);

  useEffect(() => {
    // Fetch placed students data
    const fetchStudents = async () => {
      try {
        const response = await getApi(`/api/placedstudents`);

     
        if (response.statusCode === 200) {
          setStudents(response.data);
          setFilteredData(response.data);
        } else {
          toast.error("Failed to fetch placed students data");
        }
      } catch (error) {
        console.error("Error fetching placed students data:", error);
        toast.error("Error fetching placed students data");
      } finally {
        setLoading(false);
      }
    };

    // Fetch branches data
    const fetchBranches = async () => {
      try {
        const response = await getApi(`/api/branch`);

        if (response.statusCode === 200) {
          setBranches(response.data);
        } else {
          toast.error("Failed to fetch branches data");
        }
      } catch (error) {
        console.error("Error fetching branches data:", error);
        toast.error("Error fetching branches data");
      }
    };

    // Fetch companies data
    const fetchCompanies = async () => {
      try {
        const response = await getApi(`/api/company/get-all-companies`);

        if (response.statusCode === 200) {
          setCompanies(response.data);
        } else {
          // toast.error("Failed to fetch companies data");
        }
      } catch (error) {
        console.error("Error fetching companies data:", error);
        // toast.error("Error fetching companies data");
      }
    };

    // Initialize the component by fetching data
    fetchStudents();
    fetchBranches();
    fetchCompanies();

    const currentYear = new Date().getFullYear();
    const previousYears = Array.from(
      { length: 4 },
      (_, index) => currentYear - index
    );
    setYears(previousYears);
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      let filtered = students;

      if (year) {
        filtered = filtered.filter(
          (student) => student.year.toString() === year
        );
      }

      if (company) {
        filtered = filtered.filter(
          (student) => student.company_name === company
        );
      }

      if (branch) {
        filtered = filtered.filter(
          (student) => student.engineering_specialization === branch
        );
      }

      setFilteredData(filtered);
    };

    applyFilters();
  }, [year, company, branch, students]);

  return (
    <>
      <Toast />
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Placed Students</h1>

        {/* Button for larger screens */}
        <button
          type="button"
          onClick={() => navigate(`${ADMIN_PATH}/add-placed-student`)}
          className="hidden md:flex text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Add Placed Student
        </button>

        {/* Icon for mobile view */}
        <button
          type="button"
          onClick={() => navigate(`${ADMIN_PATH}/add-placed-student`)}
          className="flex items-center md:hidden text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          <IoAddCircleOutline size={20} />
        </button>
      </div>

      <div className="mb-7">
        <div className="flex lg:flex-row flex-col gap-4 mb-4">
          <div className="flex-1">
            <label
              htmlFor="year"
              className="block text-sm font-medium text-gray-700"
            >
              Year
            </label>
            <select
              id="year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="block w-full p-2 border rounded"
            >
              <option value="">Select Year</option>
              {years.map((yr) => (
                <option key={yr} value={yr}>
                  {yr}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <label
              htmlFor="company"
              className="block text-sm font-medium text-gray-700"
            >
              Company
            </label>
            <select
              id="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="block w-full p-2 border rounded"
            >
              <option value="">Select Company</option>
              {companies.map((comp) => (
                <option key={comp._id} value={comp.company_name}>
                  {comp.company_name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <label
              htmlFor="branch"
              className="block text-sm font-medium text-gray-700"
            >
              Branch
            </label>
            <select
              id="branch"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              className="block w-full p-2 border rounded"
            >
              <option value="">Select Branch</option>
              {branches.map((br) => (
                <option key={br._id} value={br.branch_name}>
                  {br.branch_name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <Loader message="Loading..." />
      ) : (
        <div className="grid lg:grid-cols-3 gap-3 lg:gap-5">
          {filteredData.length > 0 ? (
            filteredData.map((student) => (
              <PlacedStudentCard key={student._id} student={student} />
            ))
          ) : (
            <>
              <div className="flex justify-center">
                <img src={nodata} alt="" />
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default PlacedStudents;
