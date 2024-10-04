import ShortlistedStudent from "../models/shortlistedstudents.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Company from "../models/company.model.js";
import Student from "../models/student.model.js";
import Joblisting from "../models/joblisting.model.js";
import JobListing from "../models/joblisting.model.js";
import { SendWhatsAppMessage } from "../utils/SendWhatsAppMessage.js";
import { sendEmail } from "../utils/SendEmail.js";
import Document from "../models/shortlistedstudentfiles.model.js";

import XLSX from "xlsx";

const createShortlistedStudent = asyncHandler(async (req, res) => {
  const {
    branch,
    company_name,
    job_role,
    name_of_student,
    student_email_id,
    student_sap_no,
    year,
  } = req.body;

  console.log(
    branch,
    company_name,
    job_role,
    name_of_student,
    student_email_id,
    student_sap_no,
    year
  );

  // Validate input fields
  if (
    !branch ||
    !company_name ||
    !job_role ||
    !name_of_student ||
    !student_email_id ||
    !student_sap_no ||
    !year
  ) {
    throw new ApiError(400, "All fields are required");
  }

  // Fetch the company and job IDs using their names
  const company = await Company.findOne({ company_name });
  if (!company) {
    throw new ApiError(404, "Company not found");
  }

  const job = await Joblisting.findOne({ job_title: job_role });
  if (!job) {
    throw new ApiError(404, "Job not found");
  }

  // Fetch engineering specialization and profile image from Student model
  const student = await Student.findOne({ student_sap_no });
  if (!student) {
    throw new ApiError(404, "Student not found");
  }

  const { engineering_specialization, student_profile_image } = student;

  // Create and save the ShortlistedStudent document
  const shortlistedStudent = new ShortlistedStudent({
    company_id: company._id,
    job_id: job._id,
    student_sap_no,
    company_name,
    name_of_student,
    job_title: job_role,
    student_email_id,
    engineering_specialization,
    year,
    student_profile_image, // Save the student's profile image URL
  });

  await shortlistedStudent.save();

  if (student) {
    
    const emailBody = `
      Dear ${name_of_student},

      Congratulations! You have been shortlisted for a job opportunity with ${company_name}. 

      Your SAP number is: ${student_sap_no}.

      Best regards,
      Placement Team
    `;

    await sendEmail(
      student_email_id,
      "Shortlisted for Job Opportunity",
      emailBody
    );

  
  }

  
  res
    .status(201)
    .json(
      new ApiResponse(
        201,
        shortlistedStudent,
        "Shortlisted student created successfully"
      )
    );
});

const updateShortlistedStudent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  // If company_name or job_title is provided in the update, fetch the corresponding IDs
  if (updateData.company_name) {
    const company = await Company.findOne({
      company_name: updateData.company_name,
    });
    if (company) {
      updateData.company_id = company._id;
    } else {
      throw new ApiError(404, "Company not found");
    }
  }

  if (updateData.job_title) {
    const job = await Joblisting.findOne({ job_title: updateData.job_title });
    if (job) {
      updateData.job_id = job._id;
    } else {
      throw new ApiError(404, "Job not found");
    }
  }

  // If student_sap_no is provided in the update, fetch the new engineering specialization
  if (updateData.student_sap_no) {
    const student = await Student.findOne({
      student_sap_no: updateData.student_sap_no,
    });
    if (student) {
      updateData.engineering_specialization =
        student.engineering_specialization;
    } else {
      throw new ApiError(404, "Student not found");
    }
  }

  const shortlistedStudent = await ShortlistedStudent.findByIdAndUpdate(
    id,
    updateData,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!shortlistedStudent) {
    throw new ApiError(404, "Shortlisted student not found");
  }

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        shortlistedStudent,
        "Shortlisted student updated successfully"
      )
    );
});

const getAllShortlistedStudents = asyncHandler(async (req, res) => {
  const shortlistedStudents = await ShortlistedStudent.find();

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        shortlistedStudents,
        "Shortlisted students fetched successfully"
      )
    );
});

