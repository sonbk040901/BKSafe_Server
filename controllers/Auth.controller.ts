import userService from "../services/User.service";
import { ControllerType } from "../types";
import { errorThrowableWrappers } from "./errorThrowableWrapper";
type Methods = "login" | "signup";
const authController: ControllerType<Methods> = {
  login: async (req, res) => {
    const { email, password } = req.body;
    const user = await userService.login({ email, password });
    const token = await userService.genToken(user);
    const data = user.toJson();
    res.json({ data: { ...data, token } });
  },
  signup: async (req, res) => {
    const user = await userService.create(req.body);
    const { password, ...data } = user.toObject();
    res.status(201).json({ data });
  },
};
export default errorThrowableWrappers(authController);
