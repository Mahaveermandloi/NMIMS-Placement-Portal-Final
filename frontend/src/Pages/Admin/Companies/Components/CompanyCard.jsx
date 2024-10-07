import React, { useState } from "react";
import { ADMIN_PATH, SERVER_URL } from "../../../../Utils/URLPath";
import { useNavigate } from "react-router-dom";
import { deleteApi } from "../../../../Utils/API.js";
import { toast } from "react-toastify";
import { Toast } from "../../../../Components/Toast.jsx";

const CompanyCard = ({ company }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleDelete = async (id) => {
    let isConfirmed = false;

    const confirmDeletion = () => {
      isConfirmed = true;
      toast.dismiss(confirmationToastId);
    };

    const confirmationToastId = toast.info(
      <div>
        <p>Are you sure you want to delete this company?</p>
        <div className="flex justify-end mt-3">
          <button
            onClick={confirmDeletion}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
          >
            Confirm
          </button>
          <button
            onClick={() => toast.dismiss(confirmationToastId)}
            className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 text-sm ml-2"
          >
            Cancel
          </button>
        </div>
      </div>,
      {
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        position: "top-center",
      }
    );

    while (!isConfirmed) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    if (isConfirmed) {
      setLoading(true);

      try {
        const response = await deleteApi(
          `${SERVER_URL}/api/company/delete-company/${id}`
        );

        if (response.success) {
          toast.success("Company deleted successfully!");
          window.location.reload();
        } else {
          toast.error("Failed to delete company.");
        }
      } catch (error) {
        console.error("Failed to delete company:", error);
        toast.error("An error occurred while deleting the company.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <div className="flex flex-col  items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-md dark:border-gray-700">
        <div className="w-32 h-32 flex items-center  overflow-hidden">
          <img
            className="object-cover w-96 rounded-xl"
            src={`${company.company_logo}`}
            alt="Company Logo"
          />
        </div>

        <div className="flex flex-col justify-between p-4 leading-normal">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900">
            {company.company_name}
          </h5>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-400">
            Year: {company.year}
          </p>

          <div className="flex mt-3 space-x-2">
            {/* <button
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm"
              onClick={() =>
                navigate(`${ADMIN_PATH}/company-detail/${company._id}`)
              }
            >
              Read More
            </button> */}
           
            {/* <button
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
              onClick={() =>
                navigate(`${ADMIN_PATH}/edit-company-details/${company._id}`)
              }
            >
              Edit
            </button> */}
            <button
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
              onClick={() => handleDelete(company._id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyCard;
