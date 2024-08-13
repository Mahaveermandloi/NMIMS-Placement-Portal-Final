// import Company from "../models/company.model.js";
// import { ApiError } from "../utils/ApiError.js";
// import { ApiResponse } from "../utils/ApiResponse.js";
// import { asyncHandler } from "../utils/asyncHandler.js";
// import { uploadCompanyFiles } from "../middleware/companymulter.middleware.js";
// import Student from "../models/student.model.js";
// import { SendWhatsAppMessage } from "../utils/SendWhatsAppMessage.js";

// const createCompany = asyncHandler(async (req, res) => {
//   const {
//     company_name,
//     selection_rounds,
//     eligible_branches_and_programs,
//     academic_criteria,
//     designation,
//     details_of_ctc,
//     ctc,
//     year,
//   } = req.body;

//   if (
//     [
//       company_name,
//       selection_rounds,
//       eligible_branches_and_programs,
//       academic_criteria,
//       designation,
//       details_of_ctc,
//       ctc,
//       year,
//     ].some((field) => field?.trim() === "")
//   ) {
//     throw new ApiError(400, "All fields are required");
//   }

//   const logoFile = req.files["company_logo"]
//     ? `/uploads/Company/Logo/${req.files["company_logo"][0].filename}`
//     : "";
//   const companyFiles = req.files["company_files"]
//     ? req.files["company_files"].map(
//         (file) => `/uploads/Company/Files/${file.filename}`
//       )
//     : [];

//   const company = new Company({
//     company_name,
//     selection_rounds,
//     eligible_branches_and_programs,
//     academic_criteria,
//     designation,
//     details_of_ctc,
//     ctc,
//     year,
//     company_logo: logoFile,
//     company_files: companyFiles,
//   });

//   await company.save();

//   const students = await Student.find();
//   const message = `A new company, *${company_name}*, has been added to the placement portal. Check out the details and apply if you're eligible.`;

//   for (const student of students) {
//     const response = await SendWhatsAppMessage(
//       student.student_mobile_no,
//       message
//     );
//     console.log(response);
//   }

//   res
//     .status(201)
//     .json(new ApiResponse(201, company, "Company created successfully"));
// });

// import Company from "../models/company.model.js";
// import { ApiError } from "../utils/ApiError.js";
// import { ApiResponse } from "../utils/ApiResponse.js";
// import { asyncHandler } from "../utils/asyncHandler.js";
// import Student from "../models/student.model.js";
// import { SendWhatsAppMessage } from "../utils/SendWhatsAppMessage.js";

// const createCompany = asyncHandler(async (req, res) => {
//   const {
//     company_name,
//     selection_rounds,
//     eligible_branches_and_programs,
//     academic_criteria,
//     designation,
//     details_of_ctc,
//     ctc,
//     year,
//   } = req.body;

//   // Validate required fields
//   if (
//     [
//       company_name,
//       selection_rounds,
//       eligible_branches_and_programs,
//       academic_criteria,
//       designation,
//       details_of_ctc,
//       ctc,
//       year,
//     ].some((field) => field?.trim() === "")
//   ) {
//     throw new ApiError(400, "All fields are required");
//   }

//   // Handle file uploads
//   const logoFile = req.files["company_logo"]
//     ? `/uploads/Company/Logo/${req.files["company_logo"][0].filename}`
//     : "";
//   const companyFiles = req.files["company_files"]
//     ? req.files["company_files"].map(
//         (file) => `/uploads/Company/Files/${file.filename}`
//       )
//     : [];

//   // Create and save company record
//   const company = new Company({
//     company_name,
//     selection_rounds,
//     eligible_branches_and_programs,
//     academic_criteria,
//     designation,
//     details_of_ctc,
//     ctc,
//     year,
//     company_logo: logoFile,
//     company_files: companyFiles,
//   });

//   await company.save();

//   // Send notification to all students
//   const students = await Student.find();
//   const message = `A new company, *${company_name}*, has been added to the placement portal. Check out the details and apply if you're eligible.`;

//   for (const student of students) {
//     try {
//       const response = await SendWhatsAppMessage(
//         student.student_mobile_no,
//         message
//       );
//       console.log(`Message sent to ${student.student_mobile_no}:`, response);
//     } catch (error) {
//       console.error(
//         `Failed to send message to ${student.student_mobile_no}:`,
//         error
//       );
//     }
//   }

