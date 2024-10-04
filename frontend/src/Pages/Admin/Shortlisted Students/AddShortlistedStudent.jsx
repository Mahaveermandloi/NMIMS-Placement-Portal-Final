import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Toast } from "../../../Components/Toast.jsx";
import Loader from "../../../Components/Loader.jsx"; // Adjust import if needed
import { getApi, postApi } from "../../../Utils/API.js";
import { ADMIN_PATH, SERVER_URL } from "../../../Utils/URLPath.jsx";
import { useNavigate } from "react-router-dom";

const AddShortlistedStudent = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const [companies, setCompanies] = useState([]);
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("");
  const [student_sap_no, setstudent_sap_no] = useState(""); // New state for student SAP number
  const [student_email_id, setstudent_email_id] = useState(""); // New state for student email
  const [loading, setLoading] = useState(true);

  // Calculate current year and previous four years
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 4 }, (_, i) => currentYear - i);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const companyResponse = await getApi(`${SERVER_URL}/api/joblisting`);

        console.log(companyResponse.data);

        setCompanies(companyResponse.data);

        const studentResponse = await getApi(
          `${SERVER_URL}/api/student/get-all-student-details`
        );

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
    const name_of_student = event.target.value;
    setSelectedStudent(name_of_student);
    setValue("name_of_student", name_of_student); // Update the form value

    // Find the student SAP number and email
    const selectedStudentData = students.find(
      (student) => student.name_of_student === name_of_student
    );

    if (selectedStudentData) {
      setstudent_sap_no(selectedStudentData.student_sap_no);
      setValue("student_sap_no", selectedStudentData.student_sap_no); // Ensure this is included in form submission
      setValue("student_email_id", selectedStudentData.student_email_id); // Ensure email is included in form submission
    }

    setstudent_sap_no(
      selectedStudentData ? selectedStudentData.student_sap_no : ""
    );
    setstudent_email_id(
      selectedStudentData ? selectedStudentData.student_email_id : ""
    );
  };

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const response = await postApi(
        data,
        `${SERVER_URL}/api/shortlistedstudents`
      );

      if (response.statusCode === 201) {
        toast.success("Student Added Successfully");

        setTimeout(() => {
          navigate(`${ADMIN_PATH}/shortlisted-students`);
        }, 2000);
      }
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          <Toast />
          <div className="">
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
                    <p className="text-red-500 text-sm">
                      {errors.year.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="company_name"
                    className="block text-md font-bold text-gray-700 mb-1"
                  >
                    Company Name
                  </label>
                  <select
                    id="company_name"
                    {...register("company_name", {
                      required: "Company name is required",
                    })}
                    className={`w-full p-2 border rounded ${
                      errors.company_name ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Select Company</option>
                    {companies.map((company) => (
                      <option key={company._id} value={company.company_name}>
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
                    htmlFor="jobRole"
                    className="block text-md font-bold text-gray-700 mb-1"
                  >
                    Job Role
                  </label>

                  <select
                    id="job_role"
                    {...register("job_role", {
                      required: "Job role is required",
                    })}
                    className={`w-full p-2 border rounded ${
                      errors.job_role ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Select Job Role</option>
                    {companies.map((company) => (
                      <option key={company._id} value={company.designation}>
                        {company.job_title}
                      </option>
                    ))}
                  </select>
                  {errors.job_role && (
                    <p className="text-red-500 text-sm">
                      {errors.job_role.message}
                    </p>
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
                    <option value="Computer Engineering">
                      Computer Engineering
                    </option>
                    <option value="Information Technology">
                      Information Technology
                    </option>
                    <option value="Artificial Intelligence and Machine Learning">
                      Artificial Intelligence and Machine Learning
                    </option>
                  </select>
                  {errors.branch && (
                    <p className="text-red-500 text-sm">
                      {errors.branch.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="name_of_student"
                    className="block text-md font-bold text-gray-700 mb-1"
                  >
                    Student Name
                  </label>
                  <select
                    id="name_of_student"
                    {...register("name_of_student", {
                      required: "Student name is required",
                    })}
                    onChange={handleStudentChange}
                    className={`w-full p-2 border rounded ${
                      errors.name_of_student
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  >
                    <option value="">Select Student</option>
                    {filteredStudents.map((student) => (
                      <option key={student._id} value={student.name_of_student}>
                        {student.name_of_student}
                      </option>
                    ))}
                  </select>
                  {errors.name_of_student && (
                    <p className="text-red-500 text-sm">
                      {errors.name_of_student.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="student_sap_no"
                    className="block text-md font-bold text-gray-700 mb-1"
                  >
                    Student SAP Number
                  </label>
                  <input
                    type="text"
                    id="student_sap_no"
                    value={student_sap_no}
                    disabled
                    {...register("student_sap_no")}
                    className="w-full p-2 border rounded bg-gray-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="student_email_id"
                    className="block text-md font-bold text-gray-700 mb-1"
                  >
                    Student Email ID
                  </label>
                  <input
                    type="text"
                    id="student_email_id"
                    disabled
                    {...register("student_email_id")}
                    className="w-full p-2 border rounded bg-gray-100"
                  />
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                  Add Shortlisted Student
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default AddShortlistedStudent;
