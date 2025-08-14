import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../core/errors/UnauthorizedError";
import { authService } from "../services/AuthService";

export const AuthController = {
  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw new UnauthorizedError("Email and password are required");
      }
      const token = await authService.authenticate(email, password);
      res.json({ token });
    } catch (err) {
      next(err);
    }
  },
};
