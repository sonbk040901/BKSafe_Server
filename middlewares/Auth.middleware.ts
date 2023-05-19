import { NextFunction, Request, Response } from "express";
import { Req } from "../types";
import jwt from "jsonwebtoken";

const authMiddleware = {
  async verifyToken(req: Req, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Token not found" });
    }
    try {
      const decoded = jwt.verify(token, process.env.AUTH_SECRET_KEY as string);
      req.user = decoded as { id: string };
      next();
    } catch (error) {
      res.status(401).json({ success: false, message: "Token is invalid" });
    }
  },
};
export default authMiddleware;
