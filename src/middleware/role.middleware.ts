import { Response, NextFunction, Request } from "express";
import { RoleStrategy } from "../strategies/RoleStrategy";
import { StrategyFactory } from "../strategies/StrategyFactory";
import { PermissionError } from "../core/errors/PermissionError";
import { IUser } from "../models/IUser";

export const authorize = (action: keyof RoleStrategy) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user) return next(new PermissionError("User not authenticated"));

    const strategy = StrategyFactory.getStrategy(user.role);
    if (strategy[action](req)) return next();

    next(new PermissionError(`User ${user.role} cannot ${action}`));
  };
};
