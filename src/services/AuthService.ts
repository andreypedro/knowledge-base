import { db } from "../config/db";
import { IUser } from "../models/IUser";
import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../core/errors/UnauthorizedError";

const JWT_SECRET = process.env.JWT_SECRET;

export class AuthService {
  async authenticate(email: string, password: string): Promise<string> {
    if (!JWT_SECRET) throw new Error("Missing JWT secret");

    const user = db.data?.users.find((u: IUser) => u.email === email);
    if (!user || user.password !== password) {
      throw new UnauthorizedError("Invalid credentials");
    }

    return jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
  }

  async verifyToken(token: string): Promise<IUser> {
    try {
      if (!JWT_SECRET) throw new Error("Missing JWT secret");

      const decoded = jwt.verify(token, JWT_SECRET) as {
        id: string;
        email: string;
        role: string;
      };
      const user = db.data?.users.find((u: IUser) => u.id === decoded.id);
      if (!user) throw new UnauthorizedError("User not found");
      return user;
    } catch (err) {
      throw new UnauthorizedError("Invalid token");
    }
  }

  async getUserById(id: string): Promise<IUser | undefined> {
    return db.data?.users.find((u: IUser) => u.id === id);
  }
}

export const authService = new AuthService();
