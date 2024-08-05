import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UploadCompaniesDetails = () => {
  const [tab, setTab] = useState("uploadCompany");

  const {
    register: registerCompany,
    handleSubmit: handleSubmitCompany,
    control: controlCompany,
    formState: { errors: errorsCompany },
  } = useForm();

  const {
    register: registerExcel,
    handleSubmit: handleSubmitExcel,
    control: controlExcel,
    formState: { errors: errorsExcel },
  } = useForm();

  const onSubmitCompany = (data) => {
    console.log("Upload Company Data:", data);
    toast.success("Company data uploaded successfully");
  };

  const onSubmitExcel = (data) => {
    console.log("Upload Excel Data:", data);
    toast.success("Excel data uploaded successfully");
  };

  return (
    <>
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
          <div>
            <label
              htmlFor="company_name"
              className="block text-sm font-medium text-gray-700"
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

          <div>
            <label
              htmlFor="selection_rounds"
              className="block text-sm font-medium text-gray-700"
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
              htmlFor="criteria_of_academics"
              className="block text-sm font-medium text-gray-700"
            >
              Criteria of Academics
            </label>
            <input
              type="text"
              id="criteria_of_academics"
              placeholder="Enter Criteria of Academics"
              className={`block w-full p-2 border rounded ${
                errorsCompany.criteria_of_academics ? "border-red-500" : ""
              }`}
              {...registerCompany("criteria_of_academics", {
                required: "Criteria of academics is required",
              })}
            />
            {errorsCompany.criteria_of_academics && (
              <p className="text-red-500 text-sm">
                {errorsCompany.criteria_of_academics.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="eligibility"
              className="block text-sm font-medium text-gray-700"
            >
              Eligibility
            </label>
            <input
              type="text"
              id="eligibility"
              placeholder="Enter Eligibility"
              className={`block w-full p-2 border rounded ${
                errorsCompany.eligibility ? "border-red-500" : ""
              }`}
              {...registerCompany("eligibility", {
                required: "Eligibility is required",
              })}
            />
            {errorsCompany.eligibility && (
              <p className="text-red-500 text-sm">
                {errorsCompany.eligibility.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="designation"
              className="block text-sm font-medium text-gray-700"
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
              htmlFor="package"
              className="block text-sm font-medium text-gray-700"
            >
              Package
            </label>
            <input
              type="number"
              id="package"
              placeholder="Enter Package"
              className={`block w-full p-2 border rounded ${
                errorsCompany.package ? "border-red-500" : ""
              }`}
              {...registerCompany("package", {
                required: "Package is required",
              })}
            />
            {errorsCompany.package && (
              <p className="text-red-500 text-sm">
                {errorsCompany.package.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="year"
              className="block text-sm font-medium text-gray-700"
            >
              Year
            </label>
            <select
              id="year"
              className={`block w-full p-2 border rounded ${
                errorsCompany.year ? "border-red-500" : ""
              }`}
              {...registerCompany("year", { required: "Year is required" })}
            >
              <option value="">Select Year</option>
              <option value={2021}>2021</option>
              <option value={2022}>2022</option>
              <option value={2023}>2023</option>
              <option value={2024}>2024</option>
            </select>
            {errorsCompany.year && (
              <p className="text-red-500 text-sm">
                {errorsCompany.year.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Submit
          </button>
        </form>
      ) : (
        <form onSubmit={handleSubmitExcel(onSubmitExcel)} className="space-y-4">
          <div>
            <label
              htmlFor="year"
              className="block text-sm font-medium text-gray-700"
            >
              Year
            </label>
            <Controller
              name="year"
              control={controlExcel}
              render={({ field }) => (
                <select
                  {...field}
                  id="year"
                  className={`block w-full p-2 border rounded ${
                    errorsExcel.year ? "border-red-500" : ""
                  }`}
                >
                  <option value="">Select Year</option>
                  <option value={2021}>2021</option>
                  <option value={2022}>2022</option>
                  <option value={2023}>2023</option>
                  <option value={2024}>2024</option>
                </select>
              )}
            />
            {errorsExcel.year && (
              <p className="text-red-500 text-sm">{errorsExcel.year.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="campus"
              className="block text-sm font-medium text-gray-700"
            >
              Campus
            </label>
            <Controller
              name="campus"
              control={controlExcel}
              render={({ field }) => (
                <select
                  {...field}
                  id="campus"
                  className={`block w-full p-2 border rounded ${
                    errorsExcel.campus ? "border-red-500" : ""
                  }`}
                >
                  <option value="">Select Campus</option>
                  <option value="Shirpur">Shirpur</option>
                  <option value="Mumbai">Mumbai</option>
                </select>
              )}
            />
            {errorsExcel.campus && (
              <p className="text-red-500 text-sm">
                {errorsExcel.campus.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="programme"
              className="block text-sm font-medium text-gray-700"
            >
              Programme
            </label>
            <Controller
              name="programme"
              control={controlExcel}
              render={({ field }) => (
                <select
                  {...field}
                  id="programme"
                  className={`block w-full p-2 border rounded ${
                    errorsExcel.programme ? "border-red-500" : ""
                  }`}
                >
                  <option value="">Select Programme</option>
                  <option value="BTech">BTech</option>
                  <option value="MCA">MCA</option>
                </select>
              )}
            />
            {errorsExcel.programme && (
              <p className="text-red-500 text-sm">
                {errorsExcel.programme.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="file"
              className="block text-sm font-medium text-gray-700"
            >
              Upload Excel File
            </label>
            <input
              type="file"
              id="file"
              className={`block w-full p-2 border rounded ${
                errorsExcel.file ? "border-red-500" : ""
              }`}
              {...registerExcel("file", { required: "Excel file is required" })}
            />
            {errorsExcel.file && (
              <p className="text-red-500 text-sm">{errorsExcel.file.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Submit
          </button>
        </form>
      )}
    </>
  );
};

export default UploadCompaniesDetails;
