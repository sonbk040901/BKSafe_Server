import express from "express";
import dotenv from "dotenv";
import initServer from "./initServer";
import initConnect from "./services/db";
import route from "./routes";
dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();
initServer(app);
route(app);
initConnect(); //connect to database
app.listen(PORT, () => {
  console.log(`Server is running in http://localhost:${PORT}`);
});
