import { Express } from "express";
import authRoute from "./auth.route";
import meRoute from "./me.route";
import errorHandlerMiddleware from "../middlewares/ErrorHandler.middleware";

export default function initRoutes(app: Express) {
  app.use("/api/auth", authRoute);
  app.use("/api/me", meRoute);
  app.use(async (req, res, next) => {
    res
      .status(403)
      .send(
        `No route for path <code style="background-color: #aaaaaac2; border-radius: 5px; padding: 1px 2px;">${req.path}</code> with method <strong>${req.method}</strong>`
      );
  });
  app.use(errorHandlerMiddleware);
}
