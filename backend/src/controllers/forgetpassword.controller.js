import { Admin } from "../models/admin.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import crypto from "crypto";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";


// In-memory OTP storage
const otpStore = {}; // Object to store OTP data with email as the key


// Configure nodemailer transport
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465 (SSL), `false` for port 587 (TLS)
  auth: {
    user: "jay439363@gmail.com",
    pass: "lwoxlcjtbmewosnc",
  },
});

// Function to send email
export const sendEmail = async (to, subject, text) => {

  console.log(process.env.EMAIL_PASS , process.env.EMAIL_USER);

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  };

  console.log(mailOptions);


  try {
    
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.response);
    return info;

  } catch (error) {
   
    console.error('Error sending email:', error);
    throw new ApiError(500, 'Error sending email');
  }
};


// Send OTP function
export const sendOtp = asyncHandler(async (req, res) => {
  const { email } = req.body;

  console.log(email);

  // Validate email
  const admin = await Admin.findOne({ email });
  if (!admin) {
    throw new ApiError(404, "Admin not found with this email");
  }

  // Generate OTP
  const otp = crypto.randomInt(100000, 999999); // Generate a 6-digit OTP
  const otpExpiry = Date.now() + 2 * 60 * 1000; // 2 minutes expiry

  // Store OTP in global object
  otpStore[email] = { otp, expiry: otpExpiry };

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

  console.log(email, otp);

  // Get OTP from global object
  const otpData = otpStore[email];

  console.log(otpData);

  if (!otpData) {
    throw new ApiError(400, "OTP not found");
  }

  // Check if OTP is correct and has not expired
  if (otpData.otp !== parseInt(otp, 10) || Date.now() > otpData.expiry) {
    delete otpStore[email]; // Clear expired or incorrect OTP
    throw new ApiError(400, "Invalid or expired OTP");
  }

  // Clear OTP from global object
  delete otpStore[email];

  // Respond with success
  res.status(200).json(new ApiResponse(200, null, "OTP verified successfully"));
});




// UPDATE PASSWORD

export const updatePassword = asyncHandler(async (req, res) => {
  const { email } = req.params; // Get email from URL parameters
  const { password } = req.body; // Get new password from request body

  
  // Validate the input
  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  // Find the admin by email
  const admin = await Admin.findOne({ email });
  
  if (!admin) {
    throw new ApiError(404, "Admin not found");
  }

  // Hash the new password
  const saltRounds = 10; // Number of salt rounds for hashing
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Update the admin's password in the database
  admin.password = hashedPassword;
  await admin.save();

  // Send response
  res
    .status(200)
    .json(new ApiResponse(200, null, "Password updated successfully"));
});







