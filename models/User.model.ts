import { Model, Schema, model, Document, Types } from "mongoose";
import jwt from "jsonwebtoken";
import vld from "validator";
import bcrypt from "bcrypt";
interface UserObject {
  username: string;
  fullname: string;
  email: string;
  phone: string;
  avatar?: string;
  role?: "admin" | "user" | "driver";
  isActivated: boolean;
}
export interface IUser extends UserObject {
  //declare model properties here
  password: string;
}
export interface IUserMethods {
  //declare instance method here
  comparePassword(password: string): Promise<boolean>;
  genToken(expiresIn?: string): Promise<string>;
  saveWithHashedPassword(): Promise<void>;
  toJson(): UserObject & { id: Types.ObjectId };
}
export interface UserModel extends Model<IUser, {}, IUserMethods> {
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
    phone: { type: String, required: true, unique: true },
    avatar: { type: String },
    role: {
      type: String,
      enum: ["admin", "user", "driver"],
      default: "user",
    },
    isActivated: { type: Boolean, default: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

//implement instance method here
schema.methods.comparePassword = async function (
  this: UserDocument,
  password: string
) {
  return await bcrypt.compare(password, this.password);
};
schema.methods.genToken = async function (
  this: UserDocument,
  expiresIn?: string
) {
  const AUTH_SECRET_KEY = process.env.AUTH_SECRET_KEY as string;
  expiresIn = expiresIn ?? (process.env.JWT_EXPIRES_IN as string);
  const token = jwt.sign({ id: this._id }, AUTH_SECRET_KEY, {
    expiresIn,
    // algorithm: "RS256",
  });
  return token;
};
schema.methods.saveWithHashedPassword = async function (this: UserDocument) {
  const SALT = process.env.BCRYPT_SALT as string;
  const salt = await bcrypt.genSalt(parseInt(SALT));
  this.password = await bcrypt.hash(this.password, salt);
  await this.save();
};
schema.methods.toJson = function (this: UserDocument) {
  const user = this.toObject();
  const { password, _id: id, ...rest } = user;
  return { ...rest, id };
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
export type UserDocument = Document<unknown, {}, IUser> &
  Omit<
    IUser & {
      _id: Types.ObjectId;
    },
    keyof IUserMethods
  > &
  IUserMethods;
export default User;
