const ErrorResponse = require("../utils/ApiError");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  console.log(err);
  if (err.message.startsWith("Cannot read property")) {
    const message = `Something went wrong, please check again!`;
    error = new ErrorResponse(404, message);
  }

  if (error.statusCode === 404) {
    const message = `Resource not found!`;
    error = new ErrorResponse(404, error.message);
  }

  if (error.message === "Validation error") {
    const message = `Record with that name already exists! Please enter another value!`;
    error = new ErrorResponse(400, message);
  }

  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(400, message);
  }

  if (err.name === "JsonWebTokenError") {
    const message = "Invalid token. Please log in again!";
    error = new ErrorResponse(401, message);
  }

  if (err.name === "TokenExpiredError") {
    const message = "Your token has expired! Please log in again.";
    error = new ErrorResponse(401, message);
  }

  res.status(error.statusCode || 500).json({
    status: error.status || "fail",
    error: error.message || "Internal server Error",
  });
};

module.exports = {
  errorHandler,
};
