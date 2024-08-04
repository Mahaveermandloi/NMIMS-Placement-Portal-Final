import React from "react";
import Button from "@mui/material/Button";
import CustomPaginationActionsTable from "../../../Components/TablePaginationActions.jsx"; // Import the custom table component

const StudentRequest = () => {
  // Dummy data for demonstration
  const studentData = [
    { sapId: "1001", name: "John Doe", class: "10A" },
    { sapId: "1002", name: "Jane Smith", class: "10B" },
    { sapId: "1003", name: "Sam Wilson", class: "10C" },
    { sapId: "1004", name: "Emma Brown", class: "10D" },
    { sapId: "1005", name: "Michael Green", class: "10E" },
    { sapId: "1006", name: "Olivia White", class: "10F" },
    { sapId: "1007", name: "Sophia Blue", class: "10G" },
    { sapId: "1008", name: "Liam Black", class: "10H" },
    { sapId: "1009", name: "Noah Purple", class: "10I" },
  ];

  // Column definitions
  const columns = [
    { id: "sapId", label: "SAP ID", align: "left" },
    { id: "name", label: "Name", align: "left" },
    { id: "class", label: "Class", align: "left" },
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

  // Handler functions for buttons
  const handleAccept = (row) => {
    alert(`Accepted: ${row.name}`);
    // Add your accept logic here
  };

  const handleReject = (row) => {
    alert(`Rejected: ${row.name}`);
    // Add your reject logic here
  };

  const handleInfo = (row) => {
    alert(`Info for: ${row.name}`);
    // Add your info logic here
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Student Request</h1>
      <div className="lg:w-full w-[340px]  ">
        {" "}
        {/* Enable horizontal scrolling */}
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
  );
};

export default StudentRequest;
