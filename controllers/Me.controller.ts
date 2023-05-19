import { Request, Response } from "express";
import { Req } from "../types";
import userService from "../services/User.service";
import createD from "../utils/createResD";
const meController = {
  async getMe(req: Req, res: Response) {
    try {
      const user = await userService.findById(req.user?.id as string);
      const data = user.toJson();
      res.json(createD(true, data));
    } catch (error: any) {
      res.status(400).json(createD(false, error.message));
    }
  },
  async updateMe(req: Req, res: Response) {
    try {
      await userService.update(req.user?.id as string, req.body);
      res.json(createD(true, "Update successfully"));
    } catch (error: any) {
      res.status(400).json(createD(false, error.message));
    }
  },
};
export default meController;
