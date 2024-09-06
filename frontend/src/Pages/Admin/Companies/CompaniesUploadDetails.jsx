import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Toast } from "../../../Components/Toast.jsx";
import { useNavigate } from "react-router-dom";
import { postApi } from "../../../Utils/API.js";
import { ADMIN_PATH, SERVER_URL } from "../../../Utils/URLPath.jsx";
import Loader from "../../../Components/Loader.jsx";

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

      // console.log("Server Response:", response);
    } catch (error) {
      toast.error("Failed to upload company data");
      console.error("Error uploading company data:", error);
    } finally {
      setLoadingCompany(false); // Hide loader
    }
  };

  const onSubmitExcel = (data) => {
    setLoadingExcel(true); // Show loader
    // console.log("Upload Excel Data:", data);
    toast.success("Excel data uploaded successfully");
    setLoadingExcel(false); // Hide loader
  };

  return (
    <>
      <Toast />
      <div className="flex mb-4">
        <button
          className={`px-4 py-2 mr-2 rounded ${
            tab === "uploadCompany" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setTab("uploadCompany")}
        >
          Upload a Company
        </button>
        <button
          className={`px-4 py-2 rounded ${
            tab === "uploadExcel" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setTab("uploadExcel")}
        >
          Upload via Excel
        </button>
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
                htmlFor="selection_rounds"
                className="block text-sm font-bold text-gray-700"
              >
                Selection Rounds
              </label>
              <input
                type="text"
                id="selection_rounds"
                placeholder="Enter Selection Rounds"
                className={`block w-full p-2 border rounded ${
                  errorsCompany.selection_rounds ? "border-red-500" : ""
                }`}
                {...registerCompany("selection_rounds", {
                  required: "Selection rounds are required",
                })}
              />
              {errorsCompany.selection_rounds && (
                <p className="text-red-500 text-sm">
                  {errorsCompany.selection_rounds.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="eligible_branches_and_programs"
                className="block text-sm font-bold text-gray-700"
              >
                Eligible Programs and Branches
              </label>
              <textarea
                id="eligible_branches_and_programs"
                placeholder="Enter Eligible Programs and Branches"
                className={`block w-full p-2 border rounded ${
                  errorsCompany.eligible_branches_and_programs
                    ? "border-red-500"
                    : ""
                }`}
                {...registerCompany("eligible_branches_and_programs", {
                  required: "Eligible programs and branches are required",
                })}
              />
              {errorsCompany.eligible_branches_and_programs && (
                <p className="text-red-500 text-sm">
                  {errorsCompany.eligible_branches_and_programs.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="academic_criteria"
                className="block text-sm font-bold text-gray-700"
              >
                Academic Criteria
              </label>
              <textarea
                id="academic_criteria"
                placeholder="Enter Academic Criteria"
                className={`block w-full p-2 border rounded ${
                  errorsCompany.academic_criteria ? "border-red-500" : ""
                }`}
                {...registerCompany("academic_criteria", {
                  required: "Academic criteria is required",
                })}
              />
              {errorsCompany.academic_criteria && (
                <p className="text-red-500 text-sm">
                  {errorsCompany.academic_criteria.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="designation"
                className="block text-sm font-bold text-gray-700"
              >
                Designation
              </label>
              <input
                type="text"
                id="designation"
                placeholder="Enter Designation"
                className={`block w-full p-2 border rounded ${
                  errorsCompany.designation ? "border-red-500" : ""
                }`}
                {...registerCompany("designation", {
                  required: "Designation is required",
                })}
              />
              {errorsCompany.designation && (
                <p className="text-red-500 text-sm">
                  {errorsCompany.designation.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="details_of_ctc"
                className="block text-sm font-bold text-gray-700"
              >
                Details of CTC
              </label>
              <input
                type="text"
                id="details_of_ctc"
                placeholder="Enter Details of CTC"
                className={`block w-full p-2 border rounded ${
                  errorsCompany.details_of_ctc ? "border-red-500" : ""
                }`}
                {...registerCompany("details_of_ctc", {
                  required: "Details of the CTC are required",
                })}
              />
              {errorsCompany.details_of_ctc && (
                <p className="text-red-500 text-sm">
                  {errorsCompany.details_of_ctc.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="ctc"
                className="block text-sm font-bold text-gray-700"
              >
                CTC
              </label>
              <input
                type="text"
                id="ctc"
                placeholder="Enter CTC"
                className={`block w-full p-2 border rounded ${
                  errorsCompany.ctc ? "border-red-500" : ""
                }`}
                {...registerCompany("ctc", {
                  required: "CTC is required",
                })}
              />
              {errorsCompany.ctc && (
                <p className="text-red-500 text-sm">
                  {errorsCompany.ctc.message}
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

            <div>
              <label
                htmlFor="company_files"
                className="block text-sm font-bold text-gray-700"
              >
                Additional Files
              </label>
              <input
                type="file"
                id="company_files"
                className="block w-full p-2 border rounded"
                multiple
                accept=".pdf, .xlsx, .xls, .doc, .docx, .ppt, .pptx, .txt" // Allow specific file types
                {...registerCompany("company_files")}
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
        <form onSubmit={handleSubmitExcel(onSubmitExcel)} className="space-y-4">
          <div>
            <label
              htmlFor="excel_file"
              className="block text-sm font-bold text-gray-700"
            >
              Upload Excel File
            </label>
            <input
              type="file"
              id="excel_file"
              className="block w-full p-2 border rounded"
              {...registerExcel("excel_file", {
                required: "Excel file is required",
              })}
            />
            {errorsExcel.excel_file && (
              <p className="text-red-500 text-sm">
                {errorsExcel.excel_file.message}
              </p>
            )}
          </div>

          <div className="relative">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Upload
            </button>
            {loadingExcel && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader message="Uploading..." />
              </div>
            )}
          </div>
        </form>
      )}
    </>
  );
};

export default UploadCompaniesDetails;
