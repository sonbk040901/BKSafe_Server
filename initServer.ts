import { Express, json, urlencoded } from "express";
import morgan from "morgan";
import cors from "cors";

export default (app: Express) => {
  app.use(
    morgan("dev"),
    cors({
      origin: "*",
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    }),
    json(),
    urlencoded({ extended: true })
  );
};
