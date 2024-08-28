import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getApi, postApi } from "../../../Utils/API.js";
import { useNavigate } from "react-router-dom";
import Loader from "../../../Components/Loader.jsx";
import { Toast } from "../../../Components/Toast.jsx";
import { ADMIN_PATH } from "../../../Utils/URLPath.jsx";

const AddPlacedStudent = () => {
  const [years, setYears] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [branches, setBranches] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Generate years dropdown options
        const currentYear = new Date().getFullYear();
        setYears([
          currentYear - 0,
          currentYear - 1,
          currentYear - 2,
          currentYear - 3,
        ]);

        const companyResponse = await getApi("/api/company/get-all-companies");
        if (companyResponse.statusCode === 200) {
          setCompanies(companyResponse.data);
        }

        const branchResponse = await getApi("/api/branch");
        if (branchResponse.statusCode === 200) {
          setBranches(branchResponse.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchStudents = async () => {
      if (selectedBranch) {
        setLoading(true);
        try {
          const studentResponse = await getApi(
            `/api/student/get-student-by-branch?engineering_specialization=${selectedBranch}`
          );
   
          if (studentResponse.statusCode === 200) {
            setStudents(studentResponse.data);
          }
        } catch (error) {
          console.error("Error fetching students:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchStudents();
  }, [selectedBranch]);

  const onSubmit = async (data) => {
    const requestData = {
      student_sap_no: data.student.student_sap_no, // Assuming the SAP number is sent as student_name
      name_of_student: data.student_name,
      student_email_id: data.email,
      company_name: data.company_name,
      job_title: data.job_title,
      ctc: data.ctc,
      year: data.year,
      engineering_specialization: data.branch_name,
    };

    try {
      const response = await postApi(
        requestData,
        "/api/placedstudents"
      );
    
      if (response.statusCode === 201) {
        toast.success("Student placed successfully");
        setTimeout(() => {
          navigate(`${ADMIN_PATH}/placed-students`);
        }, 1500);
      } else {
        toast.error("Failed to place student");
      }
    } catch (error) {
      console.error("Error placing student:", error);
      toast.error("An error occurred while placing student");
    }
  };

  return (
    <>
      <Toast />
      <div className="flex mb-6">
        <h1 className="text-3xl font-bold">Add Placed Students</h1>
      </div>

      {loading && <Loader />}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid  lg:grid-cols-2 lg:gap-6 gap-4 ">
          <div>
            <label
              htmlFor="year"
              className="block text-sm font-bold text-gray-700"
            >
              Year
            </label>
            <select
              id="year"
              className={`block w-full p-2 border rounded ${
                errors.year ? "border-red-500" : ""
              }`}
              {...register("year", { required: "Year is required" })}
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
              htmlFor="company_name"
              className="block text-sm font-bold text-gray-700"
            >
              Company Name
            </label>
            <select
              id="company_name"
              className={`block w-full p-2 border rounded ${
                errors.company_name ? "border-red-500" : ""
              }`}
              {...register("company_name", {
                required: "Company name is required",
              })}
            >
              <option value="">Select Company</option>
              {companies.map((company) => (
                <option key={company.id} value={company.company_name}>
                  {company.company_name}
                </option>
              ))}
            </select>
            {errors.company_name && (
              <p className="text-red-500 text-sm">
                {errors.company_name.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="branch_name"
              className="block text-sm font-bold text-gray-700"
            >
              Branch Name
            </label>
            <select
              id="branch_name"
              className={`block w-full p-2 border rounded ${
                errors.branch_name ? "border-red-500" : ""
              }`}
              {...register("branch_name", {
                required: "Branch name is required",
              })}
              onChange={(e) => {
                setSelectedBranch(e.target.value);
                setValue("branch_name", e.target.value); // update react-hook-form value
              }}
            >
              <option value="">Select Branch</option>
              {branches.map((branch) => (
                <option key={branch.id} value={branch.branch_name}>
                  {branch.branch_name}
                </option>
              ))}
            </select>
            {errors.branch_name && (
              <p className="text-red-500 text-sm">
                {errors.branch_name.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="student_name"
              className="block text-sm font-bold text-gray-700"
            >
              Student Name
            </label>
            <select
              id="student_name"
              className={`block w-full p-2 border rounded ${
                errors.student_name ? "border-red-500" : ""
              }`}
              {...register("student_name", {
                required: "Student name is required",
              })}
            >
              <option value="">Select Student</option>
              {students.map((student) => (
                <option key={student.sap_no} value={student.name_of_student}>
                  {student.name_of_student} {student.student_sap_no}
                </option>
              ))}
            </select>
            {errors.student_name && (
              <p className="text-red-500 text-sm">
                {errors.student_name.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="ctc"
              className="block text-sm font-bold text-gray-700"
            >
              CTC
            </label>
            <input
              type="text"
              id="ctc"
              placeholder="Enter CTC"
              className={`block w-full p-2 border rounded ${
                errors.ctc ? "border-red-500" : ""
              }`}
              {...register("ctc", { required: "CTC is required" })}
            />
            {errors.ctc && (
              <p className="text-red-500 text-sm">{errors.ctc.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="job_title"
              className="block text-sm font-bold text-gray-700"
            >
              Job Title
            </label>
            <input
              type="text"
              id="job_title"
              placeholder="Enter Job Title"
              className={`block w-full p-2 border rounded ${
                errors.job_title ? "border-red-500" : ""
              }`}
              {...register("job_title", { required: "Job title is required" })}
            />
            {errors.job_title && (
              <p className="text-red-500 text-sm">{errors.job_title.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-bold text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter Email"
              className={`block w-full p-2 border rounded ${
                errors.email ? "border-red-500" : ""
              }`}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default AddPlacedStudent;
