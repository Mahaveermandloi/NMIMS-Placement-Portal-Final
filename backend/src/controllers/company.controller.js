import Company from "../models/company.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
 
const createCompany = asyncHandler(async (req, res) => {
  const { company_name, year } = req.body;

  if ([company_name, year].some((field) => !field || field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const logoFile = req.files?.company_logo?.[0]
    ? `/uploads/Company/Logo/${req.files.company_logo[0].filename}`
    : "";

  const company = new Company({
    company_name: company_name.trim(),
    year,
    company_logo: logoFile,
  });

  await company.save();

  res.status(201).json(
    new ApiResponse(201, {
      company,
    })
  );
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
const updateCompany = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { company_name, year } = req.body;

  // Find the company by ID
  const company = await Company.findById(id);

  if (!company) {
    throw new ApiError(404, "Company not found");
  }

  // Process uploaded files
  const logoFile = req.files?.company_logo?.[0]
    ? `/uploads/Company/Logo/${req.files.company_logo[0].filename}`
    : company.company_logo;

  // Update company fields
  company.company_name = company_name?.trim() || company.company_name;
  company.year = year || company.year;
  company.company_logo = logoFile || company.company_logo;

  await company.save();

  res
    .status(200)
    .json(new ApiResponse(200, company, "Company updated successfully"));
});

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
