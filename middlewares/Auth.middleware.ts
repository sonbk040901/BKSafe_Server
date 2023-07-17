import userService from "../services/User.service";
import { MiddlewareType, RequestWithPayload } from "../types";
import jwt from "jsonwebtoken";
import { AUTH_SECRET_KEY } from "../constants";
type Methods = "verifyToken" | "verifyUser" | "verifyDriver";
const authMiddleware: MiddlewareType<Methods, RequestWithPayload> = {
  verifyToken: async (req, res, next) => {
    try {
      console.log(req.headers.authorization);
      
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) throw new Error("Token is required");
      const decoded = jwt.verify(token, AUTH_SECRET_KEY);
      req.payload = <Record<string, any>>decoded;
      next();
    } catch (error: any) {
      res.status(401).json({ message: error.message, type: "Unauthorized" });
    }
  },
  verifyUser: async (req, res, next) => {
    try {
      const id = <string>req.payload?.id;
      const user = await userService.findById(id);
      req.payload!.user = user;
      next();
    } catch (error: any) {
      res.status(401).json({ message: error.message, type: "Unauthorized" });
    }
  },
  verifyDriver: async (req, res, next) => {
    try {
      const id = <string>req.payload?.id;
      const user = await userService.findById(id);
      req.payload!.user = user;
      next();
    } catch (error: any) {
      res.status(401).json({ message: error.message, type: "Unauthorized" });
    }
  },
};
export default authMiddleware;
