import { Location } from "../utils/distabce";
import googleMapsClient, { getDistance } from "../api/map";

const MapService = {
  getDistance: async (
    origin: string | Location,
    destination: string | Location,
  ) => {
    const { distance, duration } = await getDistance(origin, destination);
    return { distance, duration };
  },
};
export default MapService;
