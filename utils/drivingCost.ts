export class DrivingCostUtil {
  private static readonly STARTING_PRICE: number = 100000;
  private static readonly PRICE_PER_KM_10: number = 16000;
  private static readonly PRICE_PER_KM_10_20: number = 12000;
  private static readonly PRICE_PER_KM_20: number = 8000;
  private static readonly PRICE_PER_WAYPOINT: number = 5000;
  private static readonly AFTER_21H_PRICE: number = 1.1;
  private static readonly AFTER_23H_PRICE: number = 1.2;

  static calculateDrivingCost(
    distance: number,
    numberOfWaypoints: number,
  ): number {
    const current = new Date();
    const isAfter21h: boolean = current.getHours() >= 21;
    const isAfter23h: boolean =
      current.getHours() === 23 || current.getHours() < 5;
    const priceLevel: number = Math.floor(distance / 10);
    let price: number = DrivingCostUtil.STARTING_PRICE;

    price +=
      priceLevel === 0
        ? (distance % 10) * DrivingCostUtil.PRICE_PER_KM_10
        : 10 * DrivingCostUtil.PRICE_PER_KM_10;

    if (priceLevel > 0) {
      price +=
        priceLevel === 1
          ? ((distance - 10) % 10) * DrivingCostUtil.PRICE_PER_KM_10_20
          : 10 * DrivingCostUtil.PRICE_PER_KM_10_20;
    }

    if (priceLevel > 1) {
      price += ((distance - 20) % 10) * DrivingCostUtil.PRICE_PER_KM_20;
    }

    price += numberOfWaypoints * DrivingCostUtil.PRICE_PER_WAYPOINT;

    if (isAfter21h) {
      if (isAfter23h) {
        price *= DrivingCostUtil.AFTER_23H_PRICE;
      } else {
        price *= DrivingCostUtil.AFTER_21H_PRICE;
      }
    }

    return price;
  }
}
