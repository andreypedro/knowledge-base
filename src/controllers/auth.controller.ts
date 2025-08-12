import { Request, Response } from "express";

export const AuthController = {
  async login(req: Request, res: Response) {
    const { email } = req.body;

    if (!email) {
      throw new Error("Email is required");
    }
    // TODO: Implement login logic
    res.json({ message: "Login successful" });
  },
};
