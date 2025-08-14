import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { db } from "../config/db";
import { IUser } from "../models/IUser";
import { UnauthorizedError } from "../core/errors/UnauthorizedError";

declare global {
  namespace Express {
    interface Request {
      user: IUser;
    }
  }
}

const secret = process.env.JWT_SECRET ?? "jwt_secret";

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
    if (!secret) throw new Error("Missing JWT secret");

    const payload = jwt.verify(token, secret) as IUser;

    const user = db.data?.users?.find((u: IUser) => u.id === payload.id);

    if (!user) throw new UnauthorizedError("User not found");

    req.user = user as IUser;
    next();
  } catch (err) {
    next(new UnauthorizedError("Invalid token 2"));
  }
};
