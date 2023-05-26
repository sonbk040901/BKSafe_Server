import { ErrorRequestHandler } from "express";
//declare middleware methods here
const ErrorHandlerMiddleware: ErrorRequestHandler = async (
  err,
  req,
  res,
  next
) => {
  if (typeof err === "string")
    return res.status(400).json({ message: err, type: "Bad request" });
  res.status(500).json({
    message: err.message,
    type: "Internal server",
    stack: err.stack,
  });
};
export default ErrorHandlerMiddleware;
