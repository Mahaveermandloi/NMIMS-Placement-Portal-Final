// utils/errorMiddleware.js

import { ApiError } from "../utils/ApiError.js";


export const errorHandler = (err, req, res, next) => {
 
  if (err instanceof ApiError) {
    
    return res.status(err.statusCode).json({
      statusCode: err.statusCode,
      message: err.message,
    });
  }


  // For other unexpected errors, log the error stack and return a generic error response
  console.error(err.stack);
  res.status(500).json({
    statusCode: 500,
    message: "Internal Server Error",
  });
};
