import React, { useEffect, useState } from "react";
import CompanyCard from "../Companies/Components/CompanyCard.jsx";
import { ADMIN_PATH, SERVER_URL } from "../../../Utils/URLPath.jsx";
import { useNavigate } from "react-router-dom";
import { getApi } from "../../../Utils/API.js";
import Loader from "../../../Components/Loader.jsx";
import nodata from "../../../../public/images/no-data.png";
import { Toast } from "../../../Components/Toast.jsx";
const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState(""); // State for selected year
  const navigate = useNavigate();

  // Calculate the years to be shown in the dropdown
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 9 }, (_, i) => currentYear - i);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const data = await getApi(
          `${SERVER_URL}/api/company/get-all-companies`
        );
        setCompanies(data.data);
      } catch (error) {
        console.error("Failed to fetch companies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  // Filter companies based on the selected year
  const filteredCompanies = companies.filter((company) =>
    selectedYear ? company.year === parseInt(selectedYear) : true
  );

  return (
    <>
      {loading ? (
        <Loader message="Loading..." />
      ) : (
        <>
          <Toast />
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold">Companies</h1>
            <button
              type="button"
              onClick={() => navigate(`${ADMIN_PATH}/upload-companies-details`)}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Add Company
            </button>
          </div>

          <div className="mb-4">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="border rounded px-4 py-2"
            >
              <option value="">Select Year</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          {filteredCompanies.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredCompanies.map((company) => (
                <CompanyCard key={company._id} company={company} />
              ))}
            </div>
          ) : (
            <div className="flex justify-center text-gray-500 mt-4">
              <img src={nodata} alt="" className="mt-10 h-52 lg:h-96" />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Companies;
