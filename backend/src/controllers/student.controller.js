import Student from "../models/student.model.js";
import StudentRequest from "../models/studentsrequest.model.js";
import Password from "../models/password.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import StudentExcel from "../models/studentfiles.model.js";
import ms from "ms";
import XLSX from "xlsx";

// Register Student
// const registerStudent = asyncHandler(async (req, res) => {
//   const {
//     student_sap_no,
//     student_roll_no,
//     campus,
//     program,
//     engineering_specialization,
//     first_name,
//     middle_name,
//     last_name,
//     name_of_student,
//     fathers_name,
//     mothers_name,
//     date_of_birth,
//     gender,
//     local_address,
//     local_address_city,
//     local_address_state,
//     permanent_address,
//     permanent_address_postal_code,
//     home_town,
//     permanent_address_city,
//     permanent_address_state,
//     permanent_address_country,
//     student_mobile_no,
//     alternate_student_mobile_no,
//     fathers_mobile_no,
//     mothers_mobile_no,
//     home_landline_no,
//     home_mobile_no,
//     student_email_id,
//     student_alternate_email_id,
//     fathers_email_id,
//     mothers_email_id,
//     has_pan_card,
//     pan_card_no,
//     aadhar_card_no,
//     has_passport,
//     passport_no,
//     passport_expiry_date,
//     tenth_standard_percentage,
//     year_of_passing_tenth,
//     board_of_passing_tenth,
//     tenth_school,
//     tenth_passing_state,
//     tenth_passing_country,
//     twelfth_standard_percentage,
//     year_of_passing_twelfth,
//     board_of_passing_twelfth,
//     twelfth_school,
//     twelfth_school_city,
//     twelfth_passing_state,
//     twelfth_passing_country,
//     diploma_stream,
//     diploma_passing_state,
//     diploma_passing_country,
//     diploma_college,
//     diploma_board_of_passing,
//     diploma_year_of_passing,
//     first_year_first_semester_percentage_diploma,
//     first_year_second_semester_percentage_diploma,
//     first_year_percentage_diploma,
//     second_year_third_semester_percentage_diploma,
//     second_year_fourth_semester_percentage_diploma,
//     second_year_percentage_diploma,
//     third_year_fifth_semester_percentage_diploma,
//     third_year_sixth_semester_percentage_diploma,
//     third_year_percentage_diploma,
//     fourth_year_seventh_semester_percentage_diploma,
//     fourth_year_eighth_semester_percentage_diploma,
//     fourth_year_percentage_diploma,
//     final_percentage_diploma,
//     aggregate_percentage_diploma,
//     year_of_passing_diploma,
//     gpa_first_semester_first_year,
//     cgpa_first_semester_first_year,
//     academic_year_clearing_sem1,
//     gpa_second_semester_first_year,
//     cgpa_second_semester_first_year,
//     academic_year_clearing_sem2,
//     gpa_third_semester_second_year,
//     cgpa_third_semester_second_year,
//     academic_year_clearing_sem3,
//     gpa_fourth_semester_second_year,
//     cgpa_fourth_semester_second_year,
//     academic_year_clearing_sem4,
//     gpa_fifth_semester_third_year,
//     cgpa_fifth_semester_third_year,
//     academic_year_clearing_sem5,
//     gpa_sixth_semester_third_year,
//     cgpa_sixth_semester_third_year,
//     academic_year_clearing_sem6,
//     total_dead_kts,
//     total_live_kts,
//     last_received_marksheet,
//     has_year_drop_or_gap,
//     year_drop_between_tenth_and_beginning_of_engineering,
//     years_of_gap,
//     reason_for_gap_or_drop_before_engineering,
//     year_drop_between_engineering,
//     years_of_gap_during_engineering,
//     reason_for_gap_or_drop_during_engineering,
//     cv_uploaded_in_nmims_format,
//     documents_uploaded,
//   } = req.body;

//   console.log(req.body);
//   console.log("ksnfksn");

//   console.log(req.files);

//   // Validate required fields
//   if ([student_sap_no, student_roll_no].some((field) => field?.trim() === "")) {
//     throw new ApiError(400, "SAP No and Roll No are required");
//   }

//   // Prepare file paths
//   const studentProfileImage = req.files["student_profile_image"]
//     ? req.files["student_profile_image"][0]
//     : null;

//   const studentCV = req.files["student_cv"] ? req.files["student_cv"][0] : null;

//   const studentMarksheet = req.files["student_marksheet"]
//     ? req.files["student_marksheet"][0]
//     : null;

//   const profileImagePath = studentProfileImage
//     ? `/uploads/Student/ProfileImage/${studentProfileImage.filename}`
//     : null;

//   const cvPath = studentCV
//     ? `/uploads/Student/Resume/${studentCV.filename}`
//     : null;

//   const marksheetPath = studentMarksheet
//     ? `/uploads/Student/Marksheets/${studentMarksheet.filename}`
//     : null;

//   // Check if the student already exists
//   const existingStudent = await Student.findOne({ student_sap_no });

//   if (existingStudent) {
//     throw new ApiError(409, "Student with this SAP No already exists");
//   }

