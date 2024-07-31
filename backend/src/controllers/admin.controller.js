import { Admin } from "../models/admin.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import ms from "ms";

// Register Admin
const registerAdmin = asyncHandler(async (req, res) => {
  const { name, email, adminID, password } = req.body;

  // Validate input fields
  if ([name, email, adminID, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  // Check if an admin with the given name, email, or adminID already exists
  const existedAdmin = await Admin.findOne({
    $or: [{ name }, { email }, { adminID }],
  });

  if (existedAdmin) {
    throw new ApiError(409, "Admin already exists");
  }

  // Create a new admin
  const admin = new Admin({
    name: name.toLowerCase(),
    email: email.toLowerCase(),
    adminID: adminID.toLowerCase(),
    password,
  });

  // Generate a refresh token and save the admin
  const refreshToken = admin.generateRefreshToken();
  admin.refreshToken = refreshToken;
  await admin.save();

  // Fetch the created admin excluding the password and refresh token fields
  const createdAdmin = await Admin.findById(admin._id).select(
    "-password -refreshToken"
  );

  if (!createdAdmin) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  res
    .status(200)
    .json(new ApiResponse(200, createdAdmin, "Admin registered successfully"));
});

const loginAdmin = asyncHandler(async (req, res) => {
  const { adminID, password } = req.body;

  // Validate input
  if ([adminID, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "Admin ID and password are required");
  }

  // Find admin by adminID
  const admin = await Admin.findOne({ adminID });

  if (!admin) {
    throw new ApiError(401, "Invalid Admin ID or password");
  }

  // Validate password
  const isPasswordValid = await admin.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Incorrect Password");
  }

  // Generate tokens
  const accessToken = admin.generateAccessToken();
  const refreshToken = admin.generateRefreshToken();

  // Store refresh token in the database
  admin.refreshToken = refreshToken;
  await admin.save();

  // Set cookies
  res.cookie("accessToken", accessToken, {
    secure: false,
    maxAge: ms(process.env.ACCESS_TOKEN_EXPIRY),
    sameSite: "Lax",
  });

  res.cookie("refreshToken", refreshToken, {
    secure: false,
    maxAge: ms(process.env.REFRESH_TOKEN_EXPIRY),
    sameSite: "Lax",
  });

  // Send response
  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { accessToken, refreshToken },
        "Admin logged in successfully"
      )
    );
});




// Logout Admin
const logoutAdmin = asyncHandler(async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    throw new ApiError(400, "Refresh token is required");
  }

  // Find admin with the refresh token
  const admin = await Admin.findOne({ refreshToken });

  if (!admin) {
    throw new ApiError(401, "Invalid refresh token");
  }

  // Clear the refresh token from the database
  admin.refreshToken = null;
  await admin.save();

  // Clear cookies
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  // Send response
  res
    .status(200)
    .json(new ApiResponse(200, null, "Admin logged out successfully"));
});

// Re-generate Access Token
const reGenerateAccessToken = asyncHandler(async (req, res) => {
  // Access cookies using req.cookies
  const { refreshToken } = req.cookies;

  console.log("REFRESH TOKEN ", refreshToken);

  if (!refreshToken) {
    throw new ApiError(400, "Refresh token is required");
  }

  // Verify refresh token
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) {
        throw new ApiError(401, "Invalid refresh token");
      }

      // Find admin with the refresh token
      const admin = await Admin.findOne({ _id: decoded._id, refreshToken });

      if (!admin) {
        throw new ApiError(401, "Invalid refresh token");
      }

      // Generate new access token
      const accessToken = admin.generateAccessToken();

      console.log("NEW TOKEN", accessToken);

      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: parseInt(process.env.ACCESS_TOKEN_EXPIRY) * 1000, // Convert seconds to milliseconds
      });

      // Send response
      res
        .status(200)
        .json(
          new ApiResponse(
            200,
            { accessToken },
            "Access token regenerated successfully"
          )
        );
    }
  );
});

export { registerAdmin, loginAdmin, logoutAdmin, reGenerateAccessToken };
