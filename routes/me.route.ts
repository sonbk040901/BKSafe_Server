import { Router } from "express";
const router = Router();
import meController from "../controllers/Me.controller";
import authMiddleware from "../middlewares/Auth.middleware";
import validate from "../middlewares/Validate.middleware";
import { userValidation } from "../validations";
router
  .route("/")
  .get(
    authMiddleware.verifyToken,
    authMiddleware.verifyUser,
    meController.getMe
  )
  .put(
    authMiddleware.verifyToken,
    validate(userValidation.update()),
    meController.updateMe
  );
router.put(
  "/password",
  authMiddleware.verifyToken,
  validate(userValidation.updatePassword()),
  meController.updatePassword
);
export default router;
