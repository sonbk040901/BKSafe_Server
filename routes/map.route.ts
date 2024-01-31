import { Router } from "express";
import MapController from "../controllers/Map.controller";
import { mapValidation } from "../validations";
import validate from "../middlewares/Validate.middleware";
const router = Router();
router
  .route("/drivers")
  .get(validate(mapValidation.findDriver()), MapController.findDriver);
router.route("/driving-cost").all(MapController.calculateDrivingCost);
export default router;
