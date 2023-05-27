import express from "express";
import dotenv from "dotenv";
import initServer from "./initServer";
import initConnect from "./services/db";
import "./custom";
import route from "./routes";
dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();
initServer(app);
route(app);
await initConnect();
app.listen(PORT, () => {
  console.succeed(`Server is running in http://localhost:${PORT}`);
});
