import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getApi } from "../../../Utils/API.js";
import Loader from "../../../Components/Loader.jsx";
import { ADMIN_PATH, SERVER_URL } from "../../../Utils/URLPath.jsx";
import { FiEdit } from "react-icons/fi";

const CompaniesDetail = () => {
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await getApi(
          `${SERVER_URL}/api/company/get-company-by-id/${id}`
        );
      
        setCompany(response.data);
      } catch (error) {
        console.error("Failed to fetch company:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, [id]);

  if (loading) {
    return <Loader message="Loading..." />;
  }

  return (
    <>
      <div className="flex justify-between items-center mb-4 ">
        <div>
          <h1 className="text-3xl font-bold">Company Details</h1>
        </div>

        <div>
          <button
            type="button"
            onClick={() =>
              navigate(`${ADMIN_PATH}/edit-company-details/${company._id}`)
            }
            className="flex  items-center gap-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 font-medium rounded-lg text-md px-5 py-2.5  dark:bg-blue-600 dark:hover:bg-blue-700  "
          >
            <FiEdit size={15} />
            Edit Company Details
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-400">
          <tbody>
            {company && (
              <>
                <tr className="border-b">
                  <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-900">
                    Company Logo
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap  text-gray-700">
                    <img
                      src={`${SERVER_URL}${company.company_logo}`}
                      alt={company.company_name}
                      className="h-28"
                    />
                  </td>
                </tr>

                <tr className="border-b">
                  <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-900">
                    Company Name
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap  font-bold text-gray-700">
                    {company.company_name}
                  </td>
                </tr>

                <tr className="border-b">
                  <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-900">
                    Academic Criteria
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                    {company.academic_criteria}
                  </td>
                </tr>

                <tr className="border-b">
                  <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-900">
                    CTC
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                    {company.ctc}
                  </td>
                </tr>
              
                <tr className="border-b">
                  <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-900">
                    Designation
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                    {company.designation}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-900">
                    Details of CTC
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                    {company.details_of_ctc}
                  </td>
                </tr>


                <tr className="border-b">
                  <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-900">
                    Eligible Branches and Programs
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                    {company.eligible_branches_and_programs}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-900">
                    Selection Rounds
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                    {company.selection_rounds}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-900">
                    Company Files
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                    {company.company_files.map((file, index) => (
                      <a
                        key={index}
                        href={`${SERVER_URL}${file}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                        alt="No File Provided"
                      >
                        View File {index + 1}
                      </a>
                    ))}
                  </td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CompaniesDetail;
