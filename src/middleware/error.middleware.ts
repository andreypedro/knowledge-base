import { Request, Response, NextFunction } from "express";
import { HttpError } from "../core/errors/HttpError";

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof HttpError) {
    res.status(err.statusCode).json({ message: err.message });
  } else {
    res.status(500).json({ message: err.message || "Internal Server Error" });
  }
};
