import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CustomPaginationActionsTable from "../../../Components/TablePaginationActions.jsx";
import { useNavigate } from "react-router-dom";
import { ADMIN_PATH } from "../../../Utils/URLPath.jsx";

const Branch = () => {
  const [branches, setBranches] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Setting dummy data instead of fetching from API
    const dummyData = [
      {
        branch_name: "Computer Science",
        number_of_students: 120,
        number_of_placed_students: 90,
        number_of_opt_out_students: 10,
        year: 2024,
        campus: "Mumbai",
      },
      {
        branch_name: "Computer Engineering",
        number_of_students: 110,
        number_of_placed_students: 85,
        number_of_opt_out_students: 12,
        year: 2024,
        campus: "Shirpur",
      },
      {
        branch_name: "Information Technology",
        number_of_students: 100,
        number_of_placed_students: 80,
        number_of_opt_out_students: 15,
        year: 2024,
        campus: "Mumbai",
      },
      {
        branch_name: "Artificial Intelligence & Machine Learning",
        number_of_students: 70,
        number_of_placed_students: 55,
        number_of_opt_out_students: 8,
        year: 2024,
        campus: "Shirpur",
      },
    ];
    setBranches(dummyData);
  }, []);

  const columns = [
    { id: "branch_name", label: "Branch Name", align: "left" },
    { id: "number_of_students", label: "Number of Students", align: "right" },
    {
      id: "number_of_placed_students",
      label: "Number of Placed Students",
      align: "right",
    },
    {
      id: "number_of_opt_out_students",
      label: "Number of Opt-Out Students",
      align: "right",
    },
    { id: "year", label: "Year", align: "right" },
    { id: "campus", label: "Campus", align: "left" },
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

  const handleInfo = (branch) => {
    navigate(`${ADMIN_PATH}/branch-details/${branch.branch_name}`);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Branch Details</h1>
      </div>

      <div className="lg:w-full w-full">
        <CustomPaginationActionsTable
          data={branches.map((branch) => ({
            branch_name: branch.branch_name,
            number_of_students: branch.number_of_students,
            number_of_placed_students: branch.number_of_placed_students,
            number_of_opt_out_students: branch.number_of_opt_out_students,
            year: branch.year,
            campus: branch.campus,
            actions: columns.find((col) => col.id === "actions").render(branch),
          }))}
          columns={columns}
        />
      </div>
    </>
  );
};

export default Branch;
