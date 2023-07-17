import { Model, Schema, model, Types, Document } from "mongoose";
export interface IDriver {
  username: string;
  fullname: string;
  email: string;
  phone: string;
  avatar?: string;
  isActivated: boolean;
  birthday: Date; //driver's birthday
  address: string; //driver's address
  starAvg: number; //driver's star average
  //declare model properties here
  password: string;
  lat: number;
  lng: number;
}
interface IDriverMethods {
  //declare instance method here
  //example: `getName(): string`
}
interface DriverModel extends Model<IDriver, {}, IDriverMethods> {
  //declare static method here
  //example: `createInstance(): Instance`
}
const schema = new Schema<IDriver, DriverModel, IDriverMethods>(
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
    birthday: { type: Date, required: true },
    address: { type: String, required: true },
    starAvg: { type: Number, default: 5 },
    lat: { type: Number, default: 0 },
    lng: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

//implement instance method here
/*
example:
schema.methods.getName =  function () {
});
*/

//implement static method here
/*
example:
schema.statics.createInstance = function () {
});
*/

const Driver = model<IDriver, DriverModel>("Driver", schema);
export type DriverDocument = Document<unknown, {}, IDriver> &
  Omit<
    IDriver & {
      _id: Types.ObjectId;
    },
    keyof IDriverMethods
  > &
  IDriverMethods;
export default Driver;
