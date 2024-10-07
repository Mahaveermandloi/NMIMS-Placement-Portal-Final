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
import { sendEmail } from "../utils/SendEmail.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";

const updateBasicDetails = asyncHandler(async (req, res) => {
  // Extract all fields explicitly from req.body
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
  } = req.body;

  console.log(req.body);

  if (!student_sap_no) {
    throw new ApiError(400, "Student SAP number is required");
  }

  const updateData = {
    ...(student_roll_no && { student_roll_no }),
    ...(campus && { campus }),
    ...(program && { program }),
    ...(engineering_specialization && { engineering_specialization }),
    ...(first_name && { first_name }),
    ...(middle_name && { middle_name }),
    ...(last_name && { last_name }),
    ...(name_of_student && { name_of_student }),
    ...(fathers_name && { fathers_name }),
    ...(mothers_name && { mothers_name }),
    ...(date_of_birth && { date_of_birth }),
    ...(gender && { gender }),
    ...(local_address && { local_address }),
    ...(local_address_city && { local_address_city }),
    ...(local_address_state && { local_address_state }),
    ...(permanent_address && { permanent_address }),
    ...(permanent_address_postal_code && { permanent_address_postal_code }),
    ...(home_town && { home_town }),
    ...(permanent_address_city && { permanent_address_city }),
    ...(permanent_address_state && { permanent_address_state }),
    ...(permanent_address_country && { permanent_address_country }),
    ...(student_mobile_no && { student_mobile_no }),
    ...(alternate_student_mobile_no && { alternate_student_mobile_no }),
    ...(fathers_mobile_no && { fathers_mobile_no }),
    ...(mothers_mobile_no && { mothers_mobile_no }),
    ...(home_landline_no && { home_landline_no }),
    ...(home_mobile_no && { home_mobile_no }),
    ...(student_email_id && { student_email_id }),
    ...(student_alternate_email_id && { student_alternate_email_id }),
    ...(fathers_email_id && { fathers_email_id }),
    ...(mothers_email_id && { mothers_email_id }),
    ...(has_pan_card && { has_pan_card }),
    ...(pan_card_no && { pan_card_no }),
    ...(aadhar_card_no && { aadhar_card_no }),
    ...(has_passport && { has_passport }),
    ...(passport_no && { passport_no }),
    ...(passport_expiry_date && { passport_expiry_date }),
  };

  if (Object.keys(updateData).length === 0) {
    throw new ApiError(400, "No data provided to update");
  }

  const student = await Student.findOneAndUpdate(
    { student_sap_no },
    { $set: updateData },
    { new: true, runValidators: true }
  );

  if (!student) {
    throw new ApiError(
      404,
      `No student found with SAP number: ${student_sap_no}`
    );
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, student, "Student details updated successfully")
    );
});

const updateClassTenthDetails = asyncHandler(async (req, res) => {
  const {
    student_sap_no,
    tenth_standard_percentage,
    year_of_passing_tenth,
    board_of_passing_tenth,
    tenth_school,
    tenth_passing_state,
    tenth_passing_country,
  } = req.body;

  if (!student_sap_no) {
    throw new ApiError(400, "Student SAP number is required");
  }

  const file = req.file;

  console.log(req.file);
  const cloudinaryResult = await uploadOnCloudinary(file.path);

  const asset_id = cloudinaryResult.asset_id;

  const tenth_marksheetPath = `https://res-console.cloudinary.com/dlsl6hruh/media_explorer_thumbnails/${asset_id}/download`;

  console.log(tenth_marksheetPath);

  const updateData = {
    ...(tenth_standard_percentage !== undefined && {
      tenth_standard_percentage,
    }),
    ...(year_of_passing_tenth !== undefined && { year_of_passing_tenth }),
    ...(board_of_passing_tenth && { board_of_passing_tenth }),
    ...(tenth_school && { tenth_school }),
    ...(tenth_passing_state && { tenth_passing_state }),
    ...(tenth_passing_country && { tenth_passing_country }),
    ...(tenth_marksheetPath && { tenth_marksheet: tenth_marksheetPath }),
  };

  // Check if any data is provided to update
  if (Object.keys(updateData).length === 0) {
    throw new ApiError(400, "No data provided to update");
  }

  // Find and update the student record
  const student = await Student.findOneAndUpdate(
    { student_sap_no },
    { $set: updateData },
    { new: true, runValidators: true }
  );

  // Check if the student was found and updated
  if (!student) {
    throw new ApiError(
      404,
      `No student found with SAP number: ${student_sap_no}`
    );
  }

  // Return success response
  return res
    .status(200)
    .json(
      new ApiResponse(200, student, "Tenth class details updated successfully")
    );
});

