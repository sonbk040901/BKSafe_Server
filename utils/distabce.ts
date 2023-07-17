export type Location = {
  lat: number;
  lng: number;
};
//Calculate distance between two latitude-longitude points?
export const getDistance = async (origin: Location, destination: Location) => {
  const R = 6371e3; // metres
  const φ1 = (origin.lat * Math.PI) / 180; // φ, λ in radians
  const φ2 = (destination.lat * Math.PI) / 180;
  const Δφ = ((destination.lat - origin.lat) * Math.PI) / 180;
  const Δλ = ((destination.lng - origin.lng) * Math.PI) / 180;
  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // in metres
};
