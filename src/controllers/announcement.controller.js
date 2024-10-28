import Announcement from "../models/announcement.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Student from "../models/student.model.js";

// Create a new announcement
const createAnnouncement = asyncHandler(async (req, res) => {
  const { title, description, date } = req.body;

  // Validate input fields
  if ([title, description, date].some((field) => field == null)) {
    throw new ApiError(
      400,
      "All fields (title, description, date) are required"
    );
  }

  // Create a new announcement
  const announcement = new Announcement({
    title,
    description,
    date,
  });

  // Save the announcement to the database
  await announcement.save();

  // Fetch all student_email_id from the Student model
  const students = await Student.find({}, "student_email_id"); // Only select student_email_id field

  // Store all student email addresses in the emailArray
  const emailArray = students.map((student) => student.student_email_id);

  // Create email subject and message
  const emailSubject = `New Announcement: ${title}`;
  const emailMessage = `
    Dear Students,

    A new announcement has been made on ${date}.
    Title: ${title}
    Description: ${description}

    Please check the portal for more details.

    Best regards,
    Administration Team
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
  const { title, description, date } = req.body;

  const announcement = await Announcement.findById(id);

  if (!announcement) {
    throw new ApiError(404, "Announcement not found");
  }

  // Update fields if provided in the request body
  if (title) announcement.title = title;
  if (description) announcement.description = description;
  if (date) announcement.date = date;

  await announcement.save();

  const students = await Student.find({}, "student_email_id");

  // Store all student email addresses in the emailArray
  const emailArray = students.map((student) => student.student_email_id);

  // Create email subject and message
  const emailSubject = `Updated Announcement: Changes to ${title}`;
  const emailMessage = `
    Dear Students,

    The announcement titled "${title}" has been updated on ${date}.
    Updated description: ${description}

    Please visit the portal to review the latest details.

    Best regards,
    Administration Team
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

// Mark announcements as read by a student (based on their SAP number)
const readAnnouncement = asyncHandler(async (req, res) => {
  try {
    const { announcementIds, student_sap_no } = req.body;

    console.log(announcementIds , student_sap_no);

    // Loop through each announcement ID and update the status
    for (let announcementId of announcementIds) {
      const announcement = await Announcement.findById(announcementId);

      if (!announcement) {
        continue; // Skip if the announcement is not found
      }

      // Check if the SAP number already exists in the status array
      if (!announcement.status.includes(student_sap_no)) {
        // Add the student's SAP number to the status array
        announcement.status.push(student_sap_no);
        // Save the updated announcement
        await announcement.save();
      }
    }

    // Send a success response after processing all announcements
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          null,
          "Student SAP number added successfully to the announcements."
        )
      );
  } catch (error) {
    // Handle and log the error
    console.log(error);
    throw new ApiError(500, "An error occurred while updating announcements.");
  }
});

export {
  createAnnouncement,
  getAllAnnouncements,
  getAnnouncementById,
  updateAnnouncement,
  deleteAnnouncement,
  readAnnouncement,
};
