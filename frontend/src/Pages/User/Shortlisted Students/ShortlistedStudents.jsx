import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CustomPaginationActionsTable from "../../../Components/TablePaginationActions.jsx";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "../../../Utils/URLPath.jsx";
import { getApi } from "../../../Utils/API.js";
import { toast } from "react-toastify";
import Loader from "../../../Components/Loader.jsx";

const ShortlistedStudents = () => {
  const [students, setStudents] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [years, setYears] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [branches, setBranches] = useState([]);

  const [year, setYear] = useState("");
  const [company, setCompany] = useState("");
  const [branch, setBranch] = useState("");

  const [loading, setLoading] = useState(true); // Set initial loading state to true
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true); // Start loading
        const response = await getApi(`${SERVER_URL}/api/shortlistedstudents`);

        if (response.statusCode === 200) {
          // const data = response.data.map((student) => ({
          //       id: student._id, // Ensure the student ID is included
          //       student_sap_no: student.student_sap_no,
          //       name_of_student: student.name_of_student,
          //       company: student.company_name,
          //       job_role: student.job_title,
          //       branch: student.engineering_specialization || "Unknown", // Set branch field here
          //       year: student.year,
          //     }));

          const data = response.data.map((student) => ({
            id: student._id,
            student_sap_no: student.student_sap_no,
            name_of_student: student.name_of_student,
            student_profile_image: student.student_profile_image,
            company: student.company_name,
            job_role: student.job_title,
            branch: student.engineering_specialization || "Unknown",
            year: student.year,
          }));

     

          setStudents(data);
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        toast.error("Failed to fetch data");
      } finally {
        setLoading(false); // Stop loading
      }
    };

    const fetchAdditionalData = async () => {
      try {
        const companiesResponse = await getApi(
          `${SERVER_URL}/api/company/get-all-companies`
        );
        const branchesResponse = await getApi(`${SERVER_URL}/api/branch`);

        if (companiesResponse.statusCode === 200) {
          setCompanies(companiesResponse.data);
        }
        if (branchesResponse.statusCode === 200) {
          setBranches(branchesResponse.data);
        }
      } catch (error) {
        toast.error("Failed to fetch additional data");
      }
    };

    fetchStudents();
    fetchAdditionalData();

    const currentYear = new Date().getFullYear();
    const previousYears = [...Array(4).keys()].map((i) => currentYear - i);
    setYears(previousYears);
  }, []);

  useEffect(() => {
    let data = students;
    if (year) data = data.filter((student) => student.year === Number(year));
    if (company) data = data.filter((student) => student.company === company);
    if (branch) data = data.filter((student) => student.branch === branch);
    setFilteredData(data);
  }, [year, company, branch, students]);

  // const columns = [
  //   { id: "student_profile_image", label: "Profile Image", align: "left" },
  //   { id: "name_of_student", label: "Name", align: "left" },
  //   { id: "company", label: "Company", align: "left" },
  //   { id: "job_role", label: "Job Role", align: "left" },
  //   { id: "branch", label: "Branch", align: "left" }, // Ensure column ID is branch
  // ];

  // const columns = [
  //   {
  //     id: "student_profile_image",
  //     label: "Profile Image",
  //     align: "left",
  //     format: (value) => (
  //       <img
  //         src={value}
  //         alt="Student Profile"
  //         style={{ width: "50px", height: "50px", borderRadius: "50%" }}
  //       />
  //     ),
  //   },
  //   { id: "name_of_student", label: "Name", align: "left" },
  //   { id: "company", label: "Company", align: "left" },
  //   { id: "job_role", label: "Job Role", align: "left" },
  //   { id: "branch", label: "Branch", align: "left" },
  // ];

  const columns = [
    {
      id: "student_profile_image",
      label: "Photo",
      align: "left",
      render: (row) => (
        <img
          src={`${row.student_profile_image}`}
          alt={row.name_of_student}
          style={{
            width: 50,
            height: 50,
            borderRadius: "50%", // This makes the image rounded
            objectFit: "", // Ensures the image covers the area without distortion
          }}
        />
      ),
    },
    { id: "name_of_student", label: "Name", align: "left" },
    { id: "company", label: "Company", align: "left" },
    { id: "branch", label: "Branch", align: "left" },
    { id: "student_sap_no", label: "Student SAP ID", align: "left" },
  ];

  return (
    <>
      {loading ? (
        <Loader /> // Show loader while data is being fetched
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold">Shortlisted Students</h1>
          </div>

          <div className="mb-4">
            <div className="flex gap-4 mb-4">
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
                  {branches.map((branch) => (
                    <option key={branch._id} value={branch.branch_name}>
                      {branch.branch_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="lg:w-full w-full">
              <CustomPaginationActionsTable
                data={filteredData.map((student) => ({
                  id: student.id,
                  name_of_student: student.name_of_student,
                  student_profile_image: student.student_profile_image, // Ensure image URL is passed
                  company: student.company,
                  job_role: student.job_role,
                  branch: student.branch,
                  student_sap_no: student.student_sap_no,
                }))}
                columns={columns}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ShortlistedStudents;
