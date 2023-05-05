import { Request, Response, NextFunction } from "express";

type ControllerMethodType = (
  req: Request,
  res: Response,
  next: NextFunction
) => void | Promise<void>;

export default interface IController {
  // create(req: Request, res: Response, next: NextFunction): void | Promise<void>;
  // get(req: Request, res: Response, next: NextFunction): void | Promise<void>;
  // update(req: Request, res: Response, next: NextFunction): void | Promise<void>;
  // delete(req: Request, res: Response, next: NextFunction): void | Promise<void>;
}
