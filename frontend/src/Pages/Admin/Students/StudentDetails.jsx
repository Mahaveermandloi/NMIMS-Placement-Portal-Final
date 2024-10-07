import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CustomPaginationActionsTable from "../../../Components/TablePaginationActions.jsx";
import SearchBar from "./Components/SearchBar.jsx";
import { deleteApi, deleteApi2, getApi } from "../../../Utils/API.js";
import { useNavigate } from "react-router-dom";
import { ADMIN_PATH, SERVER_URL } from "../../../Utils/URLPath.jsx";
import Loader from "../../../Components/Loader.jsx";
import { Toast } from "../../../Components/Toast.jsx";
import { toast } from "react-toastify";

const StudentDetails = () => {
  const [studentData, setStudentData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // State for filtered student data
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        setLoading(true);
        const response = await getApi("/api/student/get-all-student-details");

        setStudentData(response.data);
        setFilteredData(response.data); // Initialize filteredData with the full student data
      } catch (error) {
        console.error("Error fetching student data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, []);

  useEffect(() => {
    // Filter the student data based on the search query
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = studentData.filter(
      (student) =>
        student.student_sap_no.toString().includes(lowerCaseQuery) ||
        student.name_of_student.toLowerCase().includes(lowerCaseQuery) ||
        student.student_email_id.toLowerCase().includes(lowerCaseQuery) ||
        (student.skills &&
          student.skills.some((skill) =>
            skill.toLowerCase().includes(lowerCaseQuery)
          ))
    );

    setFilteredData(filtered);
  }, [searchQuery, studentData]); // Runs every time searchQuery or studentData changes

  const columns = [
    {
      id: "student_profile_image",
      label: "Student Profile",
      align: "left",
      render: (row) => (
        <img
          src={`${row.student_profile_image}`}
          alt={`${row.name_of_student}'s profile`}
          className="rounded-full h-16 w-16 "
        />
      ),
    },
    { id: "student_sap_no", label: "SAP ID", align: "left" },
    { id: "name_of_student", label: "Name", align: "left" },
    { id: "student_email_id", label: "Email", align: "left" },
    { id: "student_alternate_email_id", label: "College Email", align: "left" },
    { id: "student_mobile_no", label: "Number", align: "left" },
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
          <Button
            variant="contained"
            color="error"
            onClick={() => handleDelete(row)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const handleInfo = (student) => {
    navigate(`${ADMIN_PATH}/student-details/${student.student_sap_no}`);
  };

  const handleDelete = async (student) => {
    const confirmationToastId = toast(
      <div>
        <p>Are you sure you want to delete this student record?</p>
        <button
          onClick={async () => {
            toast.dismiss(confirmationToastId);
            await proceedToDelete(student);
          }}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
        >
          Confirm
        </button>
        <button
          onClick={() => toast.dismiss(confirmationToastId)}
          className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 text-sm ml-2"
        >
          Cancel
        </button>
      </div>,
      {
        autoClose: false,
        closeOnClick: false,
        position: "top-center",
      }
    );
  };

  const proceedToDelete = async (student) => {
    try {
      const response = await deleteApi(
        `/api/student/delete-student/${student.student_sap_no}`
      );

      if (response.statusCode === 200) {
        toast.success("Student Record Deleted Successfully");
      } else {
        toast.error("Failed to delete student record.");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "An error occurred while deleting the record."
      );
    }
  };

  return (
    <>
      <Toast />
      <div>
        <div className="flex   flex-col lg:flex-row  justify-between   lg:items-center">
          <div>
            <h1 className="text-3xl font-bold mb-4">Student Details</h1>
          </div>
          <div className=" lg:w-[400px]">
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />{" "}
            {/* Pass search state */}
          </div>
        </div>
        <div className="lg:w-full w-[340px] mt-4 ">
          {loading ? (
            <Loader message="Loading student data..." />
          ) : (
            <CustomPaginationActionsTable
              data={filteredData.map((student) => ({
                student_profile_image: student.student_profile_image,
                student_sap_no: student.student_sap_no,
                name_of_student: student.name_of_student,
                student_email_id: student.student_email_id,
                student_alternate_email_id: student.student_alternate_email_id,
                student_mobile_no: student.student_mobile_no,
                actions: columns
                  .find((col) => col.id === "actions")
                  .render(student),
              }))}
              columns={columns}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default StudentDetails;
