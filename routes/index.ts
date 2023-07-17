import { Express, Router } from "express";
import authRoute from "./auth.route";
import meRoute from "./me.route";
import mapRoute from "./map.route";
import requestRoute from "./request.route";
import errorHandlerMiddleware from "../middlewares/ErrorHandler.middleware";

export default function initRoutes(app: Express) {
  const apiRouter = Router();
  apiRouter.use("/auth", authRoute);
  apiRouter.use("/me", meRoute);
  apiRouter.use("/map", mapRoute);
  apiRouter.use("/request", requestRoute);
  apiRouter.use(async (req, res, next) => {
    res.status(403).send(
      `<p id="err" style="transition: all .5s">
        No route for path 
        <code style="background-color: #aaaaaac2; border-radius: 5px; padding: 1px 2px;">
          ${req.path}
        </code>
        with method
        <strong>${req.method}</strong>
      </p>
      <script>
        const p = document.querySelector('#err');
        setInterval(() => {
          p.style.color = p.style.color === 'red' ? 'black' : 'red';
        }, 1000);
      </script>
      `
    );
  });
  app.use("/api", apiRouter);
  app.use(errorHandlerMiddleware);
}
