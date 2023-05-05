import { Express } from "express";
import authRoute from "./auth.route";

export default function initRoutes(app: Express) {
  app.use("/auth", authRoute);
  app.use("/", (req, res) => {
    res.status(403).send("No route for path /");
  });
}
