import { Driver } from "../models";
import type { IDriver, DriverDocument } from "../models";
const driverService = {
  getAll: async () => {
    try {
      const drivers = await Driver.find();
      return drivers;
    } catch (error) {
      console.log(error);
      
    }
    return [];
  },
};
export default driverService;
