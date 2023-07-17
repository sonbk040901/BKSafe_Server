import { Model, Schema, model, Document, Types } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {
  AUTH_SECRET_KEY,
  BCRYPT_SALT_ROUNDS,
  JWT_EXPIRES_IN,
} from "../constants";
export interface IUser {
  username: string;
  fullname: string;
  email: string;
  phone: string;
  avatar?: string;
  isActivated: boolean;
  //declare model properties here
  password: string;
}
export interface IUserMethods {
  //declare instance method here
  comparePassword(password: string): Promise<boolean>;
  genToken(expiresIn?: string): Promise<string>;
  saveWithHashedPassword(): Promise<void>;
  toJson(): Omit<IUser, "password"> & { id: Types.ObjectId };
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
      required: true,
    },
    fullname: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    avatar: { type: String },
    isActivated: { type: Boolean, default: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

//implement instance method here
schema.methods.comparePassword = async function (
  this: UserDocument,
  password: string,
) {
  return await bcrypt.compare(password, this.password);
};
schema.methods.genToken = async function (
  this: UserDocument,
  expiresIn?: string,
) {
  expiresIn = expiresIn ?? JWT_EXPIRES_IN;
  const token = jwt.sign({ id: this._id }, AUTH_SECRET_KEY, {
    expiresIn,
    // algorithm: "RS256",
  });
  return token;
};
schema.methods.saveWithHashedPassword = async function (this: UserDocument) {
  const SALT = await bcrypt.genSalt(parseInt(BCRYPT_SALT_ROUNDS));
  this.password = await bcrypt.hash(this.password, SALT);
  await this.save();
};
schema.methods.toJson = function (this: UserDocument) {
  const user = this.toJSON();
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