//   // Create and save new student
//   const student = new Student({
//     student_sap_no,
//     student_roll_no,
//     campus,
//     program,
//     engineering_specialization,
//     first_name,
//     middle_name,
//     last_name,
//     name_of_student,
//     fathers_name,
//     mothers_name,
//     date_of_birth,
//     gender,
//     local_address,
//     local_address_city,
//     local_address_state,
//     permanent_address,
//     permanent_address_postal_code,
//     home_town,
//     permanent_address_city,
//     permanent_address_state,
//     permanent_address_country,
//     student_mobile_no,
//     alternate_student_mobile_no,
//     fathers_mobile_no,
//     mothers_mobile_no,
//     home_landline_no,
//     home_mobile_no,
//     student_email_id,
//     student_alternate_email_id,
//     fathers_email_id,
//     mothers_email_id,
//     has_pan_card,
//     pan_card_no,
//     aadhar_card_no,
//     has_passport,
//     passport_no,
//     passport_expiry_date,
//     tenth_standard_percentage,
//     year_of_passing_tenth,
//     board_of_passing_tenth,
//     tenth_school,
//     tenth_passing_state,
//     tenth_passing_country,
//     twelfth_standard_percentage,
//     year_of_passing_twelfth,
//     board_of_passing_twelfth,
//     twelfth_school,
//     twelfth_school_city,
//     twelfth_passing_state,
//     twelfth_passing_country,
//     diploma_stream,
//     diploma_passing_state,
//     diploma_passing_country,
//     diploma_college,
//     diploma_board_of_passing,
//     diploma_year_of_passing,
//     first_year_first_semester_percentage_diploma,
//     first_year_second_semester_percentage_diploma,
//     first_year_percentage_diploma,
//     second_year_third_semester_percentage_diploma,
//     second_year_fourth_semester_percentage_diploma,
//     second_year_percentage_diploma,
//     third_year_fifth_semester_percentage_diploma,
//     third_year_sixth_semester_percentage_diploma,
//     third_year_percentage_diploma,
//     fourth_year_seventh_semester_percentage_diploma,
//     fourth_year_eighth_semester_percentage_diploma,
//     fourth_year_percentage_diploma,
//     final_percentage_diploma,
//     aggregate_percentage_diploma,
//     year_of_passing_diploma,
//     gpa_first_semester_first_year,
//     cgpa_first_semester_first_year,
//     academic_year_clearing_sem1,
//     gpa_second_semester_first_year,
//     cgpa_second_semester_first_year,
//     academic_year_clearing_sem2,
//     gpa_third_semester_second_year,
//     cgpa_third_semester_second_year,
//     academic_year_clearing_sem3,
//     gpa_fourth_semester_second_year,
//     cgpa_fourth_semester_second_year,
//     academic_year_clearing_sem4,
//     gpa_fifth_semester_third_year,
//     cgpa_fifth_semester_third_year,
//     academic_year_clearing_sem5,
//     gpa_sixth_semester_third_year,
//     cgpa_sixth_semester_third_year,
//     academic_year_clearing_sem6,
//     total_dead_kts,
//     total_live_kts,
//     last_received_marksheet,
//     has_year_drop_or_gap,
//     year_drop_between_tenth_and_beginning_of_engineering,
//     years_of_gap,
//     reason_for_gap_or_drop_before_engineering,
//     year_drop_between_engineering,
//     years_of_gap_during_engineering,
//     reason_for_gap_or_drop_during_engineering,
//     cv_uploaded_in_nmims_format,
//     documents_uploaded,
//     student_profile_image: profileImagePath,
//     student_cv: cvPath,
//     student_marksheet: marksheetPath,
//   });

//   console.log(req.body);

//   await student.save();

//   // Hash the password (SAP No) and save it to the Password collection
//   const password = new Password({
//     student_id: student._id,
//     password: student_sap_no,
//   });

//   await password.save();

//   // Return success response
//   const createdStudent = await Student.findById(student._id).select(
//     "-password"
//   );

//   if (!createdStudent) {
//     throw new ApiError(
//       500,
//       "Something went wrong while registering the student"
//     );
//   }

//   res
//     .status(200)
//     .json(
//       new ApiResponse(200, createdStudent, "Student registered successfully")
//     );
// });

