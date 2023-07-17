import { body } from "express-validator";
export const create = () => [
  body("currentLocation.latLng.lat")
    .notEmpty()
    .withMessage("Current location's lat must be a string"),
  body("currentLocation.latLng.lng")
    .notEmpty()
    .withMessage("Current location's lng must be a string"),
  body("startLocation.latLng.lat")
    .notEmpty()
    .withMessage("Start location's lat must be a string"),
  body("startLocation.latLng.lng")
    .notEmpty()
    .withMessage("Start location's lng must be a string"),
  body("endLocation.latLng.lat")
    .notEmpty()
    .withMessage("End location's lat must be a string"),
  body("endLocation.latLng.lat")
    .notEmpty()
    .withMessage("End location's lng must be a string"),
  body("currentLocation.address")
    .notEmpty()
    .withMessage("Address must be a string"),
  body("startLocation.address")
    .notEmpty()
    .withMessage("Address must be a string"),
  body("endLocation.address")
    .notEmpty()
    .withMessage("Address must be a string"),
  body("suggestedDriver", "Suggested driver must be an array")
    .notEmpty()
    .isArray(),
  body("suggestedDriver.*", "Suggested driver must be an array of mongoId")
    .notEmpty()
    .isMongoId(),
  body("driver", "Driver must be a mongodbId string").notEmpty().isMongoId(),
];
