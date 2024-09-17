import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CustomPaginationActionsTable from "../../../Components/TablePaginationActions.jsx";
import { useNavigate } from "react-router-dom";
import { ADMIN_PATH, SERVER_URL } from "../../../Utils/URLPath.jsx";
import { getApi, deleteApi } from "../../../Utils/API.js";
import { toast } from "react-toastify";
import Loader from "../../../Components/Loader.jsx";
import { IoAddCircleOutline } from "react-icons/io5";
import { FaUpload } from "react-icons/fa";

const ShortlistedStudents = () => {
  const [students, setStudents] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [years, setYears] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [branches, setBranches] = useState([]);

  const [year, setYear] = useState("");
  const [company, setCompany] = useState("");
  const [branch, setBranch] = useState("");
  const [loading, setLoading] = useState(true); // Add loading state

  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true); // Start loading
      try {
        const response = await getApi(`${SERVER_URL}/api/shortlistedstudents`);

        console.log(response);

        if (response.statusCode === 200) {
          const data = response.data.map((student) => ({
            student_profile_image: student.student_profile_image,
            id: student._id, // Ensure the student ID is included
            student_sap_no: student.student_sap_no,
            name_of_student: student.name_of_student,
            company: student.company_name,
            student_sap_no: student.student_sap_no,
            branch: student.engineering_specialization || "Unknown", // Set branch field here
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

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        const response = await deleteApi(
          `${SERVER_URL}/api/shortlistedstudents/${id}`
        );
        if (response.statusCode === 200) {
          // Remove the deleted student from the state
          setStudents((prevStudents) =>
            prevStudents.filter((student) => student.id !== id)
          );
          setFilteredData((prevData) =>
            prevData.filter((student) => student.id !== id)
          );
          toast.success("Shortlisted Student removed successfully");
        } else {
          toast.error(response.message || "Failed to delete student");
        }
      } catch (error) {
        toast.error("Failed to delete student");
      }
    }
  };

  const columns = [
    {
      id: "student_profile_image",
      label: "Photo",
      align: "left",
      render: (row) => (
        <img
          src={`${SERVER_URL}${row.student_profile_image}`}
          alt={row.name_of_student}
          style={{
            width: 50,
            height: 50,
            borderRadius: "50%", // This makes the image rounded
            objectFit: "cover", // Ensures the image covers the area without distortion
          }}
        />
      ),
    },
    { id: "name_of_student", label: "Name", align: "left" },
    { id: "company", label: "Company", align: "left" },
    { id: "branch", label: "Branch", align: "left" },
    { id: "student_sap_no", label: "Student SAP ID", align: "left" },
    {
      id: "actions",
      label: "Actions",
      align: "center",
      render: (row) => (
        <div style={{ display: "flex", justifyContent: "center", gap: "8px" }}>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleDelete(row.id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      {loading && <Loader />}
      <div className="flex justify-between  items-center mb-4">
        <h1 className="text-2xl lg:text-3xl font-bold">Shortlisted Students</h1>
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={() => navigate(`${ADMIN_PATH}/add-shortlisted-student`)}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 flex items-center"
          >
            <span className="hidden md:inline">Add Student Shortlisted</span>
            <IoAddCircleOutline className="inline md:hidden" size={20} />
          </button>

          <button
            type="button"
            onClick={() =>
              navigate(`${ADMIN_PATH}/upload-shortlisted-students`)
            }
            className="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 flex items-center"
          >
            <span className="hidden md:inline">Upload Excel</span>
            <FaUpload className="inline md:hidden" size={20} />
          </button>
        </div>
      </div>
      <div className="mb-4 lg:w-full w-[340px] ">
        <div className="flex  flex-col lg:flex-row     gap-4 mb-4">
          <div className="">
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
              className="block w-full  p-2 border rounded"
            >
              <option value="">Select Year</option>
              {years.map((yr) => (
                <option key={yr} value={yr}>
                  {yr}
                </option>
              ))}
            </select>
          </div>

          <div className="">
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

          <div className="">
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

        <div className="">
          <CustomPaginationActionsTable
            data={filteredData.map((student) => ({
              id: student.id,
              student_profile_image: student.student_profile_image,
              name_of_student: student.name_of_student,
              company: student.company,
              branch: student.branch,
              student_sap_no: student.student_sap_no,
              actions: columns
                .find((col) => col.id === "actions")
                .render(student),
            }))}
            columns={columns}
          />
        </div>
      </div>
    </>
  );
};

export default ShortlistedStudents;
