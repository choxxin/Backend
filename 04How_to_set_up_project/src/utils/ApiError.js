class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong ",
    errors = [],
    stack = ""
  ) {
    super(message);
    this.statusCods = statusCode;
    this.data = null;
    this.message = message;
    this.success = false;
    this.errors = errors;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
export { ApiError };
/*provided code, we define a custom error class ApiError that extends the built-in JavaScript Error class. Here's a breakdown of what each part does:

Constructor Parameters:

statusCode: HTTP status code representing the error.
message: Error message, defaults to "Something went wrong".
errors: An array to hold multiple error details.
stack: Stack trace, if provided.
Properties:

statusCode: Sets the HTTP status code.
data: Initialized as null.
message: Sets the error message.
success: Always false, indicating the failure state.
errors: Sets additional error details.
stack: Captures the stack trace if not provided.
Example Usage
When an error occurs in an API endpoint, this custom error class can be used to provide a consistent error response structure.

Code Explanation:
super(message): Calls the parent Error class constructor.
Error.captureStackTrace(this, this.constructor): Captures the stack trace, excluding the constructor call from the trace.
This custom error class helps in providing detailed and structured error information in API responses.
*/
