import { ControllerType, RequestWithPayload } from "../types";
import { errorThrowableWrappers } from "./errorThrowableWrapper";
import userService from "../services/User.service";
import { UserDocument } from "../models/User.model";
type Methods = "getMe" | "updateMe" | "updatePassword";
const meController: ControllerType<Methods, RequestWithPayload> = {
  getMe: async (req, res) => {
    const user = <UserDocument>req.payload?.user;
    const data = user.toJson();
    res.json({ data });
  },
  updateMe: async (req, res) => {
    const id = <string>req.payload?.id;
    const update = req.body;
    const user = await userService.update(id, update);
    const data = user.toJson();
    res.json({ message: "Update successfully", data });
  },
  updatePassword: async (req, res) => {
    const id = <string>req.payload?.id;
    const { oldPassword, newPassword } = req.body;
    const user = await userService.updatePassword(id, oldPassword, newPassword);
    const data = user.toJson();
    res.json({ message: "Update successfully", data });
  },
};
export default errorThrowableWrappers(meController);
