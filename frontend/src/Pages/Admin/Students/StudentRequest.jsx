import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import CustomPaginationActionsTable from "../../../Components/TablePaginationActions.jsx"; // Import the custom table component
import Loader from "../../../Components/Loader.jsx";
import { Toast } from "../../../Components/Toast.jsx";
import { toast } from "react-toastify";
import { getApi, putApi, deleteApi2 } from "../../../Utils/API.js";
import { ADMIN_PATH, SERVER_URL } from "../../../Utils/URLPath.jsx";
import { useNavigate } from "react-router-dom";

const StudentRequest = () => {
  const [studentData, setStudentData] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Fetch student data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getApi(`${SERVER_URL}/api/student-request`);

        setStudentData(response.data); // Assuming 'message' contains the list of students
        setLoading(false);
      } catch (error) {
        toast.error("Failed to fetch student data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Define the columns to display
  const columns = [
    { id: "student_sap_no", label: "SAP ID", align: "left" },
    { id: "name_of_student", label: "Name", align: "left" },
    { id: "program", label: "Program", align: "left" },
    {
      id: "engineering_specialization",
      label: "Specialization",
      align: "left",
    },
    { id: "student_email_id", label: "Email", align: "left" },
    {
      id: "status",
      label: "Status",
      align: "left",
      render: (row) => (
        <span
          style={{
            color: row.status.toLowerCase() === "pending" ? "white" : "black",
            background: "#fcba03",
          }}
        >
          {row.status}
        </span>
      ),
    },
    {
      id: "actions",
      label: "Actions",
      align: "center",
      render: (row) => (
        <div style={{ display: "flex", justifyContent: "center", gap: "8px" }}>
          <Button
            variant="contained"
            color="success"
            onClick={() => handleAccept(row)}
          >
            Accept
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleReject(row)}
          >
            Reject
          </Button>
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

  // Handlers for actions
  const handleAccept = async (row) => {
    try {
      const response = await putApi(
        {
          student_sap_no: row.student_sap_no,
        },
        `${SERVER_URL}/api/student-request`
      );

      if (response.statusCode === 200) {
        toast.success(`Accepted: ${row.name_of_student}`);
        // Update studentData to remove the accepted student
        setStudentData((prevData) =>
          prevData.filter(
            (student) => student.student_sap_no !== row.student_sap_no
          )
        );
      }
    } catch (error) {
      toast.error("Failed to accept request");
    }
  };

  const handleReject = async (row) => {
    try {
      const response = await deleteApi2(
        {
          student_sap_no: row.student_sap_no,
        },
        `${SERVER_URL}/api/student-request`
      );

      if (response.statusCode === 200) {
        toast.success(`Rejected: ${row.name_of_student}`);
        // Update studentData to remove the rejected student
        setStudentData((prevData) =>
          prevData.filter(
            (student) => student.student_sap_no !== row.student_sap_no
          )
        );
      }
    } catch (error) {
      toast.error("Failed to reject request");
    }
  };

  const handleInfo = (row) => {
    navigate(`${ADMIN_PATH}/student-request/${row.student_sap_no}`);
  };

  if (loading) {
    return <Loader />; // Display the loader while fetching data
  }

  return (
    <>
      <Toast />
      <div>
        <h1 className="text-3xl font-bold mb-4">Student Request</h1>
        <div className="lg:w-full w-[340px]">
          <CustomPaginationActionsTable
            data={studentData.map((student) => ({
              ...student,
              actions: columns
                .find((col) => col.id === "actions")
                .render(student), // Add actions dynamically
            }))}
            columns={columns}
          />
        </div>
      </div>
    </>
  );
};

export default StudentRequest;
