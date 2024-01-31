import { ControllerType, RequestWithPayload } from "../types";
import requestService from "../services/Request.service";
import { DrivingCostUtil } from "../utils/drivingCost";
import { UserDocument } from "@models";
import driverService from "../services/Driver.service";
import MapService from "../services/GoogleMap.service";
//declare controller methods here
type Methods =
  | "create"
  | "getAll"
  | "createv2"
  | "getRecents"
  | "getAllByUser"
  | "accept"
  | "updateStatus";
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
  createv2: async (req, res) => {
    try {
      const { distance, pickup, dropOff, stops } = req.body as {
        distance: number;
        pickup: Location;
        dropOff: Location;
        stops: Location[];
      };
      const price = DrivingCostUtil.calculateDrivingCost(
        distance,
        stops.length + 2,
      );
      //
      const driverLocationMock = await driverService.getAll();
      const driverDistanceMock = await Promise.all(
        driverLocationMock.map(async (_) => {
          const location = _.toJSON();
          // const origin = `${lat},${lng}`;
          // const destination = `${location.lat},${location.lng}`;
          const origin = {
            lat: Number(pickup.latitude),
            lng: Number(pickup.longitude),
          };
          const destination = { lat: location.lat, lng: location.lng };
          const distance = await MapService.getDistance(origin, destination);
          return { distance: distance.distance, ...location };
        }),
      );
      const data = driverDistanceMock
        .sort((p, v) => p.distance.value - v.distance.value)
        // .filter((_) => _.distance.value <= radius)
        .slice(0, 5);
      //
      await requestService.create({
        status: "pending",
        price,
        locations: [
          { ...pickup, type: "pickup" },
          ...stops.map((s) => ({ ...s, type: "stop" as const })),
          { ...dropOff, type: "dropoff" },
        ],
        user: req.payload?.id,
        startLocation: {
          address: pickup.address,
          latLng: { lat: pickup.latitude, lng: pickup.longitude },
        },
        endLocation: {
          address: dropOff.address,
          latLng: { lat: dropOff.latitude, lng: dropOff.longitude },
        },
        suggestedDriver: data.map((_) => _._id),
      });
      res.status(201).json({ message: "Create request successfully" });
    } catch (error: any) {
      console.error(error);

      res.status(400).json({ message: error.message });
    }
  },
  getRecents: async (req, res) => {
    try {
      const user = req.payload?.user as UserDocument;
      const data = await requestService.getRecents(user.id);
      res.status(200).json({ data });
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
  getAllByUser: async (req, res) => {
    try {
      const user = req.payload?.user as UserDocument;
      const data = await requestService.getAllByUser(user.id);
      res.status(200).json({ data });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },
  accept: async (req, res) => {
    try {
      const { driverId, reqId } = req.body as {
        reqId: string;
        driverId: string;
      };
      await requestService.accept(reqId, driverId);
      res.status(200).json({ message: "Accept request successfully" });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },
  updateStatus: async (req, res) => {
    const { reqId, status } = req.body as { reqId: string; status: string };
    await requestService.updateStatus(reqId, status);
    res.json({ message: "Update status successfully" });
  },
};
export default RequestController;
type Location = {
  address: string;
  latitude: number;
  longitude: number;
};
