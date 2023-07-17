import { Model, Schema, model, Types, Document } from "mongoose";
interface LatLng {
  lat: number;
  lng: number;
}

interface Location {
  address: string;
  latLng: LatLng;
}
type Status = "pending" | "accepted" | "rejected" | "completed";
export interface IRequest {
  //declare model properties here
  //example: `name: string`
  user: Types.ObjectId;
  currentLocation: Location;
  startLocation: Location;
  endLocation?: Location;
  suggestedDriver: Types.ObjectId[];
  driver?: Types.ObjectId;
  status: Status;
}
interface IRequestMethods {
  //declare instance method here
  //example: `getName(): string`
}
interface RequestModel extends Model<IRequest, {}, IRequestMethods> {
  //declare static method here
  //example: `createInstance(): Instance`
}
const schema = new Schema<IRequest, RequestModel, IRequestMethods>(
  {
    //implement model properties here
    user: Types.ObjectId,
    currentLocation: {
      address: { type: String, required: true },
      latLng: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
      },
    },
    startLocation: {
      address: { type: String, required: true },
      latLng: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
      },
    },
    endLocation: {
      address: { type: String },
      latLng: {
        lat: { type: Number },
        lng: { type: Number },
      },
    },
    suggestedDriver: [{ type: Types.ObjectId }],
    driver: { type: Types.ObjectId },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected", "completed"],
      default: "pending",
    },
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

const Request = model<IRequest, RequestModel>("Request", schema);
export type RequestDocument = Document<unknown, {}, IRequest> &
  Omit<
    IRequest & {
      _id: Types.ObjectId;
    },
    keyof IRequestMethods
  > &
  IRequestMethods;
export default Request;
