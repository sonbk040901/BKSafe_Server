import { ControllerType } from "../types";
import { errorThrowableWrappers } from "./errorThrowableWrapper";
import MapService from "../services/GoogleMap.service";
import DriverService from "../services/Driver.service";
//declare controller methods here
// const latLngRank = {
//   lat: { min: 20.9654, max: 21.0438 },
//   lng: { min: 105.74, max: 105.91 },
// };
//21.279514, 105.361820
//21.229870, 105.904773
//20.712072, 106.009428
//20.624008, 105.668962
type Methods = "findDriver";
const MapController: ControllerType<Methods> = {
  findDriver: async (req, res) => {
    const { lat, lng, radius: radiusq } = req.query;
    const radius = radiusq ? Number(radiusq) : 20000;
    const driverLocationMock = await DriverService.getAll();
    const driverDistanceMock = await Promise.all(
      driverLocationMock.map(async (_) => {
        const location = _.toJSON();
        // const origin = `${lat},${lng}`;
        // const destination = `${location.lat},${location.lng}`;
        const origin = { lat: Number(lat), lng: Number(lng) };
        const destination = { lat: location.lat, lng: location.lng }; 
        const distance = await MapService.getDistance(origin, destination);
        return { distance: distance.distance, ...location };
      }),
    );
    const data = driverDistanceMock
      .sort((p, v) => p.distance.value - v.distance.value)
      // .filter((_) => _.distance.value <= radius)
      .slice(0, 5);

    res.json({ data });
  },
};
export default errorThrowableWrappers(MapController);
// const genRanLatLng = () => {
//   const lat =
//     latLngRank.lat.min +
//     Math.random() * (latLngRank.lat.max - latLngRank.lat.min);
//   const lng =
//     latLngRank.lng.min +
//     Math.random() * (latLngRank.lng.max - latLngRank.lng.min);
//   return { lat, lng };
// };
