import { validationResult, ValidationChain } from "express-validator";
import { HandlerType } from "../types";
// can be reused by many routes
// sequential processing, stops running validations chain if the previous one fails.
const validate = (validations: ValidationChain[]): HandlerType => {
  return async (req, res, next) => {
    // run all validations
    for (let validation of validations) {
      const result = await validation.run(req);
      if (result.array().length) break;
    }
    // check if there are any errors
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    // if there are errors, return the errors
    const error = errors.array()[0];
    res.status(400).json({
      type: "Validation",
      message: error.msg,
      error: errors.array()[0],
    });
  };
};
export default validate;
