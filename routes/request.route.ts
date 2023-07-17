import { Router } from "express";
import authMiddleware from "../middlewares/Auth.middleware";
import RequestController from "../controllers/Request.controller";
import validate from "../middlewares/Validate.middleware";
import { requestValidation } from "../validations";
const router = Router();
router
  .route("/")
  .post(
    authMiddleware.verifyToken,
    authMiddleware.verifyUser,
    validate(requestValidation.create()),
    RequestController.create,
  );
router.route("/getAll").get(RequestController.getAll);

export default router;
