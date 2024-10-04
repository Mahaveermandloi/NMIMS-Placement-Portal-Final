import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Toast } from "../../../Components/Toast.jsx";
import Loader from "../../../Components/Loader.jsx";
import { getApi, postApi, putApi } from "../../../Utils/API.js";
import { ADMIN_PATH, SERVER_URL } from "../../../Utils/URLPath.jsx";
import { useNavigate, useParams } from "react-router-dom";

const EditPlacedStudent = () => {
  const { id } = useParams(); // Get the student ID from the URL
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
  const [student_sap_no, setStudentSapNo] = useState("");
  const [student_email_id, setStudentEmailId] = useState("");
  const [loading, setLoading] = useState(true);

  // Calculate current year and previous four years
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 4 }, (_, i) => currentYear - i);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch companies
        const companyResponse = await getApi(`${SERVER_URL}/api/joblisting`);
        setCompanies(companyResponse.data);

        // Fetch the student details using the ID
        const studentResponse = await getApi(
          `${SERVER_URL}/api/placedstudents/${id}`
        );
        if (studentResponse.statusCode === 200) {
          const data = studentResponse.data;
          setValue("year", data.year);
          setValue("company_name", data.company_name);
          setValue("job_title", data.job_title);
          setValue("ctc", data.ctc);
          setValue("branch", data.engineering_specialization);
          setValue("name_of_student", data.name_of_student);
          setValue("student_sap_no", data.student_sap_no);
          setValue("student_email_id", data.student_email_id);
          setStudentSapNo(data.student_sap_no);
          setStudentEmailId(data.student_email_id);
          setSelectedBranch(data.engineering_specialization);
        }

        // Fetch all students
        const allStudentsResponse = await getApi(
          `${SERVER_URL}/api/student/get-all-student-details`
        );
        setStudents(allStudentsResponse.data);
        setFilteredStudents(allStudentsResponse.data);

        setLoading(false);
      } catch (error) {
        toast.error("Failed to fetch data");
        setLoading(false);
      }
    };

    fetchData();
  }, [id, setValue]);

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
    setValue("branch", branch);
  };

  const handleStudentChange = (event) => {
    const name_of_student = event.target.value;
    const selectedStudentData = students.find(
      (student) => student.name_of_student === name_of_student
    );

    if (selectedStudentData) {
      setStudentSapNo(selectedStudentData.student_sap_no);
      setValue("student_sap_no", selectedStudentData.student_sap_no);
      setValue("student_email_id", selectedStudentData.student_email_id);
      setStudentEmailId(selectedStudentData.student_email_id);
    } else {
      setStudentSapNo("");
      setStudentEmailId("");
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await putApi(
        data,
        `${SERVER_URL}/api/placedstudents/${id}`
      ); // Update endpoint

      if (response.statusCode === 200) {
        setLoading(false);
        toast.success("Student Updated Successfully");
        setTimeout(() => {
          navigate(`${ADMIN_PATH}/placed-students`);
        }, 2000);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <>
          <Toast />
          <Loader />
        </>
      ) : (
        <>
          <Toast />
          <div>
            <h1 className="text-3xl font-bold text-gray-700 mb-6">
              Edit Placed Student
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* Year */}
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

                {/* Company Name */}
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

                {/* Job Role */}
                <div>
                  <label
                    htmlFor="job_title"
                    className="block text-md font-bold text-gray-700 mb-1"
                  >
                    Job Title
                  </label>
                  <select
                    id="job_title"
                    {...register("job_title", {
                      required: "Job title is required",
                    })}
                    className={`w-full p-2 border rounded ${
                      errors.job_title ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Select Job Title</option>
                    {companies.map((company) => (
                      <option key={company._id} value={company.job_title}>
                        {company.job_title}
                      </option>
                    ))}
                  </select>
                  {errors.job_title && (
                    <p className="text-red-500 text-sm">
                      {errors.job_title.message}
                    </p>
                  )}
                </div>

                {/* CTC */}
                <div>
                  <label
                    htmlFor="ctc"
                    className="block text-md font-bold text-gray-700 mb-1"
                  >
                    CTC (Cost to Company)
                  </label>
                  <input
                    type="text"
                    id="ctc"
                    {...register("ctc", { required: "CTC is required" })}
                    className={`w-full p-2 border rounded ${
                      errors.ctc ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  <p className="text-gray-400 text-sm">Example 6.4 LPA</p>
                  {errors.ctc && (
                    <p className="text-red-500 text-sm">{errors.ctc.message}</p>
                  )}
                </div>

                {/* Branch */}
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

                {/* Student Name */}
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

                {/* Student SAP Number */}
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
                    {...register("student_sap_no", {
                      required: "Student SAP number is required",
                    })}
                    value={student_sap_no}
                    readOnly
                    className={`w-full p-2 border rounded ${
                      errors.student_sap_no
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {errors.student_sap_no && (
                    <p className="text-red-500 text-sm">
                      {errors.student_sap_no.message}
                    </p>
                  )}
                </div>

                {/* Student Email */}
                <div>
                  <label
                    htmlFor="student_email_id"
                    className="block text-md font-bold text-gray-700 mb-1"
                  >
                    Student Email
                  </label>
                  <input
                    type="email"
                    id="student_email_id"
                    {...register("student_email_id", {
                      required: "Student email is required",
                    })}
                    value={student_email_id}
                    readOnly
                    className={`w-full p-2 border rounded ${
                      errors.student_email_id
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {errors.student_email_id && (
                    <p className="text-red-500 text-sm">
                      {errors.student_email_id.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Update Student
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default EditPlacedStudent;
