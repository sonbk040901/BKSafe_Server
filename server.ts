import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import initConnect from "./services/db";
import route from "./routes";
dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();
app.use(morgan("dev"));
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
route(app);
initConnect();
app.listen(PORT, () => {
  console.log(`Server is running in http://localhost:${PORT}`);
});
