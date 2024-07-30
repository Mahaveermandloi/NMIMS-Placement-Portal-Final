// src/errors/ApiError.js

export class ApiError extends Error {
  constructor(statusCode, message = "Something went wrong") {
    super(message); // Call the parent class constructor with the message argument
    this.statusCode = statusCode; // HTTP status code
    this.success = false; // Flag indicating the request was unsuccessful

    // Automatically capture the stack trace for debugging if needed
    Error.captureStackTrace(this, this.constructor);
  }
}
