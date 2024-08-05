import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CustomPaginationActionsTable from "../../../Components/TablePaginationActions.jsx";
import { useNavigate } from "react-router-dom";
import { ADMIN_PATH } from "../../../Utils/URLPath.jsx";

const PlacedStudents = () => {
  const [students, setStudents] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [year, setYear] = useState("");
  const [company, setCompany] = useState("");
  const [campus, setCampus] = useState("");
  const [branch, setBranch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Setting dummy data instead of fetching from API
    const dummyData = [
      {
        student_sap_no: "P123456",
        name_of_student: "John Doe",
        company: "Company1",
        job_role: "Software Engineer",
        package: "10 LPA",
        campus: "Mumbai",
        branch: "Computer Science",
        year: 2024,
      },
      {
        student_sap_no: "P123457",
        name_of_student: "Jane Smith",
        company: "Company2",
        job_role: "Data Scientist",
        package: "12 LPA",
        campus: "Shirpur",
        branch: "Information Technology",
        year: 2024,
      },
      {
        student_sap_no: "P123458",
        name_of_student: "Alice Johnson",
        company: "Company1",
        job_role: "UI/UX Designer",
        package: "8 LPA",
        campus: "Mumbai",
        branch: "Design",
        year: 2023,
      },
      {
        student_sap_no: "P123459",
        name_of_student: "Bob Brown",
        company: "Company3",
        job_role: "Product Manager",
        package: "15 LPA",
        campus: "Shirpur",
        branch: "Management",
        year: 2024,
      },
    ];
    setStudents(dummyData);
  }, []);

  useEffect(() => {
    let data = students;
    if (year) data = data.filter((student) => student.year === Number(year));
    if (company) data = data.filter((student) => student.company === company);
    if (campus) data = data.filter((student) => student.campus === campus);
    if (branch) data = data.filter((student) => student.branch === branch);
    setFilteredData(data);
  }, [year, company, campus, branch, students]);

  const columns = [
    { id: "name_of_student", label: "Name", align: "left" },
    { id: "company", label: "Company", align: "left" },
    { id: "job_role", label: "Role", align: "left" },
    { id: "package", label: "Package", align: "left" },
    { id: "campus", label: "Campus", align: "left" },
    { id: "branch", label: "Branch", align: "left" },
    {
      id: "actions",
      label: "Actions",
      align: "center",
      render: (row) => (
        <div style={{ display: "flex", justifyContent: "center", gap: "8px" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleInfo(row)}
          >
            Info
          </Button>
        </div>
      ),
    },
  ];

  const handleInfo = (student) => {
    navigate(`${ADMIN_PATH}/student-details/${student.student_sap_no}`);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Placed Students</h1>
        <button
          type="button"
          onClick={() => navigate(`${ADMIN_PATH}/add-student`)}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Add Student Placement
        </button>
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
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
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
              <option value="Company1">Company1</option>
              <option value="Company2">Company2</option>
              <option value="Company3">Company3</option>
            </select>
          </div>

          <div className="flex-1">
            <label
              htmlFor="campus"
              className="block text-sm font-medium text-gray-700"
            >
              Campus
            </label>
            <select
              id="campus"
              value={campus}
              onChange={(e) => setCampus(e.target.value)}
              className="block w-full p-2 border rounded"
            >
              <option value="">Select Campus</option>
              <option value="Shirpur">Shirpur</option>
              <option value="Mumbai">Mumbai</option>
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
              <option value="Computer Science">Computer Science</option>
              <option value="Information Technology">Information Technology</option>
              <option value="Design">Design</option>
              <option value="Management">Management</option>
            </select>
          </div>
        </div>

        <div className="lg:w-full w-full">
          <CustomPaginationActionsTable
            data={filteredData.map((student) => ({
              name_of_student: student.name_of_student,
              company: student.company,
              job_role: student.job_role,
              package: student.package,
              campus: student.campus,
              branch: student.branch,
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

export default PlacedStudents;