const registerStudent = asyncHandler(async (req, res) => {
  const {
    student_sap_no,
    student_roll_no,
    campus,
    program,
    engineering_specialization,
    first_name,
    middle_name,
    last_name,
    name_of_student,
    fathers_name,
    mothers_name,
    date_of_birth,
    gender,
    local_address,
    local_address_city,
    local_address_state,
    permanent_address,
    permanent_address_postal_code,
    home_town,
    permanent_address_city,
    permanent_address_state,
    permanent_address_country,
    student_mobile_no,
    alternate_student_mobile_no,
    fathers_mobile_no,
    mothers_mobile_no,
    home_landline_no,
    home_mobile_no,
    student_email_id,
    student_alternate_email_id,
    fathers_email_id,
    mothers_email_id,
    has_pan_card,
    pan_card_no,
    aadhar_card_no,
    has_passport,
    passport_no,
    passport_expiry_date,
    tenth_standard_percentage,
    year_of_passing_tenth,
    board_of_passing_tenth,
    tenth_school,
    tenth_passing_state,
    tenth_passing_country,
    twelfth_standard_percentage,
    year_of_passing_twelfth,
    board_of_passing_twelfth,
    twelfth_school,
    twelfth_school_city,
    twelfth_passing_state,
    twelfth_passing_country,
    diploma_stream,
    diploma_passing_state,
    diploma_passing_country,
    diploma_college,
    diploma_board_of_passing,
    diploma_year_of_passing,
    first_year_first_semester_percentage_diploma,
    first_year_second_semester_percentage_diploma,
    first_year_percentage_diploma,
    second_year_third_semester_percentage_diploma,
    second_year_fourth_semester_percentage_diploma,
    second_year_percentage_diploma,
    third_year_fifth_semester_percentage_diploma,
    third_year_sixth_semester_percentage_diploma,
    third_year_percentage_diploma,
    fourth_year_seventh_semester_percentage_diploma,
    fourth_year_eighth_semester_percentage_diploma,
    fourth_year_percentage_diploma,
    final_percentage_diploma,
    aggregate_percentage_diploma,
    year_of_passing_diploma,
    gpa_first_semester_first_year,
    cgpa_first_semester_first_year,
    academic_year_clearing_sem1,
    gpa_second_semester_first_year,
    cgpa_second_semester_first_year,
    academic_year_clearing_sem2,
    gpa_third_semester_second_year,
    cgpa_third_semester_second_year,
    academic_year_clearing_sem3,
    gpa_fourth_semester_second_year,
    cgpa_fourth_semester_second_year,
    academic_year_clearing_sem4,
    gpa_fifth_semester_third_year,
    cgpa_fifth_semester_third_year,
    academic_year_clearing_sem5,
    gpa_sixth_semester_third_year,
    cgpa_sixth_semester_third_year,
    academic_year_clearing_sem6,
    total_dead_kts,
    total_live_kts,
    last_received_marksheet,
    has_year_drop_or_gap,
    year_drop_between_tenth_and_beginning_of_engineering,
    years_of_gap,
    reason_for_gap_or_drop_before_engineering,
    year_drop_between_engineering,
    years_of_gap_during_engineering,
    reason_for_gap_or_drop_during_engineering,
    cv_uploaded_in_nmims_format,
    documents_uploaded,
  } = req.body;

  console.log(req.body);
 

  console.log(req.files);

  if ([student_sap_no, student_roll_no].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "SAP No and Roll No are required");
  }

  // Check if the student already exists in the Student table (approved students)
  const approvedStudent = await Student.findOne({ student_sap_no });

  if (approvedStudent) {
    throw new ApiError(409, "You cannot request. You are already approved.");
  }

  const existingStudent = await StudentRequest.findOne({ student_sap_no });

  if (existingStudent) {
    throw new ApiError(409, "Student Request Pending");
  }

  // Prepare file paths
  const studentProfileImage = req.files["student_profile_image"]
    ? req.files["student_profile_image"][0]
    : null;

  const studentCV = req.files["student_cv"] ? req.files["student_cv"][0] : null;

  const student_marksheet_sem_1 = req.files["student_marksheet"]
    ? req.files["student_marksheet"][0]
    : null;

  const student_marksheet_sem_2 = req.files["student_marksheet"]
    ? req.files["student_marksheet"][1]
    : null;

  const student_marksheet_sem_3 = req.files["student_marksheet"]
    ? req.files["student_marksheet"][2]
    : null;

  const student_marksheet_sem_4 = req.files["student_marksheet"]
    ? req.files["student_marksheet"][3]
    : null;
  const student_marksheet_sem_5 = req.files["student_marksheet"]
    ? req.files["student_marksheet"][4]
    : null;

  const student_marksheet_sem_6 = req.files["student_marksheet"]
    ? req.files["student_marksheet"][5]
    : null;

  const profileImagePath = studentProfileImage
    ? `/uploads/Student/ProfileImage/${studentProfileImage.filename}`
    : null;

  const cvPath = studentCV
    ? `/uploads/Student/Resume/${studentCV.filename}`
    : null;

  const marksheet_sem_1 = student_marksheet_sem_1
    ? `/uploads/Student/Marksheets/${student_marksheet_sem_1.filename}`
    : null;

  const marksheet_sem_2 = student_marksheet_sem_2
    ? `/uploads/Student/Marksheets/${student_marksheet_sem_2.filename}`
    : null;

  const marksheet_sem_3 = student_marksheet_sem_3
    ? `/uploads/Student/Marksheets/${student_marksheet_sem_3.filename}`
    : null;
  const marksheet_sem_4 = student_marksheet_sem_4
    ? `/uploads/Student/Marksheets/${student_marksheet_sem_4.filename}`
    : null;
  const marksheet_sem_5 = student_marksheet_sem_5
    ? `/uploads/Student/Marksheets/${student_marksheet_sem_5.filename}`
    : null;
  const marksheet_sem_6 = student_marksheet_sem_6
    ? `/uploads/Student/Marksheets/${student_marksheet_sem_6.filename}`
    : null;

  // Create and save new student
  const student = new StudentRequest({
    student_sap_no,
    student_roll_no,
    campus,
    program,
    engineering_specialization,
    first_name,
    middle_name,
    last_name,
    name_of_student,
    fathers_name,
    mothers_name,
    date_of_birth,
    gender,
    local_address,
    local_address_city,
    local_address_state,
    permanent_address,
    permanent_address_postal_code,
    home_town,
    permanent_address_city,
    permanent_address_state,
    permanent_address_country,
    student_mobile_no,
    alternate_student_mobile_no,
    fathers_mobile_no,
    mothers_mobile_no,
    home_landline_no,
    home_mobile_no,
    student_email_id,
    student_alternate_email_id,
    fathers_email_id,
    mothers_email_id,
    has_pan_card,
    pan_card_no,
    aadhar_card_no,
    has_passport,
    passport_no,
    passport_expiry_date,
    tenth_standard_percentage,
    year_of_passing_tenth,
    board_of_passing_tenth,
    tenth_school,
    tenth_passing_state,
    tenth_passing_country,
    twelfth_standard_percentage,
    year_of_passing_twelfth,
    board_of_passing_twelfth,
    twelfth_school,
    twelfth_school_city,
    twelfth_passing_state,
    twelfth_passing_country,
    diploma_stream,
    diploma_passing_state,
    diploma_passing_country,
    diploma_college,
    diploma_board_of_passing,
    diploma_year_of_passing,
    first_year_first_semester_percentage_diploma,
    first_year_second_semester_percentage_diploma,
    first_year_percentage_diploma,
    second_year_third_semester_percentage_diploma,
    second_year_fourth_semester_percentage_diploma,
    second_year_percentage_diploma,
    third_year_fifth_semester_percentage_diploma,
    third_year_sixth_semester_percentage_diploma,
    third_year_percentage_diploma,
    fourth_year_seventh_semester_percentage_diploma,
    fourth_year_eighth_semester_percentage_diploma,
    fourth_year_percentage_diploma,
    final_percentage_diploma,
    aggregate_percentage_diploma,
    year_of_passing_diploma,
    gpa_first_semester_first_year,
    cgpa_first_semester_first_year,
    academic_year_clearing_sem1,
    gpa_second_semester_first_year,
    cgpa_second_semester_first_year,
    academic_year_clearing_sem2,
    gpa_third_semester_second_year,
    cgpa_third_semester_second_year,
    academic_year_clearing_sem3,
    gpa_fourth_semester_second_year,
    cgpa_fourth_semester_second_year,
    academic_year_clearing_sem4,
    gpa_fifth_semester_third_year,
    cgpa_fifth_semester_third_year,
    academic_year_clearing_sem5,
    gpa_sixth_semester_third_year,
    cgpa_sixth_semester_third_year,
    academic_year_clearing_sem6,
    total_dead_kts,
    total_live_kts,
    last_received_marksheet,
    has_year_drop_or_gap,
    year_drop_between_tenth_and_beginning_of_engineering,
    years_of_gap,
    reason_for_gap_or_drop_before_engineering,
    year_drop_between_engineering,
    years_of_gap_during_engineering,
    reason_for_gap_or_drop_during_engineering,
    cv_uploaded_in_nmims_format,
    documents_uploaded,
    student_profile_image: profileImagePath,
    student_cv: cvPath,
    // student_marksheet: marksheetPath,
    student_marksheet_sem_1: marksheet_sem_1,
    student_marksheet_sem_2: marksheet_sem_2,
    student_marksheet_sem_3: marksheet_sem_3,
    student_marksheet_sem_4: marksheet_sem_4,
    student_marksheet_sem_5: marksheet_sem_5,
    student_marksheet_sem_6: marksheet_sem_6,
  });

  await student.save();

  // Hash the password (SAP No) and save it to the Password collection
  const password = new Password({
    student_id: student._id,
    password: student_sap_no,
  });

  await password.save();

  // Return success response
  const createdStudent = await StudentRequest.findById(student._id).select(
    "-password"
  );

  if (!createdStudent) {
    throw new ApiError(
      500,
      "Something went wrong while registering the student"
    );
  }

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        createdStudent,
        "Student request received successfully"
      )
    );
});

