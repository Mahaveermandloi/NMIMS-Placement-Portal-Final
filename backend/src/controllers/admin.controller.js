import { Admin } from "../models/admin.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

// Register Admin
const registerAdmin = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if ([email, name, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const existedAdmin = await Admin.findOne({ $or: [{ name }, { email }] });

  if (existedAdmin) {
    throw new ApiError(409, "Admin already exists");
  }

  const admin = new Admin({
    name: name.toLowerCase(),
    email: email.toLowerCase(),
    password,
  });

  const refreshToken = admin.generateRefreshToken();
  admin.refreshToken = refreshToken;
  await admin.save();

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

// Login Admin
const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if ([email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "Email and password are required");
  }

  const admin = await Admin.findOne({ email: email.toLowerCase() });

  if (!admin) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isPasswordValid = await admin.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid email or password");
  }

  // Generate tokens
  const accessToken = admin.generateAccessToken();
  const refreshToken = admin.generateRefreshToken();

  // Store refresh token in the database
  admin.refreshToken = refreshToken;
  await admin.save();

  // Set cookies
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: parseInt(process.env.ACCESS_TOKEN_EXPIRY) * 1000, // Convert seconds to milliseconds
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: parseInt(process.env.REFRESH_TOKEN_EXPIRY) * 1000, // Convert seconds to milliseconds
  });

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

      // Set new access token cookie
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: parseInt(process.env.ACCESS_TOKEN_EXPIRY) * 1000, // Convert seconds to milliseconds
      });

      // Send response
      res.status(200).json(
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
