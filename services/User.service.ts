import User, { IUser, UserDocument } from "../models/User.model";
import { Error } from "mongoose";
const userService = {
  async login({ email, password }: { email: string; password: string }) {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("Email not found");
      }
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        throw new Error("Password is incorrect");
      }
      return user;
    } catch (error) {
      throw error;
    }
  },
  async create(body: IUser) {
    // const { username, fullname, email, phone, avatar, role, password } = body;
    try {
      const user = new User(body);
      await user.saveWithHashedPassword();
      return user;
    } catch (error) {
      throw error;
    }
  },
  async genToken(user: UserDocument, expiresIn?: string) {
    try {
      const token = await user.genToken(expiresIn);
      return token;
    } catch (error) {
      throw error;
    }
  },
  async findById(id: string) {
    try {
      const user = await User.findById(id);
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (error) {
      throw error;
    }
  },
  async update(id: string, body: IUser) {
    try {
      const result = await User.updateOne({ _id: id }, body);
      if (result.matchedCount === 0) {
        throw new Error("User not found");
      }
      return;
    } catch (error) {
      throw error;
    }
  },
  async checkTakenInfo(info: { email: string; phone: string }) {
    try {
      const isTakenInfo = await User.isTakenInfo(info);
      return isTakenInfo;
    } catch (error) {}
  },
};
export default userService;
