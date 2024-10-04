import JobListing from "../models/joblisting.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Company from "../models/company.model.js";

// Create a new Job Listing
const createJobListing = asyncHandler(async (req, res) => {
  const {
    company_id,
    job_title,
    job_description,
    job_type,
    location,
    ctc, // Changed from package to ctc
    application_deadline,
    year,
  } = req.body;

  if (
    !company_id ||
    !job_title ||
    !job_description ||
    !job_type ||
    !location ||
    !ctc || // Changed from package to ctc
    !application_deadline ||
    !year
  ) {
    throw new ApiError(400, "All fields are required");
  }

  // Fetch company details using the company_id
  const company = await Company.findById(company_id);
  if (!company) {
    throw new ApiError(404, "Company not found");
  }

  const company_name = company.company_name; // Assuming the company name is stored in 'company_name' field
  const company_logo = company.company_logo; // Fetch company logo

  // Create the job listing with the company details
  const jobListing = new JobListing({
    company_id,
    job_title,
    job_description,
    job_type,
    location,
    company_name,
    company_logo, // Set company logo
    ctc,
    application_deadline,
    year,
  });

  await jobListing.save();

  res
    .status(201)
    .json(new ApiResponse(201, jobListing, "Job listing created successfully"));
});

// Get all Job Listings
const getAllJobListings = asyncHandler(async (req, res) => {
  const jobListings = await JobListing.find();

  res
    .status(200)
    .json(
      new ApiResponse(200, jobListings, "Job listings fetched successfully")
    );
});

// Get a single Job Listing by ID
const getJobListingById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const jobListing = await JobListing.findById(id);

  if (!jobListing) {
    throw new ApiError(404, "Job listing not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, jobListing, "Job listing fetched successfully"));
});

// Update a Job Listing by ID
const updateJobListing = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  if (updateData.ctc === undefined) {
    throw new ApiError(400, "CTC is required");
  }

  const jobListing = await JobListing.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!jobListing) {
    throw new ApiError(404, "Job listing not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, jobListing, "Job listing updated successfully"));
});

// Delete a Job Listing by ID
const deleteJobListing = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const jobListing = await JobListing.findByIdAndDelete(id);

  if (!jobListing) {
    throw new ApiError(404, "Job listing not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, null, "Job listing deleted successfully"));
});

export {
  createJobListing,
  getAllJobListings,
  getJobListingById,
  updateJobListing,
  deleteJobListing,
};