const updateClassTweflthDetails = asyncHandler(async (req, res) => {
  // Extract all relevant fields for class twelfth details from req.body
  const {
    student_sap_no,
    twelfth_standard_percentage,
    year_of_passing_twelfth,
    board_of_passing_twelfth,
    twelfth_school,
    twelfth_school_city,
    twelfth_passing_state,
    twelfth_passing_country,
  } = req.body;

  // Ensure that student SAP number is provided
  if (!student_sap_no) {
    throw new ApiError(400, "Student SAP number is required");
  }

  const file = req.file;

  console.log(req.file);

  const cloudinaryResult = await uploadOnCloudinary(file.path);

  console.log(cloudinaryResult);
  const asset_id = cloudinaryResult.asset_id;

  const twelfth_marksheetPath = `https://res-console.cloudinary.com/dlsl6hruh/media_explorer_thumbnails/${asset_id}/download`;

  const updateData = {
    ...(twelfth_standard_percentage !== undefined && {
      twelfth_standard_percentage,
    }),
    ...(year_of_passing_twelfth !== undefined && { year_of_passing_twelfth }),
    ...(board_of_passing_twelfth && { board_of_passing_twelfth }),
    ...(twelfth_school && { twelfth_school }),
    ...(twelfth_school_city && { twelfth_school_city }),
    ...(twelfth_passing_state && { twelfth_passing_state }),
    ...(twelfth_passing_country && { twelfth_passing_country }),
    ...(twelfth_marksheetPath && { twelfth_marksheet: twelfth_marksheetPath }),
  };

  if (Object.keys(updateData).length === 0) {
    throw new ApiError(400, "No data provided to update");
  }

  const student = await Student.findOneAndUpdate(
    { student_sap_no },
    { $set: updateData },
    { new: true, runValidators: true }
  );

  if (!student) {
    throw new ApiError(
      404,
      `No student found with SAP number: ${student_sap_no}`
    );
  }

  // Return success response
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        student,
        "Twelfth class details updated successfully"
      )
    );
});

const updateDiplomaDetails = asyncHandler(async (req, res) => {
  // Extract all relevant fields for diploma details from req.body
  const {
    student_sap_no,
    diploma_percentage,
    year_of_passing_diploma,
    board_of_passing_diploma,
    diploma_school,
    diploma_school_city,
    diploma_passing_state,
    diploma_passing_country,
  } = req.body;

  // Ensure that student SAP number is provided
  if (!student_sap_no) {
    throw new ApiError(400, "Student SAP number is required");
  }

  const file = req.file;

  console.log(req.file);

  const cloudinaryResult = await uploadOnCloudinary(file.path);

  console.log(cloudinaryResult);

  const asset_id = cloudinaryResult.asset_id;
  const diploma_marksheetPath = `https://res-console.cloudinary.com/dlsl6hruh/media_explorer_thumbnails/${asset_id}/download`;

  // Prepare update data object for diploma details
  const updateData = {
    ...(diploma_percentage !== undefined && { diploma_percentage }),
    ...(year_of_passing_diploma !== undefined && { year_of_passing_diploma }),
    ...(board_of_passing_diploma && { board_of_passing_diploma }),
    ...(diploma_school && { diploma_school }),
    ...(diploma_school_city && { diploma_school_city }),
    ...(diploma_passing_state && { diploma_passing_state }),
    ...(diploma_passing_country && { diploma_passing_country }),
    ...(diploma_marksheetPath && { diploma_marksheet: diploma_marksheetPath }),
  };

  console.log(updateData);

  // Check if any data is provided to update
  if (Object.keys(updateData).length === 0) {
    throw new ApiError(400, "No data provided to update");
  }

  // Find and update the student record for diploma details
  const student = await Student.findOneAndUpdate(
    { student_sap_no },
    { $set: updateData },
    { new: true, runValidators: true }
  );

  // Check if the student was found and updated
  if (!student) {
    throw new ApiError(
      404,
      `No student found with SAP number: ${student_sap_no}`
    );
  }

  // Return success response
  return res
    .status(200)
    .json(
      new ApiResponse(200, student, "Diploma details updated successfully")
    );
});

