import { Request, IRequest } from "../models";
const requestService = {
  create: async (body: IRequest) => {
    await Request.create(body);
  },
  getAll: async () => {
    const requests = await Request.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $lookup: {
          from: "drivers",
          localField: "driver",
          foreignField: "_id",
          as: "driver",
        },
      },
      {
        $lookup: {
          from: "drivers",
          localField: "suggestedDriver",
          foreignField: "_id",
          as: "suggestedDriver",
        },
      },
      {
        $unwind: {
          path: "$user",
        },
      },
      {
        $unwind: {
          path: "$driver",
        },
      },
    ]);
    return requests;
  },
};
export default requestService;
