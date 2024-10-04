import React, { useState, useEffect } from "react";
import Loader from "../../../../Components/Loader.jsx";
import { Toast } from "../../../../Components/Toast.jsx";
import { useParams } from "react-router-dom";
import { getApi } from "../../../../Utils/API.js";
import { SERVER_URL } from "../../../../Utils/URLPath.jsx";

const JobDetailsPage = () => {
  const [loading, setLoading] = useState(true);
  const [jobData, setJobData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        setLoading(true);
        const response = await getApi(`/api/joblisting/${id}`);
        if (response.success) {
          setJobData(response.data);
        } else {
          console.error("Failed to fetch job details");
        }
      } catch (error) {
        console.error("Error fetching job details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id]);

  if (loading) {
    return <Loader message="Loading..." />;
  }

  if (!jobData) {
    return <Toast message="No job data available" />;
  }

  return (
    <>
      <Toast />
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Job Detail</h1>
      </div>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="">
            <th className="py-2 px-4 border-b text-left text-lg">Field</th>
            <th className="py-2 px-4 border-b text-left text-lg">Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-2 px-4 border-b font-medium text-gray-700">Job Title</td>
            <td className="py-2 px-4 border-b">{jobData.job_title}</td>
          </tr>

          <tr>
            <td className="py-2 px-4 border-b font-medium text-gray-700">Company Name</td>
            <td className="py-2 px-4 border-b">{jobData.company_name}</td>
          </tr>

          <tr>
            <td className="py-2 px-4 border-b font-medium text-gray-700">Company Name</td>
            <td className="py-2 px-4 border-b">
              <img
                src={`${SERVER_URL}${jobData.company_logo}`}
                alt=""
                className="w-32"
              />
            </td>
          </tr>

          <tr>
            <td className="py-2 px-4 border-b font-medium text-gray-700">
              Job Description
            </td>
            <td className="py-2 px-4 border-b">{jobData.job_description}</td>
          </tr>

          <tr>
            <td className="py-2 px-4 border-b font-medium text-gray-700">Job Type</td>
            <td className="py-2 px-4 border-b">{jobData.job_type}</td>
          </tr>

          <tr>
            <td className="py-2 px-4 border-b font-medium text-gray-700">Location</td>
            <td className="py-2 px-4 border-b">{jobData.location}</td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b font-medium text-gray-700">CTC</td>
            <td className="py-2 px-4 border-b">{jobData.ctc} LPA</td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b font-medium text-gray-700">
              Application Deadline
            </td>
            <td className="py-2 px-4 border-b">
              {new Date(jobData.application_deadline).toLocaleDateString()}
            </td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b font-medium text-gray-700">Year</td>
            <td className="py-2 px-4 border-b">{jobData.year}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default JobDetailsPage;
