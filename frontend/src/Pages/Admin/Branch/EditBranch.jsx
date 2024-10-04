import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getApi, putApi } from "../../../Utils/API.js";
import { ADMIN_PATH } from "../../../Utils/URLPath.jsx";
import Loader from "../../../Components/Loader.jsx";
import { Toast } from "../../../Components/Toast.jsx";
import { useNavigate, useParams } from "react-router-dom";

const EditBranch = () => {
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false); // New state for submit loading
  const [branchData, setBranchData] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchBranchData = async () => {
      try {
        const response = await getApi(`/api/branch/${id}`);
        if (response.statusCode === 200) {
          setBranchData(response.data);
          reset({
            branch_name: response.data.branch_name,
            number_of_students: response.data.number_of_students,
            number_of_placed_students: response.data.number_of_placed_students,
            number_of_opt_out_students:
              response.data.number_of_opt_out_students,
            year: response.data.year,
          });
        } else {
          toast.error("Failed to fetch branch data");
        }
      } catch (error) {
        console.error("Error fetching branch data:", error);
        toast.error("Error fetching branch data");
      } finally {
        setLoading(false);
      }
    };

    fetchBranchData();
  }, [id, reset]);

  const onSubmit = async (data) => {
    setSubmitLoading(true); // Show loader on submit
    try {
      const payload = {
        branch_name: data.branch_name,
        number_of_students: data.number_of_students,
        number_of_placed_students: data.number_of_placed_students,
        number_of_opt_out_students: data.number_of_opt_out_students,
        year: data.year,
      };

      const response = await putApi(payload, `/api/branch/${id}`);

      if (response.statusCode === 200) {
        toast.success("Branch updated successfully");
        setTimeout(() => {
          navigate(`${ADMIN_PATH}/branch`);
        }, 1500);
      } else {
        toast.error("Failed to update branch data");
      }
    } catch (error) {
      console.error("Error updating branch data:", error);
      toast.error("Error updating branch data");
    } finally {
      setSubmitLoading(false); // Hide loader after submit
    }
  };

  // Calculate the current year and the next four years
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 4 }, (_, index) => currentYear - index);

  return (
    <>
      <Toast />
      {loading ? (
        <Loader message="Loading..." />
      ) : (
        <div>
          <h1 className="text-3xl font-bold mb-6">Edit Branch Details</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid lg:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="branch_name"
                  className="block text-sm font-bold text-gray-700"
                >
                  Branch Name
                </label>
                <input
                  type="text"
                  id="branch_name"
                  placeholder="Enter Branch Name"
                  className={`block w-full p-2 border rounded ${
                    errors.branch_name ? "border-red-500" : ""
                  }`}
                  {...register("branch_name", {
                    required: "Branch name is required",
                    pattern: {
                      value: /^[A-Za-z\s]+$/,
                      message:
                        "Branch name can only contain letters and spaces",
                    },
                  })}
                />
                {errors.branch_name && (
                  <p className="text-red-500 text-sm">
                    {errors.branch_name.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="number_of_students"
                  className="block text-sm font-bold text-gray-700"
                >
                  Number of Students
                </label>
                <input
                  type="number"
                  id="number_of_students"
                  placeholder="Enter Number of Students"
                  min="0"
                  className={`block w-full p-2 border rounded ${
                    errors.number_of_students ? "border-red-500" : ""
                  }`}
                  {...register("number_of_students", {
                    required: "Number of students is required",
                    min: {
                      value: 0,
                      message: "Number of students cannot be negative",
                    },
                  })}
                />
                {errors.number_of_students && (
                  <p className="text-red-500 text-sm">
                    {errors.number_of_students.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="number_of_placed_students"
                  className="block text-sm font-bold text-gray-700"
                >
                  Number of Placed Students
                </label>
                <input
                  type="number"
                  id="number_of_placed_students"
                  placeholder="Enter Number of Placed Students"
                  min="0"
                  className={`block w-full p-2 border rounded ${
                    errors.number_of_placed_students ? "border-red-500" : ""
                  }`}
                  {...register("number_of_placed_students", {
                    required: "Number of placed students is required",
                    min: {
                      value: 0,
                      message: "Number of placed students cannot be negative",
                    },
                  })}
                />
                {errors.number_of_placed_students && (
                  <p className="text-red-500 text-sm">
                    {errors.number_of_placed_students.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="number_of_opt_out_students"
                  className="block text-sm font-bold text-gray-700"
                >
                  Number of Opt-Out Students
                </label>
                <input
                  type="number"
                  id="number_of_opt_out_students"
                  placeholder="Enter Number of Opt-Out Students"
                  min="0"
                  className={`block w-full p-2 border rounded ${
                    errors.number_of_opt_out_students ? "border-red-500" : ""
                  }`}
                  {...register("number_of_opt_out_students", {
                    required: "Number of opt-out students is required",
                    min: {
                      value: 0,
                      message: "Number of opt-out students cannot be negative",
                    },
                  })}
                />
                {errors.number_of_opt_out_students && (
                  <p className="text-red-500 text-sm">
                    {errors.number_of_opt_out_students.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="year"
                  className="block text-sm font-bold text-gray-700"
                >
                  Year
                </label>
                <select
                  id="year"
                  className={`block w-full p-2 border rounded ${
                    errors.year ? "border-red-500" : ""
                  }`}
                  {...register("year", { required: "Year is required" })}
                >
                  <option value="">Select Year</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                {errors.year && (
                  <p className="text-red-500 text-sm">{errors.year.message}</p>
                )}
              </div>
            </div>

            {submitLoading ? (
              <>
                <Loader message="Loading..." />
              </>
            ) : (
              <>
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                >
                  Submit
                </button>
              </>
            )}
          </form>
        </div>
      )}
    </>
  );
};

export default EditBranch;
