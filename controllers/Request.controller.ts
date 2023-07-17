import { ControllerType, RequestWithPayload } from "../types";
import requestService from "../services/Request.service";
//declare controller methods here
type Methods = "create" | "getAll";
const RequestController: ControllerType<Methods, RequestWithPayload> = {
  create: async (req, res) => {
    try {
      const user = req.payload?.id;
      const {
        currentLocation,
        startLocation,
        endLocation,
        suggestedDriver,
        driver,
      } = req.body;
      await requestService.create({
        currentLocation,
        startLocation,
        user,
        status: "accepted",
        suggestedDriver,
        driver,
        endLocation,
      });
      res.status(201).json({ message: "Create request successfully" });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },
  getAll: async (req, res) => {
    try {
      const data = await requestService.getAll();
      res.status(200).json({ data });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },
};
export default RequestController;
