import { Router } from "express";
const router = Router();
import meController from "../controllers/Me.controller";
import authMiddleware from "../middlewares/Auth.middleware";
router
  .route("/")
  .get(authMiddleware.verifyToken, meController.getMe)
  .put(authMiddleware.verifyToken, meController.updateMe);
// router.post("/signup", authController.signup);
export default router;
