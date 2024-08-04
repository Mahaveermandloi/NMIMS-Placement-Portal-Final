import React, { useState } from "react";

const UploadStudentData = () => {
  // State to manage dropdown selections
  const [programme, setProgramme] = useState("");
  const [branch, setBranch] = useState("");
  const [year, setYear] = useState("");
  const [campus, setCampus] = useState("");
  const [file, setFile] = useState(null);
  const [isFileSelected, setIsFileSelected] = useState(false);

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
      alert("Please upload a valid Excel file.");
      setIsFileSelected(false);
    }
  };

  // Handle submit
  const handleSubmit = () => {
    if (file && programme && branch && year && campus) {
      // Implement your form submission logic here
      alert("Form submitted successfully!");
    } else {
      alert("Please complete all fields and select a file.");
    }
  };

  return (
    <>
      <div className="">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">Upload Student Data</h1>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() =>
              alert("Download functionality is not implemented yet.")
            }
          >
            Download Excel Template
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          {/* Dropdowns */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Programme:
            </label>
            <select
              value={programme}
              onChange={(e) => setProgramme(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Select Programme</option>
              <option value="B.Tech">B.Tech</option>
              <option value="MCA">MCA</option>
              <option value="BTI">BTI</option>
              <option value="MBATech">MBATech</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Branch:
            </label>
            <select
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Select Branch</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Computer Engineering">Computer Engineering</option>
              <option value="Information Technology">
                Information Technology
              </option>
              <option value="Artificial Intelligence">
                Artificial Intelligence
              </option>
              <option value="Data Science">Data Science</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Year:
            </label>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Select Year</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Campus:
            </label>
            <select
              value={campus}
              onChange={(e) => setCampus(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Select Campus</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Shirpur">Shirpur</option>
              <option value="Chandigarh">Chandigarh</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Bhubaneswar">Bhubaneswar</option>
              <option value="Bangalore">Bangalore</option>
            </select>
          </div>
        </div>

        {/* File Upload */}
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

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={!isFileSelected}
          className={`mt-4 bg-green-500 text-white px-4 py-2 rounded ${
            !isFileSelected ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default UploadStudentData;
