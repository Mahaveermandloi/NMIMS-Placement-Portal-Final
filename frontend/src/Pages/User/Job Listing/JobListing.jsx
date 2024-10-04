import React, { useEffect, useState } from "react";
import JobCard from "../../User/Job Listing/Components/JobCard.jsx";
import { ADMIN_PATH, SERVER_URL } from "../../../Utils/URLPath.jsx";
import { useNavigate } from "react-router-dom";
import { getApi } from "../../../Utils/API.js";
import Loader from "../../../Components/Loader.jsx";
import { Toast } from "../../../Components/Toast.jsx";
import { toast } from "react-toastify";
import nodata from "../../../../public/images/no-data.png"; // Import the no-data image

const JobListing = () => {
  const [jobListings, setJobListings] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [filteredJobListings, setFilteredJobListings] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Get the last 4 years
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 4 }, (_, i) => currentYear - i);

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
        toast.error("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter job listings by selected company and year
  useEffect(() => {
    let filtered = jobListings;

    if (selectedCompany) {
      filtered = filtered.filter((job) => job.company_id === selectedCompany);
    }

    if (selectedYear) {
      filtered = filtered.filter(
        (job) => job.year === parseInt(selectedYear, 10)
      );
    }

    setFilteredJobListings(filtered);
  }, [selectedCompany, selectedYear, jobListings]);

  return (
    <>
      <Toast />
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-3xl font-bold">Job Listings</h1>
        </div>
      </div>

      <div className="mb-4 flex gap-4">
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

        <select
          id="year-select"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="mt-1 block lg:w-52 w-full p-2 border border-gray-300 rounded-lg"
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

export default JobListing;
