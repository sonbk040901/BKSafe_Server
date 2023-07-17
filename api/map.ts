import { createClient } from "@google/maps";
import { GOOGLE_MAP_API_KEY } from "../constants";
import { getDistance as getDistanceUtil, Location } from "../utils/distabce";
const googleMapsClient = createClient({
  key: GOOGLE_MAP_API_KEY,
  Promise: Promise,
});
export default googleMapsClient;
export const getDistance = async (
  origin: string | Location,
  destination: string | Location,
) => {
  if (typeof origin === "string" || typeof destination === "string") {
    const response = await googleMapsClient
      .directions({
        origin,
        destination,
        // mode: "driving",
      })
      .asPromise();
    const { distance, duration } = response.json.routes[0].legs[0];
    return { distance, duration };
  }
  const dis = await getDistanceUtil(origin, destination);
  return { distance: { value: dis }, duration: { value: dis / 60 } };
};