const getShortlistedStudentById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Fetch the shortlisted student
  const shortlistedStudent = await ShortlistedStudent.findById(id);
  if (!shortlistedStudent) {
    throw new ApiError(404, "Shortlisted student not found");
  }

  // Fetch company name and job title
  const company = await Company.findById(shortlistedStudent.company_id).select(
    "company_name"
  );
  const job = await Joblisting.findById(shortlistedStudent.job_id).select(
    "job_title"
  );
  const student = await Student.findOne({
    student_sap_no: shortlistedStudent.student_sap_no,
  }).select("student_email_id");

  if (!company || !job || !student) {
    throw new ApiError(404, "Company, Job, or Student not found");
  }

  // Combine all data into one object
  const detailedShortlistedStudent = {
    ...shortlistedStudent.toObject(),
    company_name: company.company_name,
    job_title: job.job_title,
    student_email_id: student.student_email_id,
  };

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        detailedShortlistedStudent,
        "Shortlisted student fetched successfully"
      )
    );
});

const deleteShortlistedStudent = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const shortlistedStudent = await ShortlistedStudent.findByIdAndDelete(id);

  if (!shortlistedStudent) {
    throw new ApiError(404, "Shortlisted student not found");
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, null, "Shortlisted student deleted successfully")
    );
});

const uploadExcelShortlistedStudent = asyncHandler(async (req, res) => {
  const { company_name, date } = req.body;

  if (!company_name || !date) {
    throw new ApiError(400, "Company name and date are required");
  }

  const file = req.file;
  if (!file) {
    throw new ApiError(400, "File is required");
  }

  const filePath = `/uploads/ShortlistedStudent/${file.filename}`;

  await Document.create({
    company_name,
    date: new Date(date),
    filePath,
  });

  // Read Excel file and extract data
  const workbook = XLSX.readFile(file.path);
  const sheetNames = workbook.SheetNames;
  const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNames[0]]);

  const company = await Company.findOne({ company_name });
  if (!company) {
    throw new ApiError(404, "Company not found");
  }

  for (const row of data) {
    const { student_sap_no, name_of_student, campus, student_email_id } = row;

    console.log(student_sap_no, name_of_student, campus, student_email_id);

    if (campus === "shirpur" || campus === "Shirpur") {
      const student = await Student.findOne({ name_of_student });

     
      if (student) {
        const emailBody = `
          Dear ${name_of_student},

          Congratulations! You have been shortlisted for a job opportunity with ${company_name}. 

          Your SAP number is: ${student_sap_no}.

          Best regards,
          Placement Team
        `;

        await sendEmail(
          student_email_id,
          "Shortlisted for Job Opportunity",
          emailBody
        );


        await ShortlistedStudent.create({
          company_id: company._id,
          job_id: null, // Set this to the appropriate job ID if available
          student_sap_no: student_sap_no,
          company_name,
          name_of_student,
          job_title: null, // Set this to the appropriate job title if available
          student_email_id,
          engineering_specialization: student.engineering_specialization,
          year: new Date(date).getFullYear(), // Convert date to year
        });
      }
    }
  }

  // Respond with success
  res
    .status(200)
    .json(
      new ApiResponse(200, null, "Shortlisted students processed successfully")
    );
});

const getAllExcels = asyncHandler(async (req, res) => {
  try {
    const document = await Document.find();

    console.log(document);
    res
      .status(200)
      .json(new ApiResponse(200, document, "Fetched data successfully!!"));
  } catch (error) {
    res
      .status(500)
      .json(
        new ApiResponse(500, error.message, "Error retrieving Excel files")
      );
  }
});

// Exporting all CRUD controller functions for ShortlistedStudent
export {
  createShortlistedStudent,
  getAllShortlistedStudents,
  getShortlistedStudentById,
  updateShortlistedStudent,
  deleteShortlistedStudent,
  uploadExcelShortlistedStudent,
  getAllExcels,
};
