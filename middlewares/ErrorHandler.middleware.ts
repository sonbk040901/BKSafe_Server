import { ErrorRequestHandler } from "express";
//declare middleware methods here
const ErrorHandlerMiddleware: ErrorRequestHandler = async (
  err,
  req,
  res,
  next
) => {
  if (typeof err === "string") {
    res.status(400).json({ message: err, type: "Bad request" });
    console.warning(err);
    return;
  }
  res.status(500).json({
    message: err.message,
    type: "Internal server",
    stack: err.stack,
  });
  console.fail(err.message);
};
export default ErrorHandlerMiddleware;
