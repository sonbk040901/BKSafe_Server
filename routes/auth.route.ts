import { Router } from "express";
const router = Router();
import authController from "../controllers/Auth.controller";
import validate from "../middlewares/Validate.middleware";
import { authValidation } from "../validations";
router.post("/login", validate(authValidation.login()), authController.login);
router.post(
  "/signup",
  validate(authValidation.signup()),
  authController.signup
);
export default router;
