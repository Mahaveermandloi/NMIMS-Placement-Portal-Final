// import React from "react";

// const ShortlistedStudentDetails = () => {
//   return (
//     <>
//       <h1 className="text-3xl font-bold text-gray-700 mb-6">
//        Shortlisted Student Details
//       </h1>
//     </>
//   );
// };

// export default ShortlistedStudentDetails;
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getApi } from "../../../Utils/API.js"; // Adjust the import path if necessary
import { SERVER_URL } from "../../../Utils/URLPath.jsx";
import { toast } from "react-toastify";

const ShortlistedStudentDetails = () => {
  const { id } = useParams(); // Extract the student ID from the URL parameters
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await getApi(`/api/shortlistedstudents/${id}`);
        
        if (response.statusCode === 200) {
          setStudent(response.data);
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        toast.error("Failed to fetch student data");
      }
    };

    fetchStudentData();
  }, [id]);

  if (!student) return <p>Loading...</p>;

  return (
    <>
      <h1 className="text-3xl font-bold text-gray-700 mb-6">
        Shortlisted Student Details
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Field
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Value
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Student SAP No
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {student.student_sap_no}
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Name
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {student.name_of_student}
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Company
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {student.company_name}
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Job Role
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {student.job_title}
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Branch
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {student.engineering_specialization || "Unknown"}
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Year
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {student.year}
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Email
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {student.student_email_id}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ShortlistedStudentDetails;
