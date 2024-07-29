import { Admin } from "../models/admin.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import crypto from "crypto";
import nodemailer from "nodemailer";

// Configure nodemailer transport
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465 (SSL), `false` for port 587 (TLS)
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Function to send email
export const sendEmail = (to, subject, text) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  };

  return transporter.sendMail(mailOptions).catch((error) => {
    console.error("Error sending email:", error);
    throw new ApiError(500, "Error sending email");
  });
};

// In-memory OTP storage
const otpStore = new Map();
// Helper functions for OTP management
const setOtp = (email, otp, expiry) => {
  otpStore.set(email, { otp, expiry });
};

const getOtp = (email) => {
  return otpStore.get(email);
};
const deleteOtp = (email) => {
  otpStore.delete(email);
};

// Send OTP function
export const sendOtp = asyncHandler(async (req, res) => {
  const { email } = req.body;

  // Validate email
  const admin = await Admin.findOne({ email });
  if (!admin) {
    throw new ApiError(404, "Admin not found with this email");
  }

  // Generate OTP
  const otp = crypto.randomInt(100000, 999999); // Generate a 6-digit OTP
  const otpExpiry = Date.now() + 2 * 60 * 1000; // 2 minutes expiry

  // Store OTP in global variable
  setOtp(email, otp, otpExpiry);

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

  // Get OTP from global variable
  const otpData = getOtp(email);
  if (!otpData) {
    throw new ApiError(400, "OTP not found");
  }

  // Check if OTP is correct and has not expired
  if (otpData.otp !== otp || Date.now() > otpData.expiry) {
    deleteOtp(email); // Clear expired or incorrect OTP
    throw new ApiError(400, "Invalid or expired OTP");
  }

  // Clear OTP from global variable
  deleteOtp(email);

  // Respond with success
  res.status(200).json(new ApiResponse(200, null, "OTP verified successfully"));
});