const loginStudent = asyncHandler(async (req, res) => {
  const { student_sap_no, password } = req.body;

  // Validate required fields
  if (!student_sap_no || !password) {
    throw new ApiError(400, "SAP No and password are required");
  }

  // Find student by SAP No
  const student = await Student.findOne({ student_sap_no });
  if (!student) {
    throw new ApiError(404, "Student not found");
  }

  // Find password record for the student
  const passwordRecord = await Password.findOne({ student_id: student._id });
  if (!passwordRecord) {
    throw new ApiError(404, "Password record not found");
  }

  // Check if the provided password is correct
  const isMatch = await passwordRecord.isPasswordCorrect(password);
  if (!isMatch) {
    throw new ApiError(401, "Incorrect password");
  }

  // Generate access token and refresh token
  const accessToken = passwordRecord.generateAccessToken();
  const refreshToken = passwordRecord.generateRefreshToken();

  // Save the tokens to the password record
  passwordRecord.accessToken = accessToken;
  passwordRecord.refreshToken = refreshToken;

  const refreshTokenExpiry = ms(process.env.REFRESH_TOKEN_EXPIRY); // Duration in milliseconds
  const expiresIn = Math.floor(refreshTokenExpiry / 1000); // Convert milliseconds to seconds

  await passwordRecord.save();

  // Set cookies with the tokens
  // res.cookie("accessToken", accessToken, {
  //   secure: false,
  //   maxAge: ms(process.env.ACCESS_TOKEN_EXPIRY),
  //   sameSite: "Lax",
  // });

  // res.cookie("refreshToken", refreshToken, {
  //   secure: false,
  //   maxAge: ms(process.env.REFRESH_TOKEN_EXPIRY),
  //   sameSite: "Lax",
  // });

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: ms(process.env.ACCESS_TOKEN_EXPIRY),
    sameSite: "Lax",
  });

  // Optionally store the refreshToken in an HTTP-only cookie (not sent back to the user)
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Use true in production
    maxAge: ms(process.env.REFRESH_TOKEN_EXPIRY),
    sameSite: "Lax",
  });

  // Return success response with tokens and student profile image
  res.status(200).json(
    new ApiResponse(
      200,
      {
        accessToken,
        refreshToken,
        expiresIn,
        studentProfileImage: student.student_profile_image, // Include profile image URL
      },
      "Login successful"
    )
  );
});

const getAllStudentDetails = asyncHandler(async (req, res) => {
  try {
    const students = await Student.find();

    if (!students || students.length === 0) {
      throw new ApiError(404, "No students found");
    }

    res
      .status(200)
      .json(
        new ApiResponse(200, students, "Student details retrieved successfully")
      );
  } catch (error) {
    throw new ApiError(
      500,
      error.message || "An error occurred while retrieving student details"
    );
  }
});

const getStudentDetailsById = asyncHandler(async (req, res) => {
  try {
    const { student_sap_no } = req.params;
    if (!student_sap_no) {
      throw new ApiError(400, "SAP ID is required");
    }

    // Find the student with the givenstudent_sap_no
    const student = await Student.findOne({ student_sap_no });

    // Check if student is found
    if (!student) {
      throw new ApiError(404, "Student not found");
    }

    res
      .status(200)
      .json(
        new ApiResponse(200, student, "Student details retrieved successfully")
      );
  } catch (error) {
    throw new ApiError(
      500,
      error.message || "An error occurred while retrieving student details"
    );
  }
});

const getStudentDetailsByBranch = asyncHandler(async (req, res) => {
  try {
    const { engineering_specialization } = req.query; // Access query parameters

    if (!engineering_specialization) {
      throw new ApiError(400, "No Branch Provided");
    }

    // Find students with the given engineering_specialization
    const students = await Student.find({ engineering_specialization });

    // Check if students are found
    if (!students.length) {
      // Adjust to check for an array length
      throw new ApiError(404, "Students not found");
    }

    // Map students to only include the required fields
    const studentDetails = students.map((student) => ({
      name_of_student: student.name_of_student,
      student_roll_no: student.student_roll_no,
      engineering_specialization: student.engineering_specialization,
      student_sap_no: student.student_sap_no,
      student_email_id: student.student_email_id,
      student_mobile_no: student.student_mobile_no,
    }));

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          studentDetails,
          "Students details retrieved successfully"
        )
      );
  } catch (error) {
    throw new ApiError(
      500,
      error.message || "An error occurred while retrieving student details"
    );
  }
});

const updateStudentProfile = asyncHandler(async (req, res) => {
  const { student_email_id } = req.body;

  const studentProfileImage = req.files["student_profile_image"]
    ? req.files["student_profile_image"][0]
    : null;
  const studentCV = req.files["student_cv"] ? req.files["student_cv"][0] : null;
  const studentMarksheet = req.files["student_marksheet"]
    ? req.files["student_marksheet"][0]
    : null;

    

  // Generate file paths
  const profileImagePath = studentProfileImage
    ? `/uploads/Student/ProfileImage/${studentProfileImage.filename}`
    : null;
  const cvPath = studentCV
    ? `/uploads/Student/Resume/${studentCV.filename}`
    : null;
  const marksheetPath = studentMarksheet
    ? `/uploads/Student/Marksheets/${studentMarksheet.filename}`
    : null;

  // Get student ID from the request (set by middleware)
  const { student_id } = req.student;

  // Find the student by ID
  const student = await Student.findById(student_id);

  if (!student) {
    throw new ApiError(404, "Student not found");
  }

  // Update email if a new email is provided
  if (student_email_id && student_email_id !== student.student_email_id) {
    const emailExists = await Student.findOne({ student_email_id });
    if (emailExists) {
      throw new ApiError(409, "Email already in use by another student");
    }
    student.student_email_id = student_email_id.toLowerCase();
  }

  // Update profile image if a new image is uploaded
  if (profileImagePath) {
    student.student_profile_image = profileImagePath;
  }

  // Update CV if a new CV is uploaded
  if (cvPath) {
    student.student_cv = cvPath;
  }

  // Update marksheet if a new marksheet is uploaded
  if (marksheetPath) {
    student.student_marksheet = marksheetPath;
  }

  // Save the updated student profile
  await student.save();

  // Return the updated student profile in the response
  res
    .status(200)
    .json(new ApiResponse(200, student, "Profile updated successfully"));
});

