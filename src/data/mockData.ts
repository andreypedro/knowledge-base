import { Schema } from "../config/db";
import { UserRole } from "../models/IUser";

export const mockData: Schema = {
  users: [
    {
      id: "1",
      name: "Andrey",
      email: "andrey@andrey.com.br",
      role: UserRole.ADMIN,
      createdAt: new Date("2025-08-12T00:00:00Z"),
    },
  ],
  topics: [],
  resources: [],
};
