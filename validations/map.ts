import { query } from "express-validator";
export const findDriver = () => [
  query("lat").isNumeric().withMessage("Latitude must be a number"),
  query("lng").isNumeric().withMessage("Longitude must be a number"),
  query("radius").optional().isNumeric().withMessage("Radius must be a number"),
];
