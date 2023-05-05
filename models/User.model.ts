import { Model, Schema, model } from "mongoose";
import vld from "validator";
export interface IUser {
  //declare model properties here
  username: string;
  fullname: string;
  email: string;
  phone: string;
  avatar?: string;
  role?: "admin" | "user" | "driver";
  isActivated: boolean;
  password?: string;
}
interface IUserMethods {
  //declare instance method here
  comparePassword(password: string): Promise<boolean>;
}
interface UserModel extends Model<IUser, {}, IUserMethods> {
  //declare static method here
  isTakenInfo(info: { email: string; phone: string }): Promise<boolean>;
}
const schema = new Schema<IUser, UserModel, IUserMethods>(
  {
    //implement model properties here
    username: {
      type: String,
      // validate: [
      //   {
      //     validator: (v: string) => {
      //       return /^[a-zA-Z0-9]+$/.test(v);
      //     },
      //     message: "Username is not valid",
      //     type: "not valid",
      //   },
      //   {
      //     validator: (v: string) => {
      //       return v.length >= 6 && v.length <= 32;
      //     },
      //     message: "Username must be between 6 and 32 characters",
      //     type: "not valid",
      //   },
      // ],
      required: true,
    },
    fullname: { type: String, required: true },
    phone: { type: String, required: true },
    avatar: { type: String },
    role: {
      type: String,
      enum: ["admin", "user", "driver"],
      default: "user",
    },
    isActivated: { type: Boolean, default: false },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

//implement instance method here
schema.methods.comparePassword = async function (password: string) {
  return vld.equals(password, this.password);
};
//implement static method here
schema.statics.isTakenInfo = async function (info: {
  email: string;
  phone: string;
}) {
  const { email, phone } = info;
  const user = await this.find({
    $or: [{ email }, { phone }],
  });
  return user.length > 0;
};

const User = model<IUser, UserModel>("User", schema);
export default User;
