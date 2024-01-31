import { Request, IRequest, Driver } from "../models";
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
          preserveNullAndEmptyArrays: true,
        },
      },
    ]);
    return requests;
  },
  getRecents: async (userId: string) => {
    const requests = await Request.find({
      user: userId,
      status: { $nin: ["rejected", "canceled"] },
    })
      .sort({ createdAt: -1 })
      .limit(2);
    const recent = requests.find((_) => _.status !== "completed")?.toJSON();
    let recentDriver;
    if (recent) {
      recentDriver = await Driver.findById(recent.driver);
    }
    const completed = requests.find((_) => _.status === "completed")?.toJSON();
    let completedDriver;
    if (completed) {
      completedDriver = await Driver.findById(completed.driver);
    }
    return {
      recent: recent ? { ...recent, driver: recentDriver } : undefined,
      completed: completed
        ? { ...completed, driver: completedDriver }
        : undefined,
    };
  },
  getAllByUser: async (userId: string) => {
    const requests = await Request.find({ user: userId }).sort({
      createdAt: -1,
    });
    return requests;
  },
  accept: async (requestId: string, driverId: string) => {
    await Request.findByIdAndUpdate(requestId, {
      driver: driverId,
      status: "accepted",
    });
  },
  updateStatus: async (requestId: string, status: string) => {
    await Request.findByIdAndUpdate(requestId, { status });
  },
};
export default requestService;
