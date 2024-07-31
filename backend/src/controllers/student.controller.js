import Student from "../models/student.model.js";
import Password from "../models/password.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import bcrypt from "bcrypt";

// Register Student
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

  // Validate required fields
  if (
    [student_sap_no, student_roll_no, first_name, last_name].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(
      400,
      "Student SAP No, Roll No, First Name, and Last Name are required"
    );
  }

  // Check if the student already exists by SAP No
  const existingStudent = await Student.findOne({ student_sap_no });
  if (existingStudent) {
    throw new ApiError(409, "Student with this SAP No already exists");
  }

  // Create and save new student
  const student = new Student({
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

  await student.save();

  // Hash the SAP No and save it to the Password collection
  const hashedPassword = await bcrypt.hash(student_sap_no, 10);

  const password = new Password({
    student_id: student._id,
    password: hashedPassword,
  });

  await password.save();

  // Return success response
  const createdStudent = await Student.findById(student._id).select(
    "-password"
  ); // Adjust field exclusion as needed

  if (!createdStudent) {
    throw new ApiError(
      500,
      "Something went wrong while registering the student"
    );
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, createdStudent, "Student registered successfully")
    );
});

// Login Student
const loginStudent = asyncHandler(async (req, res) => {
  const { student_sap_no, password } = req.body;

  // Validate required fields
  if (!student_sap_no || !password) {
    throw new ApiError(400, "SAP ID and Password are required");
  }

  // Check if the student exists
  const student = await Student.findOne({ student_sap_no });
  if (!student) {
    throw new ApiError(404, "Student not found");
  }

  // Retrieve hashed password from Password collection
  const passwordEntry = await Password.findOne({ student_id: student._id });

  if (!passwordEntry) {
    throw new ApiError(500, "Password entry not found");
  }

  // Compare the provided password with the hashed password
  const isMatch = await bcrypt.compare(password, passwordEntry.password);
  if (!isMatch) {
    throw new ApiError(401, "Invalid password");
  }

  res.status(200).json(new ApiResponse(200, student, "Login successful"));
});



export { registerStudent, loginStudent };