const updateStudentPassword = asyncHandler(async (req, res) => {
  // Assuming student ID is extracted from JWT or session
  const studentId = req.student;

  // Extract passwords from request body
  const { currentPassword, newPassword } = req.body;

  console.log(currentPassword, newPassword);
  // Validate input fields
  if ([currentPassword, newPassword].some((field) => field?.trim() === "")) {
    throw new ApiError(
      400,
      "Both current password and new password are required"
    );
  }

  console.log(studentId);

  // Find password record for the student
  const passwordRecord = await Password.findOne({
    student_id: studentId.student_id,
  });

  if (!passwordRecord) {
    throw new ApiError(404, "Password record not found");
  }

  // Verify current password
  const isPasswordValid = await passwordRecord.isPasswordCorrect(
    currentPassword
  );

  if (!isPasswordValid) {
    throw new ApiError(401, "Incorrect current password");
  }

  // Update password
  passwordRecord.password = newPassword;

  // Save updated password record
  await passwordRecord.save();

  // Send response
  res
    .status(200)
    .json(new ApiResponse(200, null, "Password updated successfully"));
});

// const reGenerateAccessToken = asyncHandler(async (req, res) => {
//   // Access cookies using req.cookies
//   const { refreshToken } = req.cookies;

//   if (!refreshToken) {
//     throw new ApiError(400, "Refresh token is required");
//   }

//   // Verify refresh token

//   jwt.verify(
//     refreshToken,
//     process.env.REFRESH_TOKEN_SECRET,
//     async (err, decoded) => {
//       if (err) {
//         throw new ApiError(401, "Invalid refresh token");
//       }

//       // Find password record with the refresh token
//       const passwordRecord = await Password.findOne({
//         _id: decoded._id,
//         refreshToken,
//       });

//       if (!passwordRecord) {
//         throw new ApiError(401, "Invalid refresh token");
//       }

//       const student = await Student.findById(passwordRecord.student_id);

//       if (!student) {
//         throw new ApiError(404, "Student not found");
//       }

//       const accessToken = passwordRecord.generateAccessToken();

//       res.cookie("accessToken", accessToken, {
//         secure: false,
//         maxAge: ms(process.env.ACCESS_TOKEN_EXPIRY),
//         sameSite: "Lax",
//       });

//       res
//         .status(200)
//         .json(
//           new ApiResponse(
//             200,
//             { accessToken },
//             "Access token regenerated successfully"
//           )
//         );
//     }
//   );
// });

const reGenerateAccessToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "Refresh token is required"));
  }

  try {
    // Verify refresh token (this will check the expiration as well)
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    const student = await Password.findOne({ _id: decoded._id, refreshToken });

    if (!student) {
      await Password.updateOne(
        { refreshToken },
        { $unset: { refreshToken: 1 } }
      );
      throw new ApiError(401, "Invalid refresh token");
    }

    // Generate new access token
    const accessToken = student.generateAccessToken();

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: parseInt(process.env.ACCESS_TOKEN_EXPIRY) * 1000, // Convert seconds to milliseconds
    });

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { accessToken },
          "Access token regenerated successfully"
        )
      );
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      // When token is expired, we won't get the decoded object, so remove by refreshToken directly
      await Password.updateOne(
        { refreshToken },
        { $unset: { refreshToken: 1 } }
      );
      return res
        .status(401)
        .json(new ApiResponse(401, null, "Refresh token expired"));
    }

    // Handle other errors (e.g., invalid token)
    return res
      .status(401)
      .json(new ApiResponse(401, null, "Invalid refresh token"));
  }
});

// -------------------------------------------------------
const verifyRefreshToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "Refresh token is required"));
  }

  try {
    // Verify the refresh token
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    const student = await Password.findOne({ _id: decoded._id, refreshToken });

    if (!student) {
      await Password.updateOne(
        { _id: decoded._id },
        { $unset: { refreshToken: 1 } }
      );
      return res
        .status(401)
        .json(new ApiResponse(401, null, "Invalid refresh token"));
    }

    // Calculate remaining time until the token expires
    const currentTime = Date.now(); // Current time in milliseconds
    const expiryTime = decoded.exp * 1000; // Convert expiry time from seconds to milliseconds
    const remainingTime = expiryTime - currentTime;

    if (remainingTime <= 0) {
      throw new Error("TokenExpiredError");
    }

    const hours = Math.floor(remainingTime / (1000 * 60 * 60));
    const minutes = Math.floor(
      (remainingTime % (1000 * 60 * 60)) / (1000 * 60)
    );
    const formattedRemainingTime = `${String(hours).padStart(2, "0")}:${String(
      minutes
    ).padStart(2, "0")}`;

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { message: "Token Valid", remainingTime: formattedRemainingTime },
          "Refresh token is valid"
        )
      );
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      // When the refresh token is expired, remove it from the database
      await Password.updateOne(
        { refreshToken },
        { $unset: { refreshToken: 1 } }
      );
      return res
        .status(401)
        .json(new ApiResponse(401, null, "Refresh token expired"));
    }

    // Handle other errors
    return res
      .status(401)
      .json(new ApiResponse(401, null, "Invalid refresh token"));
  }
});

