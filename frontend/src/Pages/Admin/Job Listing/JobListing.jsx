import React from "react";
import CompanyCard from "../Companies/Components/CompanyCard.jsx";
import { ADMIN_PATH } from "../../../Utils/URLPath.jsx";
import { useNavigate } from "react-router-dom";
import JobCard from "./Components/JobCard.jsx";

const Companies = () => {
  const navigate = useNavigate();

  const companies = [
    {
      id: 1,
      name: "Google",
      package: 20,
      year: 2025,
      designation: "Associate Software Developer",
      rounds: 4,
      logo: "https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png",
    },
    {
      id: 2,
      name: "Microsoft",
      package: 18,
      year: 2024,
      designation: "Software Engineer",
      rounds: 3,
      logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAclBMVEXz8/PzUyWBvAYFpvD/ugjz9fb19Pbz+fr39fr69vPy9frzRQB5uAAAofD/tgDz2tTh6tHzTBfzmYWw0Xx8xfH70H3R5vP16dHz4+Dn7d3zPQDzk36sz3Td6/N0wvH7znX07d4AnvDzvLHK3qur1vL43qu/SIryAAABeUlEQVR4nO3cSW7CUBBFUdKY3pi+NTaQZP9bzCQ2kfhSRmUyOHcDpaOav15PkiT9KguvPdUPLyksots3xP5hHl3qg8VxEtvxNPi5NSyn0c0fv5gVk5fYFstWuHoNjpCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkLBb4XER2+QuLKfPEO5Py+BuzQbt8KNcxVYeEju72SC6+47wMLz0kLAkSX82Cq89NQ4vSwDP1Tq26rMhjr/qTWz1JUHcXvPgqlZYz6LbpYT5W2z5uhVuZu+xERISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEnYrjN4vvT57vzTbRnduT1120Y0egZ2WhfdkoCRJ/6xv7S5GMPm5T6AAAAAASUVORK5CYII=",
    },
    {
      id: 3,
      name: "Amazon",
      package: 22,
      year: 2025,
      designation: "Frontend Developer",
      rounds: 5,
      logo: "https://cdn0.iconfinder.com/data/icons/most-usable-logos/120/Amazon-512.png",
    },
    {
      id: 4,
      name: "Facebook",
      package: 25,
      year: 2023,
      designation: "Backend Engineer",
      rounds: 4,
      logo: "https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png",
    },
    {
      id: 5,
      name: "Apple",
      package: 30,
      year: 2024,
      designation: "Data Scientist",
      rounds: 3,
      logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    },
  ];

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Job Listing </h1>
        <button
          type="button"
          onClick={() => navigate(`${ADMIN_PATH}/upload-job-listings-details`)}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Add Job
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {companies.map((company) => (
          <JobCard key={company.id} company={company} />
        ))}
      </div>
    </>
  );
};

export default Companies;
