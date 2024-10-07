import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Toast } from "../../../Components/Toast.jsx";
import { useNavigate } from "react-router-dom";
import { postApi } from "../../../Utils/API.js";
import { ADMIN_PATH, SERVER_URL } from "../../../Utils/URLPath.jsx";
import Loader from "../../../Components/Loader.jsx";

import { IoArrowBack } from "react-icons/io5";

const UploadCompaniesDetails = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState("uploadCompany");
  const [loadingCompany, setLoadingCompany] = useState(false); // State for company loader
  const [loadingExcel, setLoadingExcel] = useState(false); // State for Excel loader

  const {
    register: registerCompany,
    handleSubmit: handleSubmitCompany,
    formState: { errors: errorsCompany },
  } = useForm();

  const {
    register: registerExcel,
    handleSubmit: handleSubmitExcel,
    formState: { errors: errorsExcel },
  } = useForm();

  const onSubmitCompany = async (data) => {
    setLoadingCompany(true); // Show loader
    try {
      // Post the form data to the API
      const response = await postApi(
        data,
        `${SERVER_URL}/api/company/register-company`
      );

      if (response.statusCode === 201) {
        toast.success("Company data uploaded successfully");
        setTimeout(() => {
          navigate(`${ADMIN_PATH}/companies`);
        }, 1000);
      }
    } catch (error) {
      toast.error("Failed to upload company data");
      console.error("Error uploading company data:", error);
    } finally {
      setLoadingCompany(false); // Hide loader
    }
  };

  const onSubmitExcel = (data) => {
    setLoadingExcel(true);

    toast.success("Excel data uploaded successfully");
    setLoadingExcel(false); // Hide loader
  };

  return (
    <>
      <Toast />
      <div className="flex mb-4 flex-col gap-4">
        <IoArrowBack
          size={30}
          onClick={() => {
            navigate(`${ADMIN_PATH}/companies`);
          }}
          className="cursor-pointer"
        />

        <h1 className="text-3xl font-bold">Add a Company</h1>
      </div>

      {tab === "uploadCompany" ? (
        <form
          onSubmit={handleSubmitCompany(onSubmitCompany)}
          className="space-y-4"
        >
          <div className="flex flex-col lg:grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="company_name"
                className="block text-sm font-bold text-gray-700"
              >
                Company Name
              </label>
              <input
                type="text"
                id="company_name"
                placeholder="Enter Company Name"
                className={`block w-full p-2 border rounded ${
                  errorsCompany.company_name ? "border-red-500" : ""
                }`}
                {...registerCompany("company_name", {
                  required: "Company name is required",
                })}
              />
              {errorsCompany.company_name && (
                <p className="text-red-500 text-sm">
                  {errorsCompany.company_name.message}
                </p>
              )}
            </div>
            {/* Other fields */}

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
                  errorsCompany.year ? "border-red-500" : ""
                }`}
                {...registerCompany("year", {
                  required: "Year is required",
                })}
              >
                <option value="">Select Year</option>
                {[...Array(5).keys()].map((x) => {
                  const year = new Date().getFullYear() - x;
                  return (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  );
                })}
              </select>
              {errorsCompany.year && (
                <p className="text-red-500 text-sm">
                  {errorsCompany.year.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="company_logo"
                className="block text-sm font-bold text-gray-700"
              >
                Company Logo
              </label>
              <input
                type="file"
                id="company_logo"
                className="block w-full p-2 border rounded"
                accept="image/*" // Allow only image files
                {...registerCompany("company_logo")}
              />
            </div>
          </div>

          <div className="relative">
            {loadingCompany ? (
              <>
                <Loader message="Uploading..." />
              </>
            ) : (
              <>
                <button
                  type="submit"
                  className="bg-green-500    text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Submit
                </button>
              </>
            )}
          </div>
        </form>
      ) : (
        <></>
      )}
    </>
  );
};

export default UploadCompaniesDetails;
