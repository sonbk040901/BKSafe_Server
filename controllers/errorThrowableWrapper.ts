import { HandlerType } from "../types";
export const errorThrowableWrapper =
  (handler: HandlerType): HandlerType =>
  (req, res, next) =>
    handler(req, res, next).catch(next);
export const errorThrowableWrappers = <R extends string>(
  handlers: Record<R, HandlerType>
): Record<R, HandlerType> => {
  const result: Record<string, HandlerType> = {};
  for (const key in handlers) {
    result[key] = errorThrowableWrapper(handlers[key]);
  }
  return result;
};
