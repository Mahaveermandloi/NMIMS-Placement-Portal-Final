import React, { useState, useEffect } from "react";
import { postApi, getApi } from "../../../Utils/API";
import Loader from "../../../Components/Loader";
import { toast } from "react-toastify";
import { SERVER_URL } from "../../../Utils/URLPath";

const UploadStudentData = () => {
  const [file, setFile] = useState(null);
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [todayDate, setTodayDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [loadingFiles, setLoadingFiles] = useState(false);

  // Get today's date on component mount
  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
    setTodayDate(currentDate);
    fetchUploadedFiles();
  }, []);

  // Fetch uploaded files from the server
  const fetchUploadedFiles = async () => {
    setLoadingFiles(true);
    try {
      const response = await getApi("/api/student/get-all-excel");
      console.log(response);
      if (response.statusCode === 200) {
        setUploadedFiles(response.data);
      } else {
        toast.error("Failed to fetch uploaded files.");
      }
    } catch (error) {
      toast.error("An error occurred while fetching the uploaded files.");
    } finally {
      setLoadingFiles(false);
    }
  };

  // Handle file change
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (
      selectedFile &&
      selectedFile.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      setFile(selectedFile);
      setIsFileSelected(true);
    } else {
      toast.error("Please upload a valid Excel file.");
      setIsFileSelected(false);
    }
  };

  // Handle submit
  const handleSubmit = async () => {
    if (file && isFileSelected) {
      setLoading(true);

      const payload = {
        student_excel_file: file,
        date: todayDate,
      };

      console.log(payload);

      try {
        const response = await postApi(
          payload,
          "/api/student/upload-student-file"
        );

        if (response.statusCode === 200) {
          toast.success("Student data uploaded successfully!");
        } else {
          toast.error("Failed to upload student data.");
        }
      } catch (error) {
        toast.error("An error occurred while uploading the file.");
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Please select a file to upload.");
    }
  };

  // Handle file download
  const handleDownload = (filePath) => {
    const link = document.createElement("a");
    link.href = `${SERVER_URL}${filePath}`; // Assuming files are served from this path
    link.download = filePath.split("/").pop(); // Extract the file name from the path
    link.click();
  };

  return (
    <>
      <div className="">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">Upload Student Data</h1>
          <a
            href="../../../../public/TemplateFile.xlsx" // File located in public folder
            download // This attribute triggers the download
          >
            <button className="bg-blue-500 text-white px-4 py-2 rounded">
              Download Excel Template
            </button>
          </a>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Upload File:
          </label>
          <input
            type="file"
            accept=".xlsx"
            onChange={handleFileChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Date (Today's Date):
          </label>
          <input
            type="date"
            value={todayDate}
            disabled
            className="mt-1 block w-full p-2 border border-gray-300 rounded bg-gray-100 cursor-not-allowed"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={!isFileSelected || loading}
          className={`mt-4 bg-green-500 text-white px-4 py-2 rounded ${
            !isFileSelected || loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? <Loader /> : "Submit"}
        </button>

        {/* Display uploaded files */}
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
      </div>
    </>
  );
};

export default UploadStudentData;
