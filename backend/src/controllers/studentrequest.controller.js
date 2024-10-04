import Student from "../models/student.model.js";
import StudentRequest from "../models/studentsrequest.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getAllPendingStudents = asyncHandler(async (req, res) => {
  const pendingStudents = await StudentRequest.find({ status: "Pending" });

  return res.status(200).json(
    new ApiResponse(
      200,

      pendingStudents,

      "Successfully fetched data"
    )
  );
});

export const approveStudentRequest = asyncHandler(async (req, res) => {
  const { student_sap_no } = req.body;

  const studentRequest = await StudentRequest.findOne({
    student_sap_no: student_sap_no,
  });
  if (!studentRequest) {
    throw new ApiError(404, "Student request not found");
  }

  const approvedStudent = new Student({
    ...studentRequest._doc,
    status: "Approved",
  });

  await approvedStudent.save();

  await StudentRequest.findByIdAndDelete(studentRequest._id);

  return res
    .status(200)
    .json(
      new ApiResponse(200, "Student request approved and added to students")
    );
});

export const rejectStudentRequest = asyncHandler(async (req, res) => {
  const { student_sap_no } = req.body;

  const studentRequest = await StudentRequest.findOne({
    student_sap_no: student_sap_no,
  });
  if (!studentRequest) {
    throw new ApiError(404, "Student request not found");
  }

  await StudentRequest.findByIdAndDelete(studentRequest._id);

  return res.status(200).json(new ApiResponse(200, "Student request rejected"));
});

export const getStudentRequestById = asyncHandler(async (req, res) => {
  const { student_sap_no } = req.params; // Assuming you're passing student_sap_no as a URL parameter



  // Find the student request by SAP number
  const studentRequest = await StudentRequest.findOne({
    student_sap_no: student_sap_no,
  });

 

  // If the student request is not found, throw a 404 error
  if (!studentRequest) {
    throw new ApiError(404, "Student request not found");
  }

  // Return the student request as a successful response
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        studentRequest,
        "Successfully fetched student request"
      )
    );
});
