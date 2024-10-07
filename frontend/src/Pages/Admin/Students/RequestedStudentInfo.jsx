import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getApi } from "../../../Utils/API.js";
import Loader from "../../../Components/Loader.jsx"; // Import the Loader component
import { SERVER_URL } from "../../../Utils/URLPath.jsx";
import { Toast } from "../../../Components/Toast.jsx";

const RequestedStudentInfo = () => {
  const [studentData, setStudentData] = useState({});
  const [loading, setLoading] = useState(true); // Add a loading state
  const { student_sap_no } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        setLoading(true); // Start loading before fetching
        const response = await getApi(`/api/student-request/${student_sap_no}`);
       
     
        setStudentData(response.data);
      } catch (error) {
        console.error("Error fetching student data:", error);
      } finally {
        setLoading(false); // End loading after fetching is complete
      }
    };

    fetchStudentData();
  }, [student_sap_no]);

  if (loading) {
    return <Loader />; // Show loader while loading
  }

  return (
    <>
      <Toast />
      <div className="container  mx-auto  text-sm  lg:text-md  ">
        <h2 className="text-xl lg:text-2xl  font-bold mb-4">
          Student Information
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 w-1/2 border">Field</th>
                <th className="px-4 py-2 w-1/2 border">Value</th>
              </tr>
            </thead>
            <tbody>
              {/* Render specific fields */}

              <tr className="bg-gray-100">
                <td className="px-4 py-2 border font-semibold uppercase text-gray-500">
                  Student Profile Image
                </td>
                <td className="px-4 py-2 border">
                  <img
                    src={`${SERVER_URL}${studentData.student_profile_image}`}
                    alt="Student Profile"
                    className="w-32 h-32 object-cover"
                  />

                </td>
              </tr>
              <tr className="bg-gray-100">
                <td className="px-4 py-2 border font-semibold uppercase text-gray-500">
                  Student CV
                </td>
                <td className="px-4 py-2 border">
                  <a
                    href={`${SERVER_URL}${studentData.student_cv}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    STUDENT CV / RESUME
                  </a>
                </td>
              </tr>
              <tr className="bg-white">
                <td className="px-4 py-2 border font-semibold uppercase text-gray-500">
                  Student Marksheet SEM I
                </td>
                <td className="px-4 py-2 border">
                  <a
                    href={`${SERVER_URL}${studentData.student_marksheet_sem_1}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    SEM I MARKSHEET
                  </a>
                </td>
              </tr>
              <tr className="bg-gray-100">
                <td className="px-4 py-2 border font-semibold uppercase text-gray-500">
                  Student Marksheet SEM II
                </td>
                <td className="px-4 py-2 border">
                  <a
                    href={`${SERVER_URL}${studentData.student_marksheet_sem_2}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    SEM II MARKSHEET
                  </a>
                </td>
              </tr>
              <tr className="bg-white">
                <td className="px-4 py-2 border font-semibold uppercase text-gray-500">
                  Student Marksheet SEM III
                </td>
                <td className="px-4 py-2 border">
                  <a
                    href={`${SERVER_URL}${studentData.student_marksheet_sem_3}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    SEM III MARKSHEET
                  </a>
                </td>
              </tr>
              <tr className="bg-gray-100">
                <td className="px-4 py-2 border font-semibold uppercase text-gray-500">
                  Student Marksheet SEM IV
                </td>
                <td className="px-4 py-2 border">
                  <a
                    href={`${SERVER_URL}${studentData.student_marksheet_sem_4}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    SEM IV MARKSHEET
                  </a>
                </td>
              </tr>
              <tr className="bg-white">
                <td className="px-4 py-2 border font-semibold uppercase text-gray-500">
                  Student Marksheet SEM V
                </td>
                <td className="px-4 py-2 border">
                  <a
                    href={`${SERVER_URL}${studentData.student_marksheet_sem_5}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    SEM V MARKSHEET
                  </a>
                </td>
              </tr>
              <tr className="bg-gray-100">
                <td className="px-4 py-2 border font-semibold uppercase text-gray-500">
                  Student Marksheet SEM VI
                </td>
                <td className="px-4 py-2 border">
                  <a
                    href={`${SERVER_URL}${studentData.student_marksheet_sem_6}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    SEM VI MARKSHEET
                  </a>
                </td>
              </tr>
              <tr className="bg-white">
                <td className="px-4 py-2 border font-semibold uppercase text-gray-500">
                  Student Mobile No
                </td>
                <td className="px-4 py-2 border">
                  {studentData.student_mobile_no}
                </td>
              </tr>

              {/* Render other fields */}
              {Object.entries(studentData)
                .filter(
                  ([key]) =>
                    ![
                      "student_cv",
                      "student_marksheet_sem_1",
                      "student_marksheet_sem_2",
                      "student_marksheet_sem_3",
                      "student_marksheet_sem_4",
                      "student_marksheet_sem_5",
                      "student_marksheet_sem_6",
                      "student_mobile_no",
                      "student_profile_image",
                    ].includes(key)
                )
                .map(([key, value], index) => (
                  <tr
                    key={key}
                    className={`${
                      index % 2 === 0 ? "bg-gray-100" : "bg-white"
                    }`}
                  >
                    <td className="px-4 py-2 border font-semibold uppercase text-gray-500">
                      {key.replace(/_/g, " ")}
                    </td>
                    <td className="px-4 py-2 border">{String(value)}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default RequestedStudentInfo;
