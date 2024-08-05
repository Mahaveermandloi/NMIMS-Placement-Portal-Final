// import React, { useState, useEffect } from "react";
// import Button from "@mui/material/Button";
// import CustomPaginationActionsTable from "../../../Components/TablePaginationActions.jsx";
// import SearchBar from "./Components/SearchBar.jsx";
// import { getApi } from "../../../Utils/API.js";
// import { useNavigate } from "react-router-dom";
// import { ADMIN_PATH } from "../../../Utils/URLPath.jsx";

// const StudentDetails = () => {
//   const [studentData, setStudentData] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchStudentData = async () => {
//       try {
//         const response = await getApi("/api/student/get-all-student-details");
//         console.log(response.data);
//         setStudentData(response.data);
//       } catch (error) {
//         console.error("Error fetching student data:", error);
//       }
//     };

//     fetchStudentData();
//   }, []);

//   const columns = [
//     { id: "student_sap_no", label: "SAP ID", align: "left" },
//     { id: "name_of_student", label: "Name", align: "left" },
//     { id: "student_email_id", label: "Email", align: "left" },
//     { id: "student_alternate_email_id", label: "College Email", align: "left" },
//     { id: "student_mobile_no", label: "Number", align: "left" },
//     {
//       id: "actions",
//       label: "Actions",
//       align: "center",
//       render: (row) => (
//         <div style={{ display: "flex", justifyContent: "center", gap: "8px" }}>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={() => handleInfo(row)}
//           >
//             Info
//           </Button>
//         </div>
//       ),
//     },
//   ];

//   const handleInfo = (student) => {
//     navigate(`${ADMIN_PATH}/student-details/${student.student_sap_no}`);
//   };

//   return (
//     <div>
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-3xl font-bold mb-4">Student Details</h1>
//         </div>
//         <div className="w-[400px]">
//           <SearchBar />
//         </div>
//       </div>
//       <div className="lg:w-full w-[340px]">
//         <CustomPaginationActionsTable
//           data={studentData.map((student) => ({
//             student_sap_no: student.student_sap_no,
//             name_of_student: student.name_of_student,
//             student_email_id: student.student_email_id,
//             student_alternate_email_id: student.student_alternate_email_id,
//             student_mobile_no: student.student_mobile_no,
//             actions: columns
//               .find((col) => col.id === "actions")
//               .render(student),
//           }))}
//           columns={columns}
//         />
//       </div>
//     </div>
//   );
// };

// export default StudentDetails;

import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CustomPaginationActionsTable from "../../../Components/TablePaginationActions.jsx";
import SearchBar from "./Components/SearchBar.jsx";
import { getApi } from "../../../Utils/API.js";
import { useNavigate } from "react-router-dom";
import { ADMIN_PATH } from "../../../Utils/URLPath.jsx";
import Loader from "../../../Components/Loader.jsx"; // Import the Loader component

const StudentDetails = () => {
  const [studentData, setStudentData] = useState([]);
  const [loading, setLoading] = useState(true); // Add a loading state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        setLoading(true); // Start loading before fetching
        const response = await getApi("/api/student/get-all-student-details");
        console.log(response.data);
        setStudentData(response.data);
      } catch (error) {
        console.error("Error fetching student data:", error);
      } finally {
        setLoading(false); // End loading after fetching is complete
      }
    };

    fetchStudentData();
  }, []);

  const columns = [
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
        </div>
      ),
    },
  ];

  const handleInfo = (student) => {
    navigate(`${ADMIN_PATH}/student-details/${student.student_sap_no}`);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-4">Student Details</h1>
        </div>
        <div className="w-[400px]">
          <SearchBar />
        </div>
      </div>
      <div className="lg:w-full w-[340px] ">
        {loading ? ( // Conditionally render loader or table
          <Loader message="Loading student data..." />
        ) : (
          <CustomPaginationActionsTable
            data={studentData.map((student) => ({
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
  );
};

export default StudentDetails;