const getProfile = asyncHandler(async (req, res) => {
  // Get student from req.student (set by authentication middleware)
  const { student_id } = req.student;

  const student = await Student.findById({ _id: student_id });

  if (!student) {
    throw new ApiError(404, "Student not found");
  }

  // Extract specific fields from the student object
  const {
    name_of_student,
    student_mobile_no,
    student_email_id,
    student_alternate_email_id,
    student_sap_no,
    cv_uploaded_in_nmims_format,
    student_profile_image,
    student_marksheet,
    student_cv,
  } = student;

  // Return the extracted fields in the response
  res.status(200).json(
    new ApiResponse(
      200,
      {
        name_of_student,
        student_mobile_no,
        student_email_id,
        student_alternate_email_id,
        student_sap_no,
        cv_uploaded_in_nmims_format,
        student_profile_image,
        student_marksheet,
        student_cv,
      },
      "Profile fetched successfully"
    )
  );
});

const getProfileImage = asyncHandler(async (req, res) => {
  const { student_id } = req.student;

  const student = await Student.findById({ _id: student_id });

  if (!student) {
    throw new ApiError(404, "Student not found");
  }

  // Extract specific fields from the student object
  const { student_profile_image } = student;

  // Return the extracted fields in the response
  res.status(200).json(
    new ApiResponse(
      200,
      {
        student_profile_image,
      },
      "Profile Image fetched successfully"
    )
  );
});

// const uploadStudentDataViaExcel = asyncHandler(async (req, res) => {
//   const { date } = req.body;

//   console.log(date);

//   if (!date) {
//     throw new ApiError(400, "Date is required");
//   }

//   const file = req.file;
//   if (!file) {
//     throw new ApiError(400, "Excel file is required");
//   }

//   console.log(file);

//   // Parse the Excel file
//   const workbook = XLSX.readFile(file.path);
//   const sheetNames = workbook.SheetNames;
//   const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNames[0]]);

//   // Iterate through each row in the Excel file
//   for (const row of data) {
//     const {
//       student_sap_no,
//       student_roll_no,
//       campus,
//       program,
//       engineering_specialization,
//       first_name,
//       middle_name,
//       last_name,
//       name_of_student,
//       fathers_name,
//       mothers_name,
//       date_of_birth,
//       gender,
//       local_address,
//       local_address_city,
//       local_address_state,
//       permanent_address,
//       permanent_address_postal_code,
//       home_town,
//       permanent_address_city,
//       permanent_address_state,
//       permanent_address_country,
//       student_mobile_no,
//       alternate_student_mobile_no,
//       fathers_mobile_no,
//       mothers_mobile_no,
//       home_landline_no,
//       home_mobile_no,
//       student_email_id,
//       student_alternate_email_id,
//       fathers_email_id,
//       mothers_email_id,
//       has_pan_card,
//       pan_card_no,
//       aadhar_card_no,
//       has_passport,
//       passport_no,
//       passport_expiry_date,
//       tenth_standard_percentage,
//       year_of_passing_tenth,
//       board_of_passing_tenth,
//       tenth_school,
//       tenth_passing_state,
//       tenth_passing_country,
//       twelfth_standard_percentage,
//       year_of_passing_twelfth,
//       board_of_passing_twelfth,
//       twelfth_school,
//       twelfth_school_city,
//       twelfth_passing_state,
//       twelfth_passing_country,
//       diploma_stream,
//       diploma_passing_state,
//       diploma_passing_country,
//       diploma_college,
//       diploma_board_of_passing,
//       diploma_year_of_passing,
//       first_year_first_semester_percentage_diploma,
//       first_year_second_semester_percentage_diploma,
//       first_year_percentage_diploma,
//       second_year_third_semester_percentage_diploma,
//       second_year_fourth_semester_percentage_diploma,
//       second_year_percentage_diploma,
//       third_year_fifth_semester_percentage_diploma,
//       third_year_sixth_semester_percentage_diploma,
//       third_year_percentage_diploma,
//       fourth_year_seventh_semester_percentage_diploma,
//       fourth_year_eighth_semester_percentage_diploma,
//       fourth_year_percentage_diploma,
//       final_percentage_diploma,
//       aggregate_percentage_diploma,
//       year_of_passing_diploma,
//       gpa_first_semester_first_year,
//       cgpa_first_semester_first_year,
//       academic_year_clearing_sem1,
//       gpa_second_semester_first_year,
//       cgpa_second_semester_first_year,
//       academic_year_clearing_sem2,
//       gpa_third_semester_second_year,
//       cgpa_third_semester_second_year,
//       academic_year_clearing_sem3,
//       gpa_fourth_semester_second_year,
//       cgpa_fourth_semester_second_year,
//       academic_year_clearing_sem4,
//       gpa_fifth_semester_third_year,
//       cgpa_fifth_semester_third_year,
//       academic_year_clearing_sem5,
//       gpa_sixth_semester_third_year,
//       cgpa_sixth_semester_third_year,
//       academic_year_clearing_sem6,
//       total_dead_kts,
//       total_live_kts,
//       last_received_marksheet,
//       has_year_drop_or_gap,
//       year_drop_between_tenth_and_beginning_of_engineering,
//       years_of_gap,
//       reason_for_gap_or_drop_before_engineering,
//       year_drop_between_engineering,
//       years_of_gap_during_engineering,
//       reason_for_gap_or_drop_during_engineering,
//       cv_uploaded_in_nmims_format,
//       documents_uploaded,
//     } = row;

//     console.log(row);

//     // Check if student_sap_no already exists
//     const existingStudent = await Student.findOne({ student_sap_no });

//     console.log(existingStudent);

//     if (existingStudent) {
//       console.log(
//         `Student with SAP no. ${student_sap_no} already exists, skipping...`
//       );
//       continue; // Skip this entry if the SAP number already exists
//     }

