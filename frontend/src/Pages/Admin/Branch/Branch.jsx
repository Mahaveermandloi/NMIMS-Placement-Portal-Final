import React, { useState, useEffect } from "react";
import CustomPaginationActionsTable from "../../../Components/TablePaginationActions.jsx";
import { useNavigate } from "react-router-dom";
import { ADMIN_PATH } from "../../../Utils/URLPath.jsx";
import { getApi, deleteApi } from "../../../Utils/API.js";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import Loader from "../../../Components/Loader.jsx";
import { toast } from "react-toastify";
import { Toast } from "../../../Components/Toast.jsx";
import { IoMdAddCircleOutline } from "react-icons/io";

const Branch = () => {
  const [branches, setBranches] = useState([]);
  const [filteredBranches, setFilteredBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetching data from API
    const fetchData = async () => {
      try {
        const response = await getApi("/api/branch");
        if (response.statusCode === 200) {
          const branchesData = response.data;
          setBranches(branchesData);
          setFilteredBranches(branchesData);

          // Extract unique years from the branches data
          const uniqueYears = [
            ...new Set(branchesData.map((branch) => branch.year)),
          ];
          setYears(uniqueYears);
        } else {
          console.error("Failed to fetch branches", response.message);
          toast.error("Failed to fetch branch data");
        }
      } catch (error) {
        console.error("Error fetching branches", error);
        toast.error("Error fetching branch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (branch) => {
    navigate(`${ADMIN_PATH}/edit-branch/${branch.id}`);
  };

  const handleDelete = async (id) => {
    let isConfirmed = false;

    const confirmDeletion = () => {
      isConfirmed = true;
      toast.dismiss(confirmationToastId);
    };

    const confirmationToastId = toast.info(
      <div>
        <p>Are you sure you want to delete this branch?</p>
        <div className="flex justify-end mt-3">
          <button
            onClick={confirmDeletion}
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
        </div>
      </div>,
      {
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        position: "top-center",
      }
    );

    while (!isConfirmed) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    if (isConfirmed) {
      setLoading(true);

      try {
        const response = await deleteApi(`/api/branch/${id}`);

        if (response.statusCode === 200) {
          toast.success("Branch deleted successfully!");
          setBranches((prevBranches) =>
            prevBranches.filter((branch) => branch._id !== id)
          );
          setFilteredBranches((prevBranches) =>
            prevBranches.filter((branch) => branch._id !== id)
          );
        } else {
          toast.error("Failed to delete branch.");
        }
      } catch (error) {
        console.error("Failed to delete branch:", error);
        toast.error("An error occurred while deleting the branch.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleYearChange = (event) => {
    const year = event.target.value;

    setSelectedYear(year);

    if (year) {
      setFilteredBranches(
        branches.filter((branch) => branch.year === parseInt(year))
      );
    } else {
      setFilteredBranches(branches);
    }
  };

  // Define columns within the component
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
    {
      id: "actions",
      label: "Actions",
      align: "center",
      render: (row) => (
        <div style={{ display: "flex", justifyContent: "center", gap: "8px" }}>
          <FiEdit
            style={{ cursor: "pointer", fontSize: "24px", color: "#3f51b5" }}
            onClick={() => handleEdit(row)}
          />
          <AiOutlineDelete
            style={{ cursor: "pointer", fontSize: "25px", color: "#f44336" }}
            onClick={() => handleDelete(row.id)}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <Toast />

      <div className="lg:w-full  w-[350px] flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Branch</h1>

        <div className="flex items-center">
          {/* Add Branch button (visible on large screens) */}
          <button
            type="button"
            onClick={() => navigate(`${ADMIN_PATH}/create-branch`)}
            className="hidden lg:inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs lg:text-sm px-5 py-1 lg:py-2.5"
          >
            Add Branch
          </button>

          {/* Add Branch icon (visible on small screens) */}
          <IoMdAddCircleOutline
            onClick={() => navigate(`${ADMIN_PATH}/create-branch`)}
            className="lg:hidden  text-black text-3xl cursor-pointer"
          
          />
        </div>
      </div>

      <div className="mb-4">
        <select
          id="year-filter"
          value={selectedYear}
          onChange={handleYearChange}
          className="block w-52 p-2 border rounded"
        >
          <option value="">All Years</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <Loader message="Loading..." />
      ) : (
        <div className="lg:w-full w-[350px] ">
          <CustomPaginationActionsTable
            data={filteredBranches.map((branch) => ({
              id: branch._id,
              branch_name: branch.branch_name,
              number_of_students: branch.number_of_students,
              number_of_placed_students: branch.number_of_placed_students,
              number_of_opt_out_students: branch.number_of_opt_out_students,
              year: branch.year,
              actions: columns
                .find((col) => col.id === "actions")
                .render(branch),
            }))}
            columns={columns}
          />
        </div>
      )}
    </>
  );
};

export default Branch;
