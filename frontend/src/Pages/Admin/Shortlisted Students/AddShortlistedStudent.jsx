import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Toast } from "../../../Components/Toast.jsx";
import Loader from "../../../Components/Loader.jsx"; // Adjust import if needed
import { getApi, postApi } from "../../../Utils/API.js";
import { SERVER_URL } from "../../../Utils/URLPath.jsx";

const AddShortlistedStudent = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [companies, setCompanies] = useState([]);
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("");
  const [studentSapNo, setStudentSapNo] = useState(""); // New state for student SAP number
  const [loading, setLoading] = useState(true);

  // Calculate current year and previous four years
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 4 }, (_, i) => currentYear - i);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch companies
        const companyResponse = await getApi(
          `${SERVER_URL}/api/company/get-all-companies`
        );
        setCompanies(companyResponse.data);

        // Fetch students
        const studentResponse = await getApi(
          `${SERVER_URL}/api/student/get-all-student-details`
        );

        console.log(studentResponse);
        setStudents(studentResponse.data);
        setFilteredStudents(studentResponse.data);

        setLoading(false);
      } catch (error) {
        toast.error("Failed to fetch data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter students based on selected branch
  useEffect(() => {
    if (selectedBranch) {
      setFilteredStudents(
        students.filter(
          (student) => student.engineering_specialization === selectedBranch
        )
      );
    } else {
      setFilteredStudents(students);
    }
  }, [selectedBranch, students]);

  const handleBranchChange = (event) => {
    const branch = event.target.value;
    setSelectedBranch(branch);
    setValue("branch", branch); // Update the form value
  };

  const handleStudentChange = (event) => {
    const studentName = event.target.value;
    setSelectedStudent(studentName);
    setValue("studentName", studentName); // Update the form value

    // Find the student SAP number
    const selectedStudentData = students.find(
      (student) => student.name_of_student === studentName
    );
    setStudentSapNo(
      selectedStudentData ? selectedStudentData.student_sap_no : ""
    );
  };

  const onSubmit = async (data) => {
    console.log(data);
  };

  if (loading) return <Loader message="Loading..." />;
  return (
    <div className="">
      <Toast />
      <h1 className="text-3xl font-bold text-gray-700 mb-6">
        Add Shortlisted Student
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label
              htmlFor="year"
              className="block text-md font-bold text-gray-700 mb-1"
            >
              Year
            </label>
            <select
              id="year"
              {...register("year", { required: "Year is required" })}
              className={`w-full p-2 border rounded ${
                errors.year ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Year</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            {errors.year && (
              <p className="text-red-500 text-sm">{errors.year.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="companyName"
              className="block text-md font-bold text-gray-700 mb-1"
            >
              Company Name
            </label>
            <select
              id="companyName"
              {...register("companyName", {
                required: "Company name is required",
              })}
              className={`w-full p-2 border rounded ${
                errors.companyName ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Company</option>
              {companies.map((company) => (
                <option key={company._id} value={company.company_name}>
                  {company.company_name}
                </option>
              ))}
            </select>
            {errors.companyName && (
              <p className="text-red-500 text-sm">
                {errors.companyName.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="jobRole"
              className="block text-md font-bold text-gray-700 mb-1"
            >
              Job Role
            </label>
            <select
              id="jobRole"
              {...register("jobRole", { required: "Job role is required" })}
              className={`w-full p-2 border rounded ${
                errors.jobRole ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Job Role</option>
              {companies.map((company) => (
                <option key={company._id} value={company.designation}>
                  {company.designation}
                </option>
              ))}
            </select>
            {errors.jobRole && (
              <p className="text-red-500 text-sm">{errors.jobRole.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="branch"
              className="block text-md font-bold text-gray-700 mb-1"
            >
              Branch
            </label>
            <select
              id="branch"
              value={selectedBranch}
              onChange={handleBranchChange}
              className={`w-full p-2 border rounded ${
                errors.branch ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Branch</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Computer Engineering">Computer Engineering</option>
              <option value="Information Technology">
                Information Technology
              </option>
              <option value="Artificial Intelligence and Machine Learning">
                Artificial Intelligence and Machine Learning
              </option>
            </select>
            {errors.branch && (
              <p className="text-red-500 text-sm">{errors.branch.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="studentName"
              className="block text-md font-bold text-gray-700 mb-1"
            >
              Student Name
            </label>
            <select
              id="studentName"
              {...register("studentName", {
                required: "Student name is required",
              })}
              onChange={handleStudentChange}
              className={`w-full p-2 border rounded ${
                errors.studentName ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Student</option>
              {filteredStudents.map((student) => (
                <option key={student._id} value={student.name_of_student}>
                  {student.name_of_student}
                </option>
              ))}
            </select>
            {errors.studentName && (
              <p className="text-red-500 text-sm">
                {errors.studentName.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="studentSapNo"
              className="block text-md font-bold text-gray-700 mb-1"
            >
              Student SAP Number
            </label>
            <input
              type="text"
              id="studentSapNo"
              value={studentSapNo}
              readOnly
              className="w-full p-2 border rounded bg-gray-100"
              placeholder="SAP Number will appear here"
            />
          </div>

          <div>
            <label
              htmlFor="packageAmount"
              className="block text-md font-bold text-gray-700 mb-1"
            >
              Package Amount
            </label>
            <input
              type="text"
              id="packageAmount"
              {...register("packageAmount", {
                required: "Package amount is required",
              })}
              className={`w-full p-2 border rounded ${
                errors.packageAmount ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter package amount"
            />
            {errors.packageAmount && (
              <p className="text-red-500 text-sm">
                {errors.packageAmount.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Shortlisted Student
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddShortlistedStudent;