//     // Create a new student entry
//     const newStudent = new Student({
//       student_sap_no,
//       student_roll_no,
//       campus,
//       program,
//       engineering_specialization,
//       first_name,
//       middle_name,
//       last_name,
//       name_of_student,
//       fathers_name,
//       mothers_name,
//       date_of_birth,
//       gender,
//       local_address,
//       local_address_city,
//       local_address_state,
//       permanent_address,
//       permanent_address_postal_code,
//       home_town,
//       permanent_address_city,
//       permanent_address_state,
//       permanent_address_country,
//       student_mobile_no,
//       alternate_student_mobile_no,
//       fathers_mobile_no,
//       mothers_mobile_no,
//       home_landline_no,
//       home_mobile_no,
//       student_email_id,
//       student_alternate_email_id,
//       fathers_email_id,
//       mothers_email_id,
//       has_pan_card,
//       pan_card_no,
//       aadhar_card_no,
//       has_passport,
//       passport_no,
//       passport_expiry_date,
//       tenth_standard_percentage,
//       year_of_passing_tenth,
//       board_of_passing_tenth,
//       tenth_school,
//       tenth_passing_state,
//       tenth_passing_country,
//       twelfth_standard_percentage,
//       year_of_passing_twelfth,
//       board_of_passing_twelfth,
//       twelfth_school,
//       twelfth_school_city,
//       twelfth_passing_state,
//       twelfth_passing_country,
//       diploma_stream,
//       diploma_passing_state,
//       diploma_passing_country,
//       diploma_college,
//       diploma_board_of_passing,
//       diploma_year_of_passing,
//       first_year_first_semester_percentage_diploma,
//       first_year_second_semester_percentage_diploma,
//       first_year_percentage_diploma,
//       second_year_third_semester_percentage_diploma,
//       second_year_fourth_semester_percentage_diploma,
//       second_year_percentage_diploma,
//       third_year_fifth_semester_percentage_diploma,
//       third_year_sixth_semester_percentage_diploma,
//       third_year_percentage_diploma,
//       fourth_year_seventh_semester_percentage_diploma,
//       fourth_year_eighth_semester_percentage_diploma,
//       fourth_year_percentage_diploma,
//       final_percentage_diploma,
//       aggregate_percentage_diploma,
//       year_of_passing_diploma,
//       gpa_first_semester_first_year,
//       cgpa_first_semester_first_year,
//       academic_year_clearing_sem1,
//       gpa_second_semester_first_year,
//       cgpa_second_semester_first_year,
//       academic_year_clearing_sem2,
//       gpa_third_semester_second_year,
//       cgpa_third_semester_second_year,
//       academic_year_clearing_sem3,
//       gpa_fourth_semester_second_year,
//       cgpa_fourth_semester_second_year,
//       academic_year_clearing_sem4,
//       gpa_fifth_semester_third_year,
//       cgpa_fifth_semester_third_year,
//       academic_year_clearing_sem5,
//       gpa_sixth_semester_third_year,
//       cgpa_sixth_semester_third_year,
//       academic_year_clearing_sem6,
//       total_dead_kts,
//       total_live_kts,
//       last_received_marksheet,
//       has_year_drop_or_gap,
//       year_drop_between_tenth_and_beginning_of_engineering,
//       years_of_gap,
//       reason_for_gap_or_drop_before_engineering,
//       year_drop_between_engineering,
//       years_of_gap_during_engineering,
//       reason_for_gap_or_drop_during_engineering,
//       cv_uploaded_in_nmims_format,
//       documents_uploaded,
//     });

//     await newStudent.save();
//   }

//   res
//     .status(200)
//     .json(new ApiResponse(200, null, "Student data processed successfully"));
// });