const updateCollegeDetails = asyncHandler(async (req, res) => {
  // Extract fields for college details from req.body
  const {
    student_sap_no,
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

  // Ensure that student SAP number is provided
  if (!student_sap_no) {
    throw new ApiError(400, "Student SAP number is required");
  }

  // Upload files to Cloudinary
  // const student_cv = await uploadOnCloudinary(req.files.student_cv[0].path);
  // const student_marksheet_sem_1 = await uploadOnCloudinary(
  //   req.files.student_marksheet[0].path
  // );
  // const student_marksheet_sem_2 = await uploadOnCloudinary(
  //   req.files.student_marksheet[1].path
  // );
  // const student_marksheet_sem_3 = await uploadOnCloudinary(
  //   req.files.student_marksheet[2].path
  // );
  // const student_marksheet_sem_4 = await uploadOnCloudinary(
  //   req.files.student_marksheet[3].path
  // );
  // const student_marksheet_sem_5 = await uploadOnCloudinary(
  //   req.files.student_marksheet[4].path
  // );
  // const student_marksheet_sem_6 = await uploadOnCloudinary(
  //   req.files.student_marksheet[5].path
  // );

  // Upload CV
  const student_cv_result = await uploadOnCloudinary(
    req.files.student_cv[0].path
  );
  const student_cv_url = `https://res-console.cloudinary.com/dlsl6hruh/media_explorer_thumbnails/${student_cv_result.asset_id}/download`;

  // Upload each semester marksheet separately
  const student_marksheet_sem_1_result = await uploadOnCloudinary(
    req.files.student_marksheet[0].path
  );
  const student_marksheet_sem_1_url = `https://res-console.cloudinary.com/dlsl6hruh/media_explorer_thumbnails/${student_marksheet_sem_1_result.asset_id}/download`;

  const student_marksheet_sem_2_result = await uploadOnCloudinary(
    req.files.student_marksheet[1].path
  );
  const student_marksheet_sem_2_url = `https://res-console.cloudinary.com/dlsl6hruh/media_explorer_thumbnails/${student_marksheet_sem_2_result.asset_id}/download`;

  const student_marksheet_sem_3_result = await uploadOnCloudinary(
    req.files.student_marksheet[2].path
  );
  const student_marksheet_sem_3_url = `https://res-console.cloudinary.com/dlsl6hruh/media_explorer_thumbnails/${student_marksheet_sem_3_result.asset_id}/download`;

  const student_marksheet_sem_4_result = await uploadOnCloudinary(
    req.files.student_marksheet[3].path
  );
  const student_marksheet_sem_4_url = `https://res-console.cloudinary.com/dlsl6hruh/media_explorer_thumbnails/${student_marksheet_sem_4_result.asset_id}/download`;

  const student_marksheet_sem_5_result = await uploadOnCloudinary(
    req.files.student_marksheet[4].path
  );
  const student_marksheet_sem_5_url = `https://res-console.cloudinary.com/dlsl6hruh/media_explorer_thumbnails/${student_marksheet_sem_5_result.asset_id}/download`;

  const student_marksheet_sem_6_result = await uploadOnCloudinary(
    req.files.student_marksheet[5].path
  );
  const student_marksheet_sem_6_url = `https://res-console.cloudinary.com/dlsl6hruh/media_explorer_thumbnails/${student_marksheet_sem_6_result.asset_id}/download`;

  // Now you have all the URLs stored separately

  // Prepare the data object for updating college details
  const updateData = {
    ...(gpa_first_semester_first_year !== undefined && {
      gpa_first_semester_first_year,
    }),
    ...(cgpa_first_semester_first_year !== undefined && {
      cgpa_first_semester_first_year,
    }),
    ...(academic_year_clearing_sem1 !== undefined && {
      academic_year_clearing_sem1,
    }),
    ...(gpa_second_semester_first_year !== undefined && {
      gpa_second_semester_first_year,
    }),
    ...(cgpa_second_semester_first_year !== undefined && {
      cgpa_second_semester_first_year,
    }),
    ...(academic_year_clearing_sem2 !== undefined && {
      academic_year_clearing_sem2,
    }),
    ...(gpa_third_semester_second_year !== undefined && {
      gpa_third_semester_second_year,
    }),
    ...(cgpa_third_semester_second_year !== undefined && {
      cgpa_third_semester_second_year,
    }),
    ...(academic_year_clearing_sem3 !== undefined && {
      academic_year_clearing_sem3,
    }),
    ...(gpa_fourth_semester_second_year !== undefined && {
      gpa_fourth_semester_second_year,
    }),
    ...(cgpa_fourth_semester_second_year !== undefined && {
      cgpa_fourth_semester_second_year,
    }),
    ...(academic_year_clearing_sem4 !== undefined && {
      academic_year_clearing_sem4,
    }),
    ...(gpa_fifth_semester_third_year !== undefined && {
      gpa_fifth_semester_third_year,
    }),
    ...(cgpa_fifth_semester_third_year !== undefined && {
      cgpa_fifth_semester_third_year,
    }),
    ...(academic_year_clearing_sem5 !== undefined && {
      academic_year_clearing_sem5,
    }),
    ...(gpa_sixth_semester_third_year !== undefined && {
      gpa_sixth_semester_third_year,
    }),
    ...(cgpa_sixth_semester_third_year !== undefined && {
      cgpa_sixth_semester_third_year,
    }),
    ...(academic_year_clearing_sem6 !== undefined && {
      academic_year_clearing_sem6,
    }),
    ...(total_dead_kts !== undefined && { total_dead_kts }),
    ...(total_live_kts !== undefined && { total_live_kts }),
    ...(last_received_marksheet && { last_received_marksheet }),
    ...(has_year_drop_or_gap && { has_year_drop_or_gap }),
    ...(year_drop_between_tenth_and_beginning_of_engineering && {
      year_drop_between_tenth_and_beginning_of_engineering,
    }),
    ...(years_of_gap !== undefined && { years_of_gap }),
    ...(reason_for_gap_or_drop_before_engineering && {
      reason_for_gap_or_drop_before_engineering,
    }),
    ...(year_drop_between_engineering && { year_drop_between_engineering }),
    ...(years_of_gap_during_engineering !== undefined && {
      years_of_gap_during_engineering,
    }),
    ...(reason_for_gap_or_drop_during_engineering && {
      reason_for_gap_or_drop_during_engineering,
    }),
    ...(cv_uploaded_in_nmims_format && { cv_uploaded_in_nmims_format }),
    ...(documents_uploaded && { documents_uploaded }),

    // Store the URLs of uploaded files in the database
    student_cv: student_cv_url,
    student_marksheet_sem_1: student_marksheet_sem_1_url,
    student_marksheet_sem_2: student_marksheet_sem_2_url,
    student_marksheet_sem_3: student_marksheet_sem_3_url,
    student_marksheet_sem_4: student_marksheet_sem_4_url,
    student_marksheet_sem_5: student_marksheet_sem_5_url,
    student_marksheet_sem_6: student_marksheet_sem_6_url,
  };

  // Check if any data is provided to update
  if (Object.keys(updateData).length === 0) {
    throw new ApiError(400, "No data provided to update");
  }

  // Find and update the student record for college details
  const student = await Student.findOneAndUpdate(
    { student_sap_no },
    { $set: updateData },
    { new: true, runValidators: true }
  );

  // Check if the student was found and updated
  if (!student) {
    throw new ApiError(
      404,
      `No student found with SAP number: ${student_sap_no}`
    );
  }

  // Return success response
  return res
    .status(200)
    .json(
      new ApiResponse(200, student, "College details updated successfully")
    );
});

const updateProfileImage = asyncHandler(async (req, res) => {
  const { student_sap_no } = req.body;

  if (!student_sap_no) {
    throw new ApiError(400, "Student SAP number is required");
  }

  const student = await Student.findOne({ student_sap_no });

  if (!student) {
    throw new ApiError(404, "Student not found");
  }
  const file = req.file;

  console.log(file);

  if (req.file) {
    console.log(req.file);
    const cloudinaryResult = await uploadOnCloudinary(file.path);
    console.log(cloudinaryResult);
    student.student_profile_image = cloudinaryResult.secure_url;
  }

  await student.save();

  console.log(student);

  // Return success response
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { profileImagePath: student.student_profile_image },
        "Profile image updated successfully"
      )
    );
});

const updateSkills = asyncHandler(async (req, res) => {
  const { student_sap_no, skills } = req.body;

  console.log(skills);

  // Validate if SAP number and skills are provided
  if (!student_sap_no) {
    throw new ApiError(400, "Student SAP number is required");
  }

  if (!Array.isArray(skills)) {
    throw new ApiError(400, "Skills must be an array");
  }

  // Find the student by SAP number
  const student = await Student.findOne({ student_sap_no });

  if (!student) {
    throw new ApiError(404, "Student not found");
  }

  // Update the skills array
  student.skills = skills;

  // Save the updated student record
  await student.save();

  // Return success response
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { skills: student.skills },
        "Skills updated successfully"
      )
    );
});

export {
  updateBasicDetails,
  updateClassTenthDetails,
  updateDiplomaDetails,
  updateClassTweflthDetails,
  updateCollegeDetails,
  updateProfileImage,
  updateSkills,
};
