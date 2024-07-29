class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong",
    errors = [],
    stack = ""
  ) {
    super(message); // Call the parent class constructor with the message argument
    this.statusCode = statusCode; // HTTP status code
    this.message = message; // Error message
    this.success = false; // Flag indicating the request was unsuccessful
    this.errors = errors; // Array of specific errors
    this.stack = stack || new Error().stack; // Stack trace for debugging

    // Automatically capture the stack trace if it's not provided
    if (!stack) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
