import userService from "../services/User.service";
import { ControllerType } from "../types";
type Methods = "login" | "signup";
const authController: ControllerType<Methods> = {
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await userService.login({ email, password });
      const token = await userService.genToken(user);
      const data = user.toJson();
      res.json({ data: { ...data, token } });
    } catch (error) {
      next(error);
    }
  },
  async signup(req, res, next) {
    try {
      const user = await userService.create(req.body);
      const { password, ...data } = user.toObject();
      res.status(201).json({ data });
    } catch (error) {
      next(error);
    }
  },
};
export default authController;
