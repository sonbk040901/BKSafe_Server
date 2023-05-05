import { Router } from "express";
const router = Router();
import authController from "../controllers/Auth.controller";
router.post("/login", authController.login);
router.post("/signup", authController.signup);
export default router;