//   res
//     .status(201)
//     .json(new ApiResponse(201, company, "Company created successfully"));
// });

import Company from "../models/company.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Student from "../models/student.model.js";
import { SendWhatsAppMessage } from "../utils/SendWhatsAppMessage.js";
import { sendEmail } from "../utils/SendEmail.js";

const createCompany = asyncHandler(async (req, res) => {
  const {
    company_name,
    selection_rounds,
    eligible_branches_and_programs,
    academic_criteria,
    designation,
    details_of_ctc,
    ctc,
    year,
  } = req.body;

  // Validate required fields
  if (
    [
      company_name,
      selection_rounds,
      eligible_branches_and_programs,
      academic_criteria,
      designation,
      details_of_ctc,
      ctc,
      year,
    ].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  // Handle file uploads
  const logoFile = req.files["company_logo"]
    ? `/uploads/Company/Logo/${req.files["company_logo"][0].filename}`
    : "";
  const companyFiles = req.files["company_files"]
    ? req.files["company_files"].map(
        (file) => `/uploads/Company/Files/${file.filename}`
      )
    : [];

  // Create and save company record
  const company = new Company({
    company_name,
    selection_rounds,
    eligible_branches_and_programs,
    academic_criteria,
    designation,
    details_of_ctc,
    ctc,
    year,
    company_logo: logoFile,
    company_files: companyFiles,
  });

  await company.save();

  // Prepare notification message for WhatsApp
  const message = `A new company, *${company_name}*, has been added to the placement portal. Check out the details and apply if you're eligible.`;

  // Send WhatsApp notifications to all students
  const students = await Student.find();
  for (const student of students) {
    try {
      const response = await SendWhatsAppMessage(
        student.student_mobile_no,
        message
      );
      console.log(`Message sent to ${student.student_mobile_no}:`, response);
    } catch (error) {
      console.error(
        `Failed to send message to ${student.student_mobile_no}:`,
        error
      );
    }
  }

  // Fetch email addresses from the Student collection
  const studentsWithEmail = await Student.find({
    student_email_id: { $ne: null },
  }); // Fetch students with non-null email addresses
  const emailAddresses = studentsWithEmail.map(
    (student) => student.student_email_id
  );

  // Prepare email content
  const emailSubject = `New Company Added: ${company_name}`;
  const emailText = `Dear Student,

A new company, *${company_name}*, has been added to the placement portal.

Details:
- Selection Rounds: ${selection_rounds}
- Eligible Branches and Programs: ${eligible_branches_and_programs}
- Academic Criteria: ${academic_criteria}
- Designation: ${designation}
- Details of CTC: ${details_of_ctc}
- CTC: ${ctc}
- Year: ${year}

Please review the company details and take any necessary actions.

Best Regards,
Placement Team`;

  // Send email notifications to all students
  for (const email of emailAddresses) {
    try {
      const info = await sendEmail(email, emailSubject, emailText);
      console.log(`Email sent to ${email}:`, info.response);
    } catch (error) {
      console.error(`Failed to send email to ${email}:`, error);
    }
  }

  res
    .status(201)
    .json(new ApiResponse(201, company, "Company created successfully"));
});

// Get all companies
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
  const {
    company_name,
    selection_rounds,
    eligible_branches_and_programs,
    academic_criteria,
    designation,
    details_of_ctc,
    ctc,
    year,
  } = req.body;

  // Find the company by ID
  const company = await Company.findById(id);

  if (!company) {
    throw new ApiError(404, "Company not found");
  }

  // Process uploaded files
  const logoFile = req.files["company_logo"]
    ? `/uploads/Company/Logo/${req.files["company_logo"][0].filename}`
    : company.company_logo;
  const companyFiles = req.files["company_files"]
    ? req.files["company_files"].map(
        (file) => `/uploads/Company/Files/${file.filename}`
      )
    : company.company_files;

  // Update company fields
  company.company_name = company_name || company.company_name;
  company.selection_rounds = selection_rounds || company.selection_rounds;
  company.eligible_branches_and_programs =
    eligible_branches_and_programs || company.eligible_branches_and_programs;
  company.academic_criteria = academic_criteria || company.academic_criteria;
  company.designation = designation || company.designation;
  company.details_of_ctc = details_of_ctc || company.details_of_ctc;
  company.ctc = ctc || company.ctc;
  company.year = year || company.year;
  company.company_logo = logoFile || company.company_logo;
  company.company_files = companyFiles || company.company_files;

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
