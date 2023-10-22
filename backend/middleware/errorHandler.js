import errorResponse from "../utils/errorResponse.js";

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  //mongoose bag object Id
  if (err.name === "CastError") {
    const message = `Resource not found with id : ${error.value}`;
    error = new errorResponse(message, 404);
  }

  //Mongoose duplicate key
  if (err.code === 11000) {
    const message = "Duplicate feild entered";
    error = new errorResponse(message, 400);
  }

  //mongoose validation error
  if (err.name === "ValidationError") {
    error = new errorResponse(err.message, 400);
  }

  res
    .status(error.statusCode || 500)
    .json({ error: error.message || "Server Error" });
};

export default errorHandler;
