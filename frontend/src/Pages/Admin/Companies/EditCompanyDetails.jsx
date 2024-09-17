import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getApi, putApi } from "../../../Utils/API.js";
import { ADMIN_PATH, SERVER_URL } from "../../../Utils/URLPath.jsx";
import thumbnail from "../../../../public/images/pdf.png";
import { useNavigate, useParams } from "react-router-dom";
import { Toast } from "../../../Components/Toast.jsx";

const EditCompaniesDetails = () => {
  const [tab, setTab] = useState("uploadCompany");
  const [logoPreview, setLogoPreview] = useState(null);
  const [filePreview, setFilePreview] = useState(null);

  const navigate = useNavigate();
  const {
    register: registerCompany,
    handleSubmit: handleSubmitCompany,
    reset: resetCompany,
    formState: { errors: errorsCompany },
  } = useForm();

  const { id } = useParams();

  useEffect(() => {
    // Fetch the company data using the API
    const fetchCompanyData = async () => {
      try {
        const companyId = id; // The company ID to fetch
        const route = `/api/company/get-company-by-id/${companyId}`;
        const response = await getApi(route);

        if (response && response.success) {
          const { data } = response;

          // Set the form values using the response data
          resetCompany({
            company_name: data.company_name,
            selection_rounds: data.selection_rounds,
            eligible_branches_and_programs: data.eligible_branches_and_programs,
            academic_criteria: data.academic_criteria,
            designation: data.designation,
            package: data.details_of_ctc,
            year: data.year,
            // Set previews for logo and files
            company_logo: data.company_logo,
            company_files: data.company_files,
          });

          // Set logo and file previews if data contains valid URLs
          if (data.company_logo) {
            setLogoPreview(data.company_logo);
          }
          if (data.company_files) {
            setFilePreview(data.company_files);
          }
        }
      } catch (error) {
        console.error("Error fetching company data:", error);
      }
    };

    fetchCompanyData();
  }, [resetCompany]); // Add resetCompany as a dependency to ensure it's up to date

  const onSubmitCompany = async (data) => {
    try {
      const companyId = id; // The company ID to update
      const route = `/api/company/update-company/${companyId}`;

      // Prepare the payload
      const payload = {
        company_name: data.company_name,
        year: data.year,
        company_logo: logoPreview,
      };

      // Send the data to the API
      const response = await putApi(payload, route);

      if (response.statusCode === 200) {
        toast.success("Company data updated successfully");
        setTimeout(() => {
          navigate(`${ADMIN_PATH}/companies`);
        }, 1500);
      } else {
        toast.error("Failed to update company data");
      }
    } catch (error) {
      console.error("Error updating company data:", error);
      toast.error("An error occurred while updating company data");
    }
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setLogoPreview(null);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setFilePreview(null);
    }
  };

  return (
    <>
      <Toast />
      <div className="flex mb-6">
        <div>
          <h1 className="text-3xl font-bold">Edit Company Details</h1>
        </div>
      </div>

      <form
        onSubmit={handleSubmitCompany(onSubmitCompany)}
        className="space-y-4"
      >
        <div>
          <label
            htmlFor="company_name"
            className="block text-sm font-bold text-gray-700"
          >
            Company Name
          </label>
          <input
            type="text"
            id="company_name"
            placeholder="Enter Company Name"
            className={`block w-full p-2 border rounded ${
              errorsCompany.company_name ? "border-red-500" : ""
            }`}
            {...registerCompany("company_name", {
              required: "Company name is required",
            })}
          />
          {errorsCompany.company_name && (
            <p className="text-red-500 text-sm">
              {errorsCompany.company_name.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="year"
            className="block text-sm font-bold text-gray-700"
          >
            Year
          </label>
          <select
            id="year"
            className={`block w-full p-2 border rounded ${
              errorsCompany.year ? "border-red-500" : ""
            }`}
            {...registerCompany("year", { required: "Year is required" })}
          >
            <option value="">Select Year</option>
            <option value={2022}>2022</option>
            <option value={2023}>2023</option>
            <option value={2024}>2024</option>
          </select>
          {errorsCompany.year && (
            <p className="text-red-500 text-sm">{errorsCompany.year.message}</p>
          )}
        </div>

        <div className="flex flex-col lg:grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="company_logo"
              className="block text-sm font-bold text-gray-700"
            >
              Company Logo
            </label>
            <input
              type="file"
              id="company_logo"
              className="block w-full p-2 border rounded"
              {...registerCompany("company_logo")}
              onChange={handleLogoChange}
            />

            {logoPreview && (
              <div className="mt-5 bg-gray-100">
                <img
                  src={`${SERVER_URL}${logoPreview}`}
                  alt="Logo Preview"
                  className="w-32 h-32 object-cover rounded"
                />
              </div>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default EditCompaniesDetails;
