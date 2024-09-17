import Announcement from "../models/announcement.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Student from "../models/student.model.js";

// Create a new announcement
const createAnnouncement = asyncHandler(async (req, res) => {
  const { company_name, date, roles_offered } = req.body;

  // Validate input fields
  if ([company_name, date, roles_offered].some((field) => field == null)) {
    throw new ApiError(400, "All fields except 'company_logo' are required");
  }

  // Handle company logo upload
  const logoFile = req.files["company_logo"]
    ? `/uploads/Company/Logo/${req.files["company_logo"][0].filename}`
    : "";

  // Create a new announcement
  const announcement = new Announcement({
    company_name,
    company_logo: logoFile,
    date,
    roles_offered,
  });

  // Save the announcement to the database
  await announcement.save();

  // Fetch all student_email_id from the Student model
  const students = await Student.find({}, "student_email_id"); // Only select student_email_id field

  // Store all student email addresses in the emailArray
  const emailArray = students.map((student) => student.student_email_id);

  // Create email subject and message
  const emailSubject = `New Company Announcement: ${company_name} added to the portal`;
  const emailMessage = `
    Dear Students,

    We are pleased to inform you that ${company_name} has been added to the portal on ${date}.
    The company is offering the following roles: ${roles_offered}.
    
    Please check the portal for more details.

    Best regards,
    Placement Team
  `;

  // Return response with announcement details, email array, subject, and message
  res.status(201).json(
    new ApiResponse(
      201,
      {
        announcement,
        emailArray,
        emailSubject,
        emailMessage,
      },
      "Announcement created successfully and all student emails fetched"
    )
  );
});

// Get all announcements
const getAllAnnouncements = asyncHandler(async (req, res) => {
  const announcements = await Announcement.find();

  res
    .status(200)
    .json(
      new ApiResponse(200, announcements, "Announcements fetched successfully")
    );
});

// Get an announcement by ID
const getAnnouncementById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const announcement = await Announcement.findById(id);

  if (!announcement) {
    throw new ApiError(404, "Announcement not found");
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, announcement, "Announcement fetched successfully")
    );
});

// Update an announcement by ID

const updateAnnouncement = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { company_name, date, roles_offered } = req.body;

  console.log(id, company_name, date, roles_offered);

  const announcement = await Announcement.findById(id);

  if (!announcement) {
    throw new ApiError(404, "Announcement not found");
  }

  // Check if a new logo file is uploaded
  let logoFile = announcement.company_logo; // Retain the existing logo if no new one is provided
  if (req.files && req.files["company_logo"]) {
    logoFile = `/uploads/Company/Logo/${req.files["company_logo"][0].filename}`;
  }

  // Update fields if provided in the request body
  if (company_name) announcement.company_name = company_name;
  if (logoFile) announcement.company_logo = logoFile;
  if (date) announcement.date = date;
  if (roles_offered) announcement.roles_offered = roles_offered;

  await announcement.save();

  const students = await Student.find({}, "student_email_id"); // Only select student_email_id field

  // Store all student email addresses in the emailArray
  const emailArray = students.map((student) => student.student_email_id);

  // Create email subject and message
  const emailSubject = `Updated Announcement: Changes for ${company_name} on the portal`;
  const emailMessage = `
    Dear Students,
  
    This is to inform you that the announcement for ${company_name} has been updated as of ${date}.
    The company is offering the following updated roles: ${roles_offered}.
    
    Please visit the portal to review the latest details and opportunities.
  
    Best regards,
    Placement Team
  `;
  

  res.status(200).json(
    new ApiResponse(
      200,
      {
        announcement,
        emailArray,
        emailSubject,
        emailMessage,
      },
      "Announcement updated successfully"
    )
  );
});

// Delete an announcement by ID
const deleteAnnouncement = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const announcement = await Announcement.findByIdAndDelete(id);

  if (!announcement) {
    throw new ApiError(404, "Announcement not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, null, "Announcement deleted successfully"));
});

export {
  createAnnouncement,
  getAllAnnouncements,
  getAnnouncementById,
  updateAnnouncement,
  deleteAnnouncement,
};
