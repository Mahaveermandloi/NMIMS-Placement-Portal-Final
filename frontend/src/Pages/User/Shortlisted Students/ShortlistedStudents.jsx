// import React, { useState, useEffect } from "react";
// import Button from "@mui/material/Button";
// import CustomPaginationActionsTable from "../../../Components/TablePaginationActions.jsx";
// import SearchBar from "./Components/SearchBar.jsx";
// import { getApi } from "../../../Utils/API.js";
// import { useNavigate } from "react-router-dom";
// import { ADMIN_PATH } from "../../../Utils/URLPath.jsx";
// import Loader from "../../../Components/Loader.jsx";

// const ShortlistedStudent = () => {
//   const [jobData, setJobData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchJobData = async () => {
//       try {
//         setLoading(true);
//         const response = await getApi("/api/job/get-all-job-details"); // Update API endpoint for jobs
//         console.log(response.data);
//         setJobData(response.data);
//       } catch (error) {
//         console.error("Error fetching job data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchJobData();
//   }, []);

//   const columns = [
//     { id: "company_id", label: "Company ID", align: "left" },
//     { id: "job_title", label: "Job Title", align: "left" },
//     { id: "job_type", label: "Job Type", align: "left" },
//     { id: "location", label: "Location", align: "left" },
//     { id: "company_name", label: "Company Name", align: "left" },
//     { id: "package", label: "Package", align: "left" },
//     { id: "application_deadline", label: "Deadline", align: "left" },
//     { id: "year", label: "Year", align: "left" },
//   ];

//   const handleInfo = (job) => {
//     navigate(`${ADMIN_PATH}/job-details/${job.company_id}`);
//   };

//   return (
//     <div>
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-3xl font-bold mb-4">Shortlisted Students</h1>
//         </div>
//         <div className="w-[400px]">
//           <SearchBar />
//         </div>
//       </div>
//       <div className="lg:w-full w-[340px] ">
//         {loading ? (
//           <Loader message="Loading job data..." />
//         ) : (
//           <CustomPaginationActionsTable
//             data={jobData.map((job) => ({
//               company_id: job.company_id,
//               job_title: job.job_title,
//               job_type: job.job_type,
//               location: job.location,
//               company_name: job.company_name,
//               package: job.package,
//               application_deadline: job.application_deadline,
//               year: job.year,
//               actions: columns.find((col) => col.id === "actions").render(job),
//             }))}
//             columns={columns}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default ShortlistedStudent;

import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CustomPaginationActionsTable from "../../../Components/TablePaginationActions.jsx";
import SearchBar from "./Components/SearchBar.jsx";
import { getApi } from "../../../Utils/API.js";
import { useNavigate } from "react-router-dom";
import { ADMIN_PATH } from "../../../Utils/URLPath.jsx";
import Loader from "../../../Components/Loader.jsx";

const ShortlistedStudent = () => {
  const [jobData, setJobData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        setLoading(true);
        const response = await getApi("/api/job/get-all-job-details");
        setJobData(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error("Error fetching job data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobData();
  }, []);

  useEffect(() => {
    // Filter data based on selected company and branch
    const filterData = jobData.filter((job) => {
      return (
        (selectedCompany ? job.company_name === selectedCompany : true) &&
        (selectedBranch ? job.branch === selectedBranch : true)
      );
    });
    setFilteredData(filterData);
  }, [selectedCompany, selectedBranch, jobData]);

  const columns = [
    { id: "student_name", label: "Student Name", align: "left" },
    { id: "company_name", label: "Company Name", align: "left" },
    { id: "branch", label: "Branch", align: "left" },
    { id: "job_title", label: "Job Title", align: "left" },
    { id: "year", label: "Year", align: "left" },
  ];

  const handleInfo = (job) => {
    navigate(`${ADMIN_PATH}/job-details/${job.company_id}`);
  };

  const handleCompanyChange = (event) => {
    setSelectedCompany(event.target.value);
  };

  const handleBranchChange = (event) => {
    setSelectedBranch(event.target.value);
  };

  const uniqueCompanies = [...new Set(jobData.map((job) => job.company_name))];
  const branches = ["Computer Science", "Computer Engineering", "IT", "AIML"];

  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-4">Shortlisted Students</h1>
        </div>
        <div className="w-[400px]">
          <SearchBar />
        </div>
      </div>
      <div className="flex gap-4 mb-4">
        <div className="w-[200px]">
          <select
            value={selectedCompany}
            onChange={handleCompanyChange}
            className="w-full border rounded p-2"
          >
            <option value="">Select Company</option>
            {uniqueCompanies.map((company) => (
              <option key={company} value={company}>
                {company}
              </option>
            ))}
          </select>
        </div>
        <div className="w-[200px]">
          <select
            value={selectedBranch}
            onChange={handleBranchChange}
            className="w-full border rounded p-2"
          >
            <option value="">Select Branch</option>
            {branches.map((branch) => (
              <option key={branch} value={branch}>
                {branch}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="lg:w-full w-[340px]">
        {loading ? (
          <Loader message="Loading job data..." />
        ) : (
          <CustomPaginationActionsTable data={filteredData} columns={columns} />
        )}
      </div>
    </div>
  );
};

export default ShortlistedStudent;
