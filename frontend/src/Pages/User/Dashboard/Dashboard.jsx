import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";
import "tailwindcss/tailwind.css";

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement);

const Dashboard = () => {
  // Pie chart data
  const pieData = {
    labels: [
      "Computer Science",
      "Computer Engineering",
      "Information Technology",
      "AI & ML",
    ],
    datasets: [
      {
        data: [60, 30, 40, 10], // Replace with your data
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  };

  // Options for Pie Chart
  const pieOptions = {
    plugins: {
      legend: {
        display: true,
        position: "right", // Change this to 'right' to place the labels horizontally
        labels: {
          color: "#333", // Customize the label color
          font: {
            size: 14, // Customize the font size of the labels
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            return `${tooltipItem.label}: ${tooltipItem.raw}%`; // Customize the tooltip content
          },
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false, // Allow the chart to scale responsively
  };

  // Placement statistics
  const placementStats = {
    highest: "₹45 LPA",
    median: "₹30 LPA",
    minimum: "₹12 LPA",
    average: "₹25 LPA",
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Statistics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {Object.entries(placementStats).map(([key, value]) => (
          <div key={key} className="bg-white rounded-lg shadow-lg p-4 ">
            <h5 className="text-lg font-semibold   capitalize">
              {key.replace(/_/g, " ")}
            </h5>
            <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
              {value}
            </p>
          </div>
        ))}
      </div>

      {/* Pie Chart */}
      <div className="bg-white rounded-lg shadow-sm p-3  border border-black">
        <h5 className="text-xl font-semibold   mb-4">
          Placement Statistics by Branch
        </h5>
        <div className="w-full h-80">
          <Pie data={pieData} options={pieOptions} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
