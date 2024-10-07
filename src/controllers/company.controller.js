import Company from "../models/company.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Create a new company
const createCompany = asyncHandler(async (req, res) => {

  
  const { company_name, year } = req.body;


  // Validate required fields
  if ([company_name, year].some((field) => !field || field.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

const logoFile = req.file ? req.file.path : ""; 
  console.log(logoFile)

  const company = new Company({
    company_name: company_name.trim(),
    year,
    company_logo: logoFile,
  });

  // Save the new company
  await company.save();

  res.status(201).json(
    new ApiResponse(201, {
      company,
    })
  );
});

// Update an existing company
const updateCompany = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { company_name, year } = req.body;

  // Find the company by ID
  const company = await Company.findById(id);
  if (!company) {
    throw new ApiError(404, "Company not found");
  }

  // Process uploaded files, prioritize new uploads from Cloudinary or keep the old one
  const logoFile = req.file ? req.file.path : company.company_logo; // Use Cloudinary file URL

  // Update company fields
  company.company_name = company_name?.trim() || company.company_name;
  company.year = year || company.year;
  company.company_logo = logoFile || company.company_logo;

  // Save updated company data
  await company.save();

  res
    .status(200)
    .json(new ApiResponse(200, company, "Company updated successfully"));
});



const getAllCompanies = asyncHandler(async (req, res) => {
  const companies = await Company.find();

  res
    .status(200)
    .json(new ApiResponse(200, companies, "Companies fetched successfully"));
});

// Get a company by ID
const getCompanyById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const company = await Company.findById(id);

  if (!company) {
    throw new ApiError(404, "Company not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, company, "Company fetched successfully"));
});

// Update a company

// Delete a company
const deleteCompany = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const company = await Company.findByIdAndDelete(id);

  if (!company) {
    throw new ApiError(404, "Company not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, null, "Company deleted successfully"));
});

export {
  createCompany,
  getAllCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
};
