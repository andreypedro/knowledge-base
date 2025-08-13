import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { db } from "../config/db";
import { IUser } from "../models/IUser";
import { UnauthorizedError } from "../core/errors/UnauthorizedError";

const secret = process.env.JWT_SECRET ?? "dev-secret";

export const authMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer "))
    return next(new UnauthorizedError("Missing token"));

  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, secret) as { sub: string };
    const user = db.data?.users?.find(
      (u: IUser) => u.id === payload.sub
    ) as IUser;
    if (!user) throw new UnauthorizedError("User not found");

    req.user = user;
    next();
  } catch (err) {
    next(new UnauthorizedError("Invalid token"));
  }
};
