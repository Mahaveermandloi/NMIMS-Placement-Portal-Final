import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { Admin } from "../models/admin.model.js";
import Student from "../models/student.model.js";
import Password from "../models/password.model.js";

export const verifyJWT = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Unauthorized: Token not provided");
    }

    // Verify token
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const currentTimestamp = Math.floor(Date.now() / 1000);
    if (decodedToken.exp < currentTimestamp) {
      throw new ApiError(401, "Token expired");
    }

    // Find user based on token
    let user;

    

    if (decodedToken._id) {
      user = await Admin.findById(decodedToken._id).select(
        "-password -refreshToken"
      );

      if (user) {
        req.admin = user;
        return next();
      }

      user = await Password.findById(decodedToken._id).select(
        "-password -refreshToken"
      );

      if (user) {
        req.student = user;
        return next();
      }
    }

    throw new ApiError(401, "Invalid token access");
  } catch (error) {
    console.log(error?.message);
    next(new ApiError(401, error?.message || "Invalid access token"));
  }
};

export const verifyAPIKey = (req, res, next) => {
  try {
    const apiKey = req.header("x-api-key"); // You can also use req.query or req.body if needed

    if (!apiKey) {
      throw new ApiError(401, "API key is missing");
    }

    if (apiKey !== process.env.API_KEY) {
      throw new ApiError(403, "Invalid API key");
    }

    // API key is valid, proceed to next middleware or route handler
    next();
  } catch (error) {
    next(new ApiError(403, error.message || "Forbidden"));
  }
};
