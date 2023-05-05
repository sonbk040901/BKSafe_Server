import { Request, Response } from "express";
import userService from "../services/User.service";
import IController from "./Controller";
class AuthController implements IController {
  async login(req: Request, res: Response) {
    try {
      const user = await userService.login(req.body);
      res.json({ success: true, data: user });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
  async signup(req: Request, res: Response) {
    try {
      const user = await userService.signup(req.body);
      res.json({ success: true, data: user });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
}
export default new AuthController();
