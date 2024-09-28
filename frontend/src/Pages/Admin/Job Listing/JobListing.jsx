import React, { useEffect, useState } from "react";
import JobCard from "./Components/JobCard.jsx";
import { ADMIN_PATH, SERVER_URL } from "../../../Utils/URLPath.jsx";
import { useNavigate } from "react-router-dom";
import { getApi } from "../../../Utils/API.js";
import Loader from "../../../Components/Loader.jsx";
import { Toast } from "../../../Components/Toast.jsx";
import { toast } from "react-toastify";
import nodata from "../../../../public/images/no-data.png"; // Import the no-data image

const Companies = () => {
  const [jobListings, setJobListings] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [filteredJobListings, setFilteredJobListings] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch job listings and company data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch job listings
        const jobResponse = await getApi(`${SERVER_URL}/api/joblisting`);
        if (jobResponse.statusCode === 200) {
          setJobListings(jobResponse.data);
          setFilteredJobListings(jobResponse.data);
        } else {
          toast.error("Failed to fetch job listings");
        }

        // Fetch companies
        const companyResponse = await getApi(
          `${SERVER_URL}/api/company/get-all-companies`
        );
        if (companyResponse.statusCode === 200) {
          setCompanies(companyResponse.data);
        } else {
          toast.error("Failed to fetch companies");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter job listings by selected company
  useEffect(() => {
    if (selectedCompany) {
      setFilteredJobListings(
        jobListings.filter((job) => job.company_id === selectedCompany)
      );
    } else {
      setFilteredJobListings(jobListings);
    }
  }, [selectedCompany, jobListings]);

  return (
    <>
      <Toast />
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-3xl font-bold">Job Profiles</h1>
        </div>

        <div>
          <button
            type="button"
            onClick={() =>
              navigate(`${ADMIN_PATH}/upload-job-listings-details`)
            }
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Add Job
          </button>
        </div>
      </div>

      <div className="mb-4">
        <select
          id="company-select"
          value={selectedCompany}
          onChange={(e) => setSelectedCompany(e.target.value)}
          className="mt-1 block lg:w-52 w-full p-2 border border-gray-300 rounded-lg"
        >
          <option value="">All Companies</option>
          {companies.map((company) => (
            <option key={company._id} value={company._id}>
              {company.company_name}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <Loader message="Loading..." />
      ) : filteredJobListings.length === 0 ? (
        <div className="flex justify-center items-center h-96">
          <img
            src={nodata}
            alt="No data found"
            className="w-64 h-64 object-contain"
          />
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredJobListings.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      )}
    </>
  );
};

export default Companies;
