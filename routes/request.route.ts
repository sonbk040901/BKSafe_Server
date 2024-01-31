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
router
  .route("/create")
  .post(
    authMiddleware.verifyToken,
    authMiddleware.verifyUser,
    RequestController.createv2,
  );
router.route("/getAll").get(RequestController.getAll);
router.post("/accept", RequestController.accept);
router.patch("/status", RequestController.updateStatus);
router
  .route("/")
  .get(
    authMiddleware.verifyToken,
    authMiddleware.verifyUser,
    RequestController.getAllByUser,
  );
router
  .route("/recents")
  .get(
    authMiddleware.verifyToken,
    authMiddleware.verifyUser,
    RequestController.getRecents,
  );

export default router;
