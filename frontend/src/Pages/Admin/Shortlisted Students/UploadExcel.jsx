import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SERVER_URL } from "../../../Utils/URLPath";
import { getApi, postApi } from "../../../Utils/API";
import Loader from "../../../Components/Loader";
import { useNavigate } from "react-router-dom";
import { Toast } from "../../../Components/Toast";

const UploadExcel = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false); // State to control the loader
  const navigate = useNavigate();

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [loadingFiles, setLoadingFiles] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  useEffect(() => {
    // Fetch companies

    const fetchCompanies = async () => {
      setLoading(true);

      try {
        const response = await getApi(
          `${SERVER_URL}/api/company/get-all-companies`
        );
        if (response.statusCode === 200) {
          setCompanies(response.data);
        } else {
          toast.error("Failed to fetch companies");
        }
      } catch (error) {
        toast.error("Error fetching companies");
      } finally {
        setLoading(false);
      }
    };

    const fetchExcels = async () => {
      setLoading(true);

      try {
        const response = await getApi(
          `${SERVER_URL}/api/get-all-shortlisted-excels`
        );
        if (response.statusCode === 200) {
          setUploadedFiles(response.data);
        } else {
          toast.error("Failed to fetch companies");
        }
      } catch (error) {
        toast.error("Error fetching companies");
      } finally {
        setLoading(false);
      }
    };

    fetchExcels();

    fetchCompanies();
  }, []);

  const onSubmit = async (data) => {
    if (!data.company_name) {
      toast.error("Please select a company");
      return;
    }

    // Check if file is selected
    const file = watch("excel_file")[0];
    if (!file) {
      toast.error("Please upload a file");
      return;
    }

    setLoading(true);

    try {
      const response = await postApi(
        data,
        `${SERVER_URL}/api/upload-excel-shortlistedstudents`
      );

      if (response.statusCode === 200) {
        toast.success("File uploaded successfully");
        setTimeout(() => {
          navigate(`${ADMIN_PATH}/shortlisted-students`); // Adjust the navigation path as needed
        }, 2000);
      } else {
        toast.error("Failed to upload file");
      }
    } catch (error) {
      toast.error("Error uploading file");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toast />

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Upload Student Data</h1>
        <a href="../../../../public/ShortlistedStudents.xlsx" download>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Download Excel Template
          </button>
        </a>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="company_name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Company Name
            </label>
            <select
              id="company_name"
              className={`block w-full p-3 border rounded-md ${
                errors.company_name ? "border-red-500" : "border-gray-300"
              }`}
              {...register("company_name", {
                required: "Company name is required",
              })}
            >
              <option value="">Select Company</option>
              {companies.map(({ _id, company_name }) => (
                <option key={_id} value={company_name}>
                  {company_name}
                </option>
              ))}
            </select>
            {errors.company_name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.company_name.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Date
            </label>
            <input
              type="text"
              id="date"
              className={`block w-full p-3 border rounded-md ${
                errors.date ? "border-red-500" : "border-gray-300"
              }`}
              value={new Date().toISOString().split("T")[0]}
              readOnly
              {...register("date")}
            />
          </div>

          <div>
            <label
              htmlFor="excel_file"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Upload Excel File
            </label>
            <input
              type="file"
              id="excel_file"
              className={`block w-full p-3 border rounded-md ${
                errors.excel_file ? "border-red-500" : "border-gray-300"
              }`}
              {...register("excel_file", { required: "File is required" })}
              accept=".xlsx, .xls"
            />
            {errors.excel_file && (
              <p className="text-red-500 text-sm mt-1">
                {errors.excel_file.message}
              </p>
            )}
          </div>
        </div>

        {!loading ? (
          <button
            type="submit"
            className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition"
          >
            Submit
          </button>
        ) : (
          <Loader />
        )}
      </form>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Uploaded Files</h2>
        {loadingFiles ? (
          <Loader />
        ) : uploadedFiles.length > 0 ? (
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="py-2 px-4 border">Date</th>
                <th className="py-2 px-4 border">File Name</th>
                <th className="py-2 px-4 border">Download</th>
              </tr>
            </thead>
            <tbody>
              {uploadedFiles.map((file) => (
                <tr key={file._id}>
                  <td className="py-2 px-4 border">
                    {new Date(file.date).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border">
                    {file.filePath.split("/").pop()}
                  </td>
                  <td className="py-2 px-4 border">
                    <button
                      onClick={() => handleDownload(file.filePath)}
                      className="bg-blue-500 text-white px-4 py-1 rounded"
                    >
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No files uploaded yet.</p>
        )}
      </div>
    </>
  );
};
export default UploadExcel;
