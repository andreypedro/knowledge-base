import { Schema } from "../config/db";
import { UserRole } from "../models/IUser";

export const mockData: Schema = {
  users: [
    {
      id: "1",
      name: "Admin",
      email: "admin@example.com",
      role: UserRole.ADMIN,
      createdAt: new Date("2025-08-12T00:00:00Z"),
    },
    {
      id: "2",
      name: "Editor",
      email: "editor@example.com",
      role: UserRole.EDITOR,
      createdAt: new Date("2025-08-12T00:00:00Z"),
    },
    {
      id: "3",
      name: "Viewer",
      email: "viewer@example.com",
      role: UserRole.VIEWER,
      createdAt: new Date("2025-08-12T00:00:00Z"),
    },
  ],
  topics: [],
  resources: [],
};
