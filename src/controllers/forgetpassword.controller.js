import { Admin } from "../models/admin.model.js";
import Student from "../models/student.model.js"; // Import the Student model
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import crypto from "crypto";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import Password from "../models/password.model.js";

// In-memory OTP storage using Map
const otpStore = new Map(); // Map to store OTP data with email as the key

// Configure nodemailer transport
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use true for port 465 (SSL), false for port 587 (TLS)
  auth: {
    user: "jay439363@gmail.com", // Use environment variables for email credentials
    pass: "lwoxlcjtbmewosnc",
  },
});

// Function to send email
export const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  };

  console.log(mailOptions);

  const info = await transporter.sendMail(mailOptions);
  console.log("Email sent successfully:", info.response);
  return info;
};

// Send OTP function
export const sendOtp = asyncHandler(async (req, res) => {
  const { email } = req.body;

  // Validate email in both Admin and Student collections
  const admin = await Admin.findOne({ email });
  const student = await Student.findOne({
    $or: [{ student_email_id: email }, { student_alternate_email_id: email }],
  });

  if (!admin && !student) {
    throw new ApiError(404, "No account found with this email");
  }

  // Generate OTP
  const otp = crypto.randomInt(100000, 999999); // Generate a 6-digit OTP
  const otpExpiry = Date.now() + 2 * 60 * 1000; // 2 minutes expiry

  // Store OTP in Map
  otpStore.set(email, { otp, expiry: otpExpiry });

  // Send OTP via email
  const subject = "Your OTP Code";
  const text = `Your OTP code is ${otp}. It is valid for 2 minutes.`;
  await sendEmail(email, subject, text);

  // Send response
  res.status(200).json(new ApiResponse(200, null, "OTP sent successfully"));
});

// Verify OTP function
export const verifyOtp = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  // Get OTP data from Map
  const otpData = otpStore.get(email);

  console.log(otpData);

  if (!otpData) {
    throw new ApiError(400, "OTP not found");
  }

  // Check if OTP is correct and has not expired
  if (otpData.otp !== parseInt(otp, 10) || Date.now() > otpData.expiry) {
    otpStore.delete(email); // Clear expired or incorrect OTP
    throw new ApiError(400, "Invalid or expired OTP");
  }

  // Clear OTP from Map
  otpStore.delete(email);

  // Respond with success
  res.status(200).json(new ApiResponse(200, null, "OTP verified successfully"));
});

// Update password
// export const updatePassword = asyncHandler(async (req, res) => {
//   const { email } = req.params; // Get email from URL parameters
//   const { password } = req.body; // Get new password from request body

//   console.log(email, password);

//   // Validate the input
//   if (!email || !password) {
//     throw new ApiError(400, "Email and password are required");
//   }

//   // Find the admin or student by email
//   const admin = await Admin.findOne({ email });
//   const student = await Student.findOne({
//     $or: [{ student_email_id: email }, { student_alternate_email_id: email }],
//   });

//   if (!admin && !student) {
//     throw new ApiError(404, "No account found");
//   }

//   // Update the password in the appropriate collection
//   if (admin) {
//     admin.password = password; // The `pre` save hook will handle hashing
//     await admin.save();
//   } else if (student) {
//     student.password = password; // Assuming students also have passwords
//     await student.save();
//   }

//   // Send response
//   res
//     .status(200)
//     .json(new ApiResponse(200, null, "Password updated successfully"));
// });

export const updatePassword = asyncHandler(async (req, res) => {
  const { email } = req.params; // Get email from URL parameters
  const { password } = req.body; // Get new password from request body

  console.log(email, password);

  // Validate the input
  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  // Find the admin or student by email
  const admin = await Admin.findOne({ email });
  const student = await Student.findOne({
    $or: [{ student_email_id: email }, { student_alternate_email_id: email }],
  });


  console.log(admin );
  console.log(student );

  if (!admin && !student) {
    throw new ApiError(404, "No account found");
  }

  let userId;
  if (admin) {
    userId = admin._id;
  } else if (student) {
    userId = student._id;
  }

  // Find the password record for the user
  const passwordRecord = await Password.findOne({ student_id: userId });
  if (!passwordRecord) {
    throw new ApiError(404, "Password record not found");
  }

  // Update the password using the `isPasswordCorrect` method
  passwordRecord.password = password;
  await passwordRecord.save(); // The `pre` save hook will handle hashing

  // Send response
  res
    .status(200)
    .json(new ApiResponse(200, null, "Password updated successfully"));
});

// Resend OTP function
export const resendOtp = asyncHandler(async (req, res) => {
  const { email } = req.body; // Only email is needed to resend OTP

  // Validate email in both Admin and Student collections
  const admin = await Admin.findOne({ email });
  const student = await Student.findOne({
    $or: [{ student_email_id: email }, { student_alternate_email_id: email }],
  });

  if (!admin && !student) {
    throw new ApiError(404, "No account found with this email");
  }

  // Generate a new OTP
  const newOtp = crypto.randomInt(100000, 999999); // Generate a 6-digit OTP
  const otpExpiry = Date.now() + 2 * 60 * 1000; // 2 minutes expiry

  // Update OTP in Map
  otpStore.set(email, { otp: newOtp, expiry: otpExpiry });

  // Send the new OTP via email
  const subject = "Your OTP Code";
  const text = `Your new OTP code is ${newOtp}. It is valid for 2 minutes.`;
  await sendEmail(email, subject, text);

  // Send response
  res.status(200).json(new ApiResponse(200, null, "OTP resent successfully"));
});
