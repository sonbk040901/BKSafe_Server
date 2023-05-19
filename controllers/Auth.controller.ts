import { Request, Response } from "express";
import userService from "../services/User.service";
import createD from "../utils/createResD";
import { validateUser } from "../utils/validate";
const authController = {
  async login(req: Request, res: Response) {
    try {
      const error = await validateUser(req.body, ["email", "password"]);
      if (error) {
        return res.status(400).json(createD(false, error));
      }
      const user = await userService.login(req.body);
      const token = await userService.genToken(user);
      const data = user.toJson();
      res.json(createD(true, { ...data, token }));
    } catch (error: any) {
      res.status(400).json(createD(false, error.message));
    }
  },
  async signup(req: Request, res: Response) {
    try {
      const error = await validateUser(req.body, [
        "email",
        "password",
        "fullname",
        "phone",
        "role",
      ]);
      if (error) {
        throw new Error(error);
      }
      const isTakenInfo = await userService.checkTakenInfo(req.body);
      if (isTakenInfo) {
        throw new Error("Email or phone is taken");
      }

      const user = await userService.create(req.body);
      const { password, ...data } = user.toObject();
      res.json(createD(true, data));
    } catch (error: any) {
      res.status(400).json(createD(false, error.message));
    }
  },
};
export default authController;
