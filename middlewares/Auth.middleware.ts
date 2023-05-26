import userService from "../services/User.service";
import { MiddlewareType, RequestWithPayload } from "../types";
import jwt from "jsonwebtoken";
type Methods = "verifyToken" | "verifyUser";
const authMiddleware: MiddlewareType<Methods, RequestWithPayload> = {
  verifyToken: async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) throw new Error("Token is required");
      const SECRET_KEY = <string>process.env.AUTH_SECRET_KEY;
      const decoded = jwt.verify(token, SECRET_KEY);
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
};
export default authMiddleware;
