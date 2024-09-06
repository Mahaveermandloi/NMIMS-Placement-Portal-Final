import { Admin } from "../models/admin.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

import ms from "ms";

// Register Admin

const registerAdmin = asyncHandler(async (req, res) => {
  const { name, email, adminID, password } = req.body;
  const profileImage = req.file;

  // Validate input fields
  if ([name, email, adminID, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  // Check if an admin with the given name, email, or adminID already exists
  const existedAdmin = await Admin.findOne({
    $or: [{ email }, { adminID }],
  });

  if (existedAdmin) {
    throw new ApiError(409, "Admin already exists");
  }

  const admin = new Admin({
    name: name.toLowerCase(),
    email: email.toLowerCase(),
    adminID: adminID.toLowerCase(),
    password,
    profile_image: profileImage
      ? `/uploads/Admin/ProfileImage/${profileImage.filename}`
      : "",
  });

  await admin.save();

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
    .status(201)
    .json(new ApiResponse(201, createdAdmin, "Admin registered successfully"));
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

  // res.cookie("accessToken", accessToken, {
  //   secure: process.env.NODE_ENV === "production", // true in production, false in development
  //   maxAge: ms(process.env.ACCESS_TOKEN_EXPIRY),
  //   sameSite: "Lax",
  // });
  // res.cookie("refreshToken", refreshToken, {
  //   secure: process.env.NODE_ENV === "production", // true in production, false in development
  //   maxAge: ms(process.env.REFRESH_TOKEN_EXPIRY),
  //   sameSite: "Lax",
  // });

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

const verifyRefreshToken = asyncHandler(async (req, res) => {
  // Retrieve the refresh token from cookies
  const refreshToken = req.cookies.refreshToken;

  // Check if the refresh token is present
  if (!refreshToken) {
    throw new ApiError(401, "Refresh token is required.");
  }

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) {
        throw new ApiError(403, "Invalid or expired refresh token.");
      }

      // Find the admin with the provided ID and matching refresh token in the database
      const admin = await Admin.findOne({ _id: decoded._id, refreshToken });

      if (!admin) {
        throw new ApiError(401, "Admin not found or refresh token mismatch.");
      }

      // If the refresh token is valid and matches the database record, return a positive response
      res
        .status(200)
        .json(
          new ApiResponse(
            200,
            { refreshToken: refreshToken, authenticated: true },
            "Refresh token verified successfully."
          )
        );
    }
  );
});

const getAdminDetails = asyncHandler(async (req, res) => {
  const adminId = req.admin;

  const admin = await Admin.findById(adminId).select("-password"); // Exclude

  if (!admin) {
    throw new ApiError(404, "Admin not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, admin, "Admin details fetched successfully"));
});

// const updateProfile = asyncHandler(async (req, res) => {
//   const adminId = req.admin;
//   const { email } = req.body;
//   const profileImage = req.file;

//   const admin = await Admin.findById(adminId);

//   if (!admin) {
//     throw new ApiError(404, "Admin not found");
//   }

//   if (email && email !== admin.email) {
//     const emailExists = await Admin.findOne({ email });
//     if (emailExists) {
//       throw new ApiError(409, "Email already in use by another admin");
//     }
//     admin.email = email.toLowerCase();
//   }

//   if (profileImage) {
//     admin.profile_image = `/uploads/Admin/ProfileImage/${profileImage.filename}`;
//   }

//   // Save the updated admin
//   await admin.save();

//   // Fetch the updated admin details excluding the password and refresh token
//   const updatedAdmin = await Admin.findById(admin._id).select(
//     "-password -refreshToken"
//   );

//   res
//     .status(200)
//     .json(new ApiResponse(200, updatedAdmin, "Profile updated successfully"));
// });

const updateProfile = asyncHandler(async (req, res) => {
  const adminId = req.admin;
  const { email } = req.body;
  const profileImage = req.file;

  const admin = await Admin.findById(adminId);

  if (!admin) {
    throw new ApiError(404, "Admin not found");
  }

  if (email && email !== admin.email) {
    const emailExists = await Admin.findOne({ email });
    if (emailExists) {
      throw new ApiError(409, "Email already in use by another admin");
    }
    admin.email = email.toLowerCase();
  }

  if (profileImage) {
    admin.profile_image = `/uploads/Admin/ProfileImage/${profileImage.filename}`;
  }

  await admin.save();

  const updatedAdmin = await Admin.findById(admin._id).select(
    "-password -refreshToken"
  );

  res
    .status(200)
    .json(new ApiResponse(200, updatedAdmin, "Profile updated successfully"));
});

const updateNewPassword = asyncHandler(async (req, res) => {
  const adminId = req.admin;
  const { currentPassword, newPassword } = req.body;

  // Validate input fields
  if ([currentPassword, newPassword].some((field) => field?.trim() === "")) {
    throw new ApiError(
      400,
      "Both current password and new password are required"
    );
  }

  // Find admin by ID
  const admin = await Admin.findById(adminId);

  if (!admin) {
    throw new ApiError(404, "Admin not found");
  }

  // Verify current password
  const isPasswordValid = await admin.isPasswordCorrect(currentPassword);

  if (!isPasswordValid) {
    throw new ApiError(401, "Incorrect current password");
  }

  // Update password
  admin.password = newPassword;

  // Save updated admin
  await admin.save();

  res
    .status(200)
    .json(new ApiResponse(200, null, "Password updated successfully"));
});

export {
  registerAdmin,
  loginAdmin,
  logoutAdmin,
  reGenerateAccessToken,
  getAdminDetails,
  updateProfile,
  updateNewPassword,
  verifyRefreshToken,
};
