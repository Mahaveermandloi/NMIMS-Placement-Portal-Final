import JobListing from "../models/joblisting.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Company from "../models/company.model.js";
import Student from "../models/student.model.js";
import MassMailer from "../utils/SendBulkMail.js"; // Adjust the path as needed

// Create an instance of MassMailer
const massMailer = new MassMailer();

// Create a new Job Listing
const createJobListing = asyncHandler(async (req, res) => {
  const {
    company_id,
    job_title,
    job_description,
    job_type,
    location,
    ctc,
    application_deadline,
    year,
    twelfth_standard_percentage,
    tenth_standard_percentage,
    engineering_specialization,
    cgpa_sixth_semester_third_year,
    total_dead_kts,
    total_live_kts,
  } = req.body;

  console.log(
    company_id,
    job_title,
    job_description,
    job_type,
    location,
    ctc,
    application_deadline,
    year,
    twelfth_standard_percentage,
    tenth_standard_percentage,
    engineering_specialization,
    cgpa_sixth_semester_third_year,
    total_dead_kts,
    total_live_kts
  );

  // Validate required fields
  if (
    !company_id ||
    !job_title ||
    !job_description ||
    !job_type ||
    !location ||
    !ctc ||
    !application_deadline ||
    !year
  ) {
    throw new ApiError(400, "All fields are required");
  }

  // Fetch company details
  const company = await Company.findById(company_id);
  if (!company) {
    throw new ApiError(404, "Company not found");
  }

  const company_name = company.company_name;
  const company_logo = company.company_logo;

  // Create the job listing
  const jobListing = new JobListing({
    company_id,
    job_title,
    job_description,
    job_type,
    location,
    company_name,
    company_logo,
    ctc,
    application_deadline,
    year,
  });

  await jobListing.save();

  // Fetch eligible students based on criteria or all students if no criteria provided
  let eligibleStudents;

  if (
    cgpa_sixth_semester_third_year ||
    tenth_standard_percentage ||
    twelfth_standard_percentage ||
    engineering_specialization ||
    total_dead_kts ||
    total_live_kts
  ) {
    // Fetch eligible students based on the provided criteria
    eligibleStudents = await Student.find({
      cgpa_sixth_semester_third_year: { $gte: cgpa_sixth_semester_third_year }, // Minimum CGPA
      tenth_standard_percentage: { $gte: tenth_standard_percentage }, // Minimum 10th standard percentage
      twelfth_standard_percentage: { $gte: twelfth_standard_percentage }, // Minimum 12th standard percentage
      engineering_specialization: { $in: engineering_specialization }, // Allowed engineering specializations
      total_dead_kts: { $lte: total_dead_kts }, // Maximum dead KTs
      total_live_kts: { $lte: total_live_kts }, // Maximum live KTs
    });
  } else {
    // If no criteria provided, fetch all students
    eligibleStudents = await Student.find({});
  }

  // Extract email IDs of eligible students
  const eligibleEmails = eligibleStudents.map(
    (student) => student.student_email_id
  );

  // Send bulk emails to eligible students
  await massMailer.sendBulkEmails(eligibleEmails, company_name, job_title);

  const eligibleStudentName = eligibleStudents.map(
    (student) => student.name_of_student
  );
  console.log(eligibleEmails);
  console.log(eligibleStudentName);

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

// Call the function

export {
  createJobListing,
  getAllJobListings,
  getJobListingById,
  updateJobListing,
  deleteJobListing,
};
