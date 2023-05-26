import { Request as Req, Response as Res, NextFunction } from "express";

export interface RequestWithPayload extends Request {
  payload?: Record<string, any>;
}
export type Request = Req;
export type Response = Res;
export type ControllerType<
  T extends string,
  R extends Request = Request
> = MiddlewareType<T, R>;

export type MiddlewareType<T extends string, R extends Request = Request> = {
  [key in T]: HandlerType<R>;
};

export type HandlerType<R = Request> = (
  req: R,
  res: Response,
  next: NextFunction
) => unknown;
