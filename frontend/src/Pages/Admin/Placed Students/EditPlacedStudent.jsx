const FormField = ({
  label,
  id,
  type = "text",
  options = [],
  register,
  errors,
  disabled = false,
  onChange,
  defaultValue,
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-bold text-gray-700">
        {label}
      </label>
      {type === "select" ? (
        <select
          id={id}
          className={`block w-full p-2 border rounded ${
            errors ? "border-red-500" : ""
          }`}
          {...register}
          onChange={onChange}
          disabled={disabled}
          defaultValue={defaultValue}
        >
          <option value="">Select {label}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          id={id}
          placeholder={`Enter ${label}`}
          className={`block w-full p-2 border rounded ${
            errors ? "border-red-500" : ""
          }`}
          {...register}
          disabled={disabled}
          defaultValue={defaultValue}
        />
      )}
      {errors && <p className="text-red-500 text-sm">{errors.message}</p>}
    </div>
  );
};

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getApi, putApi } from "../../../Utils/API.js";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../../Components/Loader.jsx";
import { Toast } from "../../../Components/Toast.jsx";
import { ADMIN_PATH } from "../../../Utils/URLPath.jsx";
// import FormField from "../../../Components/FormField.jsx";

const EditPlacedStudent = () => {
  const [years, setYears] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [branches, setBranches] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [initialData, setInitialData] = useState(null);
  const [studentSapNo, setStudentSapNo] = useState(""); // New state for student_sap_no

  const { id } = useParams(); // Assume the student ID is passed as a URL parameter

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

        // Fetch the student details
        const studentResponse = await getApi(`/api/placedstudents/${id}`);

        if (studentResponse.statusCode === 200) {
          const data = studentResponse.data;
          setInitialData(data);
          setStudentSapNo(data.student_sap_no);
          setValue("year", data.year);
          setValue("company_name", data.company_name);
          setValue("branch_name", data.engineering_specialization);
          setValue("student_name", data.name_of_student);
          setValue("ctc", data.ctc);
          setValue("job_title", data.job_title);
          setValue("email", data.student_email_id);
          setSelectedBranch(data.engineering_specialization);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id, setValue]);

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
      student_sap_no: studentSapNo, // Use stored student_sap_no
      name_of_student: data.student_name,
      student_email_id: data.email,
      company_name: data.company_name,
      job_title: data.job_title,
      ctc: data.ctc,
      year: data.year,
      engineering_specialization: data.branch_name,
    };

    try {
      const response = await putApi(
        requestData,
        `/api/placedstudents/${id}` // Update the correct endpoint with student ID
      );
      if (response.statusCode === 200) {
        toast.success("Student details updated successfully");
        setTimeout(() => {
          navigate(`${ADMIN_PATH}/placed-students`);
        }, 1500);
      } else {
        toast.error("Failed to update student details");
      }
    } catch (error) {
      console.error("Error updating student details:", error);
      toast.error("An error occurred while updating student details");
    }
  };

  if (!initialData) {
    return <Loader />;
  }

  return (
    <>
      <Toast />
      <div className="flex mb-6">
        <h1 className="text-3xl font-bold">Edit Placed Student</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid lg:grid-cols-2 lg:gap-6 gap-4">
          <FormField
            label="Year"
            id="year"
            type="select"
            options={years.map((year) => ({ value: year, label: year }))}
            register={register("year", { required: "Year is required" })}
            errors={errors.year}
          />

          <FormField
            label="Company Name"
            id="company_name"
            type="select"
            options={companies.map((company) => ({
              value: company.company_name,
              label: company.company_name,
            }))}
            register={register("company_name", {
              required: "Company name is required",
            })}
            errors={errors.company_name}
          />

          <FormField
            label="Branch Name"
            id="branch_name"
            type="select"
            options={branches.map((branch) => ({
              value: branch.branch_name,
              label: branch.branch_name,
            }))}
            register={register("branch_name", {
              required: "Branch name is required",
            })}
            errors={errors.branch_name}
            onChange={(e) => {
              setSelectedBranch(e.target.value);
              setValue("branch_name", e.target.value); // update react-hook-form value
            }}
          />

          <FormField
            label="Student SAP ID"
            id="student_sap_no"
            type="text"
            disabled={true}
            defaultValue={studentSapNo} // Set initial value
          />

          <FormField
            label="Student Name"
            id="student_name"
            type="text" // Change type to "text" for disabled state
            disabled={true}
            defaultValue={initialData.name_of_student} // Set initial value
          />

          <FormField
            label="CTC"
            id="ctc"
            type="text"
            register={register("ctc", { required: "CTC is required" })}
            errors={errors.ctc}
          />

          <FormField
            label="Job Title"
            id="job_title"
            type="text"
            register={register("job_title", {
              required: "Job title is required",
            })}
            errors={errors.job_title}
          />

          <FormField
            label="Email"
            id="email"
            type="email"
            register={register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email address",
              },
            })}
            errors={errors.email}
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Update
        </button>
      </form>
    </>
  );
};

export default EditPlacedStudent;
