// import React from "react";
// import CompanyCard from "../Companies/Components/CompanyCard.jsx";
// import { ADMIN_PATH } from "../../../Utils/URLPath.jsx";
// import { getApi } from "../../../Utils/API.js";
// import { useNavigate } from "react-router-dom";

// const Companies = () => {
//   const navigate = useNavigate();

//   const companies = [
//     {
//       id: 1,
//       name: "Google",
//       package: 20,
//       year: 2025,
//       designation: "Associate Software Developer",
//       rounds: 4,
//       logo: "https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png",
//     },
//     {
//       id: 2,
//       name: "Microsoft",
//       package: 18,
//       year: 2024,
//       designation: "Software Engineer",
//       rounds: 3,
//       logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAclBMVEXz8/PzUyWBvAYFpvD/ugjz9fb19Pbz+fr39fr69vPy9frzRQB5uAAAofD/tgDz2tTh6tHzTBfzmYWw0Xx8xfH70H3R5vP16dHz4+Dn7d3zPQDzk36sz3Td6/N0wvH7znX07d4AnvDzvLHK3qur1vL43qu/SIryAAABeUlEQVR4nO3cSW7CUBBFUdKY3pi+NTaQZP9bzCQ2kfhSRmUyOHcDpaOav15PkiT9KguvPdUPLyksots3xP5hHl3qg8VxEtvxNPi5NSyn0c0fv5gVk5fYFstWuHoNjpCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkLBb4XER2+QuLKfPEO5Py+BuzQbt8KNcxVYeEju72SC6+47wMLz0kLAkSX82Cq89NQ4vSwDP1Tq26rMhjr/qTWz1JUHcXvPgqlZYz6LbpYT5W2z5uhVuZu+xERISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEnYrjN4vvT57vzTbRnduT1120Y0egZ2WhfdkoCRJ/6xv7S5GMPm5T6AAAAAASUVORK5CYII=",
//     },
//     {
//       id: 3,
//       name: "Amazon",
//       package: 22,
//       year: 2025,
//       designation: "Frontend Developer",
//       rounds: 5,
//       logo: "https://cdn0.iconfinder.com/data/icons/most-usable-logos/120/Amazon-512.png",
//     },
//     {
//       id: 4,
//       name: "Facebook",
//       package: 25,
//       year: 2023,
//       designation: "Backend Engineer",
//       rounds: 4,
//       logo: "https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png",
//     },
//     {
//       id: 5,
//       name: "Apple",
//       package: 30,
//       year: 2024,
//       designation: "Data Scientist",
//       rounds: 3,
//       logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
//     },
//   ];

//   return (
//     <>
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-3xl font-bold">Companies</h1>
//       </div>

//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//         {companies.map((company) => (
//           <CompanyCard key={company.id} company={company} />
//         ))}
//       </div>
//     </>
//   );
// };

// export default Companies;
import React, { useState, useEffect } from "react";
import CompanyCard from "../Companies/Components/CompanyCard.jsx";
import { getApi } from "../../../Utils/API.js";
import { useNavigate } from "react-router-dom";
import nodata from "../../../../public/images/no-data.png";
import Loader from "../../../Components/Loader.jsx";

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track errors

  const navigate = useNavigate();

  // Fetch companies data from API
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoading(true); // Set loading to true when starting to fetch data
        const data = await getApi("/api/company/get-all-companies"); // Adjust route if needed
        setCompanies(data.data);
        setFilteredCompanies(data.data);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Failed to fetch companies:", error);
        setError("Failed to fetch companies. Please try again later.");
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  // Update filteredCompanies when selectedYear changes
  useEffect(() => {
    if (companies.length > 0) {
      const filtered = companies.filter(
        (company) => company.year === selectedYear
      );
      setFilteredCompanies(filtered);
    }
  }, [selectedYear, companies]);

  // Handle year filter change
  const handleYearChange = (event) => {
    setSelectedYear(parseInt(event.target.value, 10));
  };

  // Generate years for dropdown
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 4 }, (_, i) => currentYear - i);

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Companies</h1>
        <div>
          <select
            value={selectedYear}
            onChange={handleYearChange}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="">Filter By Year</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center">
          <Loader /> {/* Ensure you have a Loader component */}
        </div>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : filteredCompanies.length === 0 ? (
        <div className="flex justify-center items-center">
          <img src={nodata} alt="No Data Available" className="w-48 h-48" />
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredCompanies.map((company) => (
            <CompanyCard
              key={company._id}
              company={{
                name: company.company_name, // Adjust field names according to your API response
                logo: company.company_logo,
                year: company.year,
              }}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Companies;