const uploadStudentDataViaExcel = asyncHandler(async (req, res) => {
  const { date } = req.body;

  console.log(date);

  if (!date) {
    throw new ApiError(400, "Date is required");
  }

  const file = req.file;
  if (!file) {
    throw new ApiError(400, "Excel file is required");
  }

  // Parse the Excel file
  const workbook = XLSX.readFile(file.path);
  const sheetNames = workbook.SheetNames;
  const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNames[0]]);

  console.log(file);

  const excelFilePath = file ? `/uploads/Student/Excel/${file.filename}` : null;

  const StudentExcelFile = new StudentExcel({
    date: date,
    filePath: excelFilePath,
  });

  await StudentExcelFile.save();

  console.log(excelFilePath);

  // Iterate through each row in the Excel file
  for (const row of data) {
    const {
      student_sap_no,
      student_roll_no,
      campus,
      program,
      engineering_specialization,
      first_name,
      middle_name,
      last_name,
      name_of_student,
      fathers_name,
      mothers_name,
      date_of_birth,
      gender,
      local_address,
      local_address_city,
      local_address_state,
      permanent_address,
      permanent_address_postal_code,
      home_town,
      permanent_address_city,
      permanent_address_state,
      permanent_address_country,
      student_mobile_no,
      alternate_student_mobile_no,
      fathers_mobile_no,
      mothers_mobile_no,
      home_landline_no,
      home_mobile_no,
      student_email_id,
      student_alternate_email_id,
      fathers_email_id,
      mothers_email_id,
      has_pan_card,
      pan_card_no,
      aadhar_card_no,
      has_passport,
      passport_no,
      passport_expiry_date,
      tenth_standard_percentage,
      year_of_passing_tenth,
      board_of_passing_tenth,
      tenth_school,
      tenth_passing_state,
      tenth_passing_country,
      twelfth_standard_percentage,
      year_of_passing_twelfth,
      board_of_passing_twelfth,
      twelfth_school,
      twelfth_school_city,
      twelfth_passing_state,
      twelfth_passing_country,
      diploma_stream,
      diploma_passing_state,
      diploma_passing_country,
      diploma_college,
      diploma_board_of_passing,
      diploma_year_of_passing,
      first_year_first_semester_percentage_diploma,
      first_year_second_semester_percentage_diploma,
      first_year_percentage_diploma,
      second_year_third_semester_percentage_diploma,
      second_year_fourth_semester_percentage_diploma,
      second_year_percentage_diploma,
      third_year_fifth_semester_percentage_diploma,
      third_year_sixth_semester_percentage_diploma,
      third_year_percentage_diploma,
      fourth_year_seventh_semester_percentage_diploma,
      fourth_year_eighth_semester_percentage_diploma,
      fourth_year_percentage_diploma,
      final_percentage_diploma,
      aggregate_percentage_diploma,
      year_of_passing_diploma,
      gpa_first_semester_first_year,
      cgpa_first_semester_first_year,
      academic_year_clearing_sem1,
      gpa_second_semester_first_year,
      cgpa_second_semester_first_year,
      academic_year_clearing_sem2,
      gpa_third_semester_second_year,
      cgpa_third_semester_second_year,
      academic_year_clearing_sem3,
      gpa_fourth_semester_second_year,
      cgpa_fourth_semester_second_year,
      academic_year_clearing_sem4,
      gpa_fifth_semester_third_year,
      cgpa_fifth_semester_third_year,
      academic_year_clearing_sem5,
      gpa_sixth_semester_third_year,
      cgpa_sixth_semester_third_year,
      academic_year_clearing_sem6,
      total_dead_kts,
      total_live_kts,
      last_received_marksheet,
      has_year_drop_or_gap,
      year_drop_between_tenth_and_beginning_of_engineering,
      years_of_gap,
      reason_for_gap_or_drop_before_engineering,
      year_drop_between_engineering,
      years_of_gap_during_engineering,
      reason_for_gap_or_drop_during_engineering,
      cv_uploaded_in_nmims_format,
      documents_uploaded,
    } = row;

    // Check if student_sap_no already exists
    const existingStudent = await Student.findOne({ student_sap_no });

    console.log(existingStudent);

    if (existingStudent) {
      console.log(
        `Student with SAP no. ${student_sap_no} already exists, skipping...`
      );
      continue; // Skip this entry if the SAP number already exists
    }

    // Create a new student entry
    const newStudent = new Student({
      student_sap_no,
      student_roll_no,
      campus,
      program,
      engineering_specialization,
      first_name,
      middle_name,
      last_name,
      name_of_student,
      fathers_name,
      mothers_name,
      date_of_birth,
      gender,
      local_address,
      local_address_city,
      local_address_state,
      permanent_address,
      permanent_address_postal_code,
      home_town,
      permanent_address_city,
      permanent_address_state,
      permanent_address_country,
      student_mobile_no,
      alternate_student_mobile_no,
      fathers_mobile_no,
      mothers_mobile_no,
      home_landline_no,
      home_mobile_no,
      student_email_id,
      student_alternate_email_id,
      fathers_email_id,
      mothers_email_id,
      has_pan_card,
      pan_card_no,
      aadhar_card_no,
      has_passport,
      passport_no,
      passport_expiry_date,
      tenth_standard_percentage,
      year_of_passing_tenth,
      board_of_passing_tenth,
      tenth_school,
      tenth_passing_state,
      tenth_passing_country,
      twelfth_standard_percentage,
      year_of_passing_twelfth,
      board_of_passing_twelfth,
      twelfth_school,
      twelfth_school_city,
      twelfth_passing_state,
      twelfth_passing_country,
      diploma_stream,
      diploma_passing_state,
      diploma_passing_country,
      diploma_college,
      diploma_board_of_passing,
      diploma_year_of_passing,
      first_year_first_semester_percentage_diploma,
      first_year_second_semester_percentage_diploma,
      first_year_percentage_diploma,
      second_year_third_semester_percentage_diploma,
      second_year_fourth_semester_percentage_diploma,
      second_year_percentage_diploma,
      third_year_fifth_semester_percentage_diploma,
      third_year_sixth_semester_percentage_diploma,
      third_year_percentage_diploma,
      fourth_year_seventh_semester_percentage_diploma,
      fourth_year_eighth_semester_percentage_diploma,
      fourth_year_percentage_diploma,
      final_percentage_diploma,
      aggregate_percentage_diploma,
      year_of_passing_diploma,
      gpa_first_semester_first_year,
      cgpa_first_semester_first_year,
      academic_year_clearing_sem1,
      gpa_second_semester_first_year,
      cgpa_second_semester_first_year,
      academic_year_clearing_sem2,
      gpa_third_semester_second_year,
      cgpa_third_semester_second_year,
      academic_year_clearing_sem3,
      gpa_fourth_semester_second_year,
      cgpa_fourth_semester_second_year,
      academic_year_clearing_sem4,
      gpa_fifth_semester_third_year,
      cgpa_fifth_semester_third_year,
      academic_year_clearing_sem5,
      gpa_sixth_semester_third_year,
      cgpa_sixth_semester_third_year,
      academic_year_clearing_sem6,
      total_dead_kts,
      total_live_kts,
      last_received_marksheet,
      has_year_drop_or_gap,
      year_drop_between_tenth_and_beginning_of_engineering,
      years_of_gap,
      reason_for_gap_or_drop_before_engineering,
      year_drop_between_engineering,
      years_of_gap_during_engineering,
      reason_for_gap_or_drop_during_engineering,
      cv_uploaded_in_nmims_format,
      documents_uploaded,
    });

    await newStudent.save();

    // Create a corresponding password entry for the student
    const newPassword = new Password({
      student_id: newStudent._id,
      password: student_sap_no, // Using student_sap_no as the initial password
    });

    await newPassword.save();
  }

  res
    .status(200)
    .json(new ApiResponse(200, null, "Student data processed successfully"));
});

const deleteStudent = asyncHandler(async (req, res) => {
  const { student_sap_no } = req.body;

  // Validate that student_sap_no is provided
  if (!student_sap_no) {
    throw new ApiError(400, "Student SAP number is required");
  }

  // Find and delete the student record
  const student = await Student.findOneAndDelete({ student_sap_no });

  if (!student) {
    throw new ApiError(404, "Student not found");
  }

  // Optionally, delete associated records if necessary
  await StudentRequest.deleteMany({ student_sap_no });
  await Password.deleteOne({ student_sap_no });

  res
    .status(200)
    .json(new ApiResponse(200, null, "Student record deleted successfully"));
});

const getAllExcels = asyncHandler(async (req, res) => {
  try {
    const studentExcels = await StudentExcel.find();

    console.log(studentExcels);
    res
      .status(200)
      .json(new ApiResponse(200, studentExcels, "Fetched data successfully!!"));
  } catch (error) {
    res
      .status(500)
      .json(
        new ApiResponse(500, error.message, "Error retrieving Excel files")
      );
  }
});

export {
  registerStudent,
  loginStudent,
  getAllStudentDetails,
  getStudentDetailsById,
  updateStudentProfile,
  updateStudentPassword,
  getProfile,
  getStudentDetailsByBranch,
  getProfileImage,
  verifyRefreshToken,
  reGenerateAccessToken,
  uploadStudentDataViaExcel,
  deleteStudent,
  getAllExcels,
};
