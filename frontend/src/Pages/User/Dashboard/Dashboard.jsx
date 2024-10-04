import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";
import "tailwindcss/tailwind.css";
import { getApi } from "../../../Utils/API";

import totalstudent from "../../../../public/images/students.png";
import student from "../../../../public/images/student.png";
import placed from "../../../../public/images/placed.png";
import unplaced from "../../../../public/images/unplaced.png";
import highest from "../../../../public/images/highest.png";
import lowest from "../../../../public/images/lowest.png";
import median from "../../../../public/images/median.png";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const Dashboard = () => {
  const [placementStats, setPlacementStats] = useState({});
  const [chartData, setChartData] = useState(null);
  const [placedUnplacedData, setPlacedUnplacedData] = useState(null);
  const [packageStats, setPackageStats] = useState({});

  useEffect(() => {
    // Function to fetch dashboard data
    const fetchDashboardData = async () => {
      try {
        const response = await getApi("/api/dashboard");

        // Check for a successful response (status code 200 or response.ok)
        if (response && response.statusCode === 200) {
          const data = response.data;

          // Set placement stats data
          setPlacementStats({
            totalPlaced: data?.totalPlaced ?? 0,
            totalUnplaced: data?.totalUnplaced ?? 0,
            totalStudents: data?.totalStudents ?? 0,
          });

          // Set package stats for the highest, median, lowest section
          const statsByYear = data?.statsByYear?.["2024"] ?? {};
          setPackageStats({
            highest: statsByYear.highest ?? 0,
            median: statsByYear.median ?? 0,
            lowest: statsByYear.lowest ?? 0,
          });

          // Prepare data for Specialization Pie chart if there is valid data
          const statsBySpecialization = data?.statsBySpecialization ?? {};
          if (Object.keys(statsBySpecialization).length > 0) {
            const pieData = {
              labels: Object.keys(statsBySpecialization),
              datasets: [
                {
                  data: Object.values(statsBySpecialization).map(
                    (specialization) => specialization.numberOfStudents
                  ),
                  backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
                  borderColor: "#fff",
                  borderWidth: 1,
                },
              ],
            };
            setChartData(pieData); // Set pie chart data for specializations
          } else {
            console.warn("No specialization data available");
          }

          // Prepare data for Placed and Unplaced Pie chart
          const placedUnplacedPieData = {
            labels: ["Placed", "Unplaced"],
            datasets: [
              {
                data: [data.totalPlaced, data.totalUnplaced],
                backgroundColor: ["#36A2EB", "#FF6384"],
                borderColor: "#fff",
                borderWidth: 1,
              },
            ],
          };
          setPlacedUnplacedData(placedUnplacedPieData); // Set pie chart data for placed/unplaced
        } else {
          console.error(
            "Failed to fetch dashboard data, status code:",
            response?.statusCode
          );
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  // Options for Pie Chart
  const pieOptions = {
    plugins: {
      legend: {
        display: true,
        position: "right",
        labels: {
          color: "#333",
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}`, // Customize the tooltip content
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="mx-auto lg:p-4 ">
      {/* Statistics Section */}
      <div className="grid grid-cols-1 lg:w-full w-80 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {placementStats.totalPlaced !== undefined && (
          <>
            <div className="flex justify-between items-center bg-white rounded-lg shadow-lg p-4">
              <div className="">
                <h5 className="text-lg font-semibold">Total Students</h5>
                <p className="text-md flex font-normal text-gray-500">
                  {placementStats.totalStudents}
                </p>
              </div>
              <img src={student} alt="" className="h-14 w-14" />
            </div>

            <div className="bg-white flex justify-between items-center rounded-lg shadow-lg p-4">
              <div>
                <h5 className="text-lg font-semibold">Total Placed</h5>
                <p className="text-md font-normal text-gray-500">
                  {placementStats.totalPlaced}
                </p>
              </div>
              <img src={placed} alt="" className="h-14 w-14" />
            </div>

            <div className="bg-white rounded-lg flex justify-between items-center shadow-lg p-4">
              <div>
                <h5 className="text-lg font-semibold">Total Unplaced</h5>
                <p className="text-md font-normal text-gray-500">
                  {placementStats.totalUnplaced}
                </p>
              </div>
              <img src={unplaced} alt="" className="h-14 w-14" />
            </div>
          </>
        )}
      </div>

      {/* Package Statistics Section */}
      <div className="grid grid-cols-1 lg:w-full w-80  md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white flex justify-between items-center rounded-lg shadow-lg p-4">
          <div>
            <h5 className="text-lg font-semibold">Highest Package</h5>
            <p className="text-md font-normal text-gray-500">
              {packageStats.highest} LPA
            </p>
          </div>

          <img src={highest} alt="" className="h-14 w-14" />
        </div>

        <div className="bg-white flex justify-between items-center rounded-lg shadow-lg p-4">
          <div>
            <h5 className="text-lg font-semibold">Median Package</h5>
            <p className="text-md font-normal text-gray-500">
              {packageStats.median} LPA
            </p>
          </div>

          <img src={median} alt="" className="h-14 w-14" />
        </div>

        <div className="bg-white  flex justify-between items-center rounded-lg shadow-lg p-4">
          <div>
            <h5 className="text-lg font-semibold">Lowest Package</h5>
            <p className="text-md font-normal text-gray-500">
              {packageStats.lowest} LPA
            </p>
          </div>
          <img src={lowest} alt="" className="h-14 w-14" />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        <div className="bg-white lg:w-1/2 rounded-lg shadow-sm p-3 border border-black">
          <h5 className="text-xl font-semibold mb-4">
            Placement Statistics by Specialization
          </h5>
          <div className="w-full h-80">
            {/* Render Pie chart only if chartData is available */}
            {chartData ? (
              <Pie data={chartData} options={pieOptions} />
            ) : (
              <p>No data available</p>
            )}
          </div>
        </div>
        <div className="bg-white lg:w-1/2 rounded-lg shadow-sm p-3 border border-black">
          <h5 className="text-xl font-semibold mb-4">
            Placed and Unplaced Students
          </h5>
          <div className="w-full h-80">
            {/* Render Pie chart for placed/unplaced */}
            {placedUnplacedData ? (
              <>
                <Pie data={placedUnplacedData} options={pieOptions} />
              </>
            ) : (
              <p>No data available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
