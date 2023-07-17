import express from "express";
import http from "http";
import initServer from "./initServer";
import initConnect from "./services/db";
import "module-alias/register";
import "./custom";
import route from "./routes";
import { PORT } from "./constants";

const app = express();
initServer(app);
route(app);
await initConnect();
http.createServer(app).listen(PORT, () => {
  console.succeed(`Server is running in http://localhost:${PORT}`);
});
