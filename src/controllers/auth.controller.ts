import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../core/errors/UnauthorizedError";

const secret = process.env.JWT_SECRET ?? "dev-secret";
const expiresIn = "1h";

export const login = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body;

    if (!email) {
      throw new UnauthorizedError("Email is required");
    }

    const user = {
      id: 1,
      email,
    };
    if (!user) {
      throw new UnauthorizedError("Invalid credentials");
    }

    const token = jwt.sign({ sub: user.id }, secret, { expiresIn });

    res.json({ token });
  } catch (err) {
    next(err);
  }
};
