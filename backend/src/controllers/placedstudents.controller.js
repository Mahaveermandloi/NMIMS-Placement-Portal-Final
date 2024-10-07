import PlacedStudent from "../models/placedstudents.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Company from "../models/company.model.js";
import Student from "../models/student.model.js";

const createPlacedStudent = asyncHandler(async (req, res) => {
  const {
    student_sap_no,
    name_of_student,
    student_email_id,
    company_name,
    job_title,
    ctc,
    year,
  } = req.body;

  
  if (
    !student_sap_no ||
    !name_of_student ||
    !student_email_id ||
    !company_name ||
    !job_title ||
    ctc === undefined ||
    !year
  ) {
    throw new ApiError(400, "All fields are required");
  }

  // Check if the student already exists
  const existingStudent = await PlacedStudent.findOne({ student_sap_no });

  if (existingStudent) {
    throw new ApiError(409, "Student with this SAP number already placed");
  }

  // Fetch the student profile image from the Student model
  const student = await Student.findOne({ student_sap_no });

  if (!student) {
    throw new ApiError(404, "Student not found");
  }

  // Fetch the company logo from the Company model
  const company = await Company.findOne({ company_name });

  if (!company) {
    throw new ApiError(404, "Company not found");
  }

  // Create a new PlacedStudent document
  const placedStudent = new PlacedStudent({
    student_sap_no,
    name_of_student,
    student_email_id,
    company_name,
    company_logo: company.company_logo, // Include the company logo
    student_profile_image: student.student_profile_image, // Include the student profile image
    job_title,
    ctc,
    year,
    engineering_specialization: student.engineering_specialization, // Use the specialization from the request body
  });

  // Save the PlacedStudent document
  await placedStudent.save();

  res
    .status(201)
    .json(
      new ApiResponse(201, placedStudent, "Placed student created successfully")
    );
});

// Update a Placed Student by ID
const updatePlacedStudent = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const {
    student_sap_no,
    name_of_student,
    student_email_id,
    company_name,
    job_title,
    ctc,
    year,
    engineering_specialization,
  } = req.body;

  // Find the current placed student document
  const currentPlacedStudent = await PlacedStudent.findById(id);

  if (!currentPlacedStudent) {
    throw new ApiError(404, "Placed student not found");
  }

  // Initialize update data object
  let updateData = {
    name_of_student,
    student_email_id,
    job_title,
    ctc,
    year,
    engineering_specialization,
  };

  // Check if the company name has changed
  if (company_name && company_name !== currentPlacedStudent.company_name) {
    const company = await Company.findOne({ company_name });

    if (!company) {
      throw new ApiError(404, "Company not found");
    }

    // Update the company logo in updateData
    updateData.company_name = company_name;
    updateData.company_logo = company.company_logo;
  }

  // Check if the student SAP number has changed
  if (
    student_sap_no &&
    student_sap_no !== currentPlacedStudent.student_sap_no
  ) {
    const student = await Student.findOne({ student_sap_no });

    if (!student) {
      throw new ApiError(404, "Student not found");
    }

    // Update the student profile image in updateData
    updateData.student_sap_no = student_sap_no;
    updateData.student_profile_image = student.student_profile_image;
  }

  // Update the placed student document with new data
  const placedStudent = await PlacedStudent.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!placedStudent) {
    throw new ApiError(404, "Placed student not found");
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, placedStudent, "Placed student updated successfully")
    );
});

// Get all Placed Students
const getAllPlacedStudents = asyncHandler(async (req, res) => {
  const placedStudents = await PlacedStudent.find();
  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        placedStudents,
        "Placed students fetched successfully"
      )
    );
});

// Get a single Placed Student by ID
const getPlacedStudentById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const placedStudent = await PlacedStudent.findById(id);

  if (!placedStudent) {
    throw new ApiError(404, "Placed student not found");
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, placedStudent, "Placed student fetched successfully")
    );
});

// Delete a Placed Student by ID
const deletePlacedStudent = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const placedStudent = await PlacedStudent.findByIdAndDelete(id);

  if (!placedStudent) {
    throw new ApiError(404, "Placed student not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, null, "Placed student deleted successfully"));
});

export {
  createPlacedStudent,
  getAllPlacedStudents,
  getPlacedStudentById,
  updatePlacedStudent,
  deletePlacedStudent,
};
