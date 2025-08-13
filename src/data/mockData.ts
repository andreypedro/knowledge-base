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
  topics: [
    {
      id: "a1e2b3c4-1111-2222-3333-444455556666",
      name: "Root Topic",
      content: "This is the root topic.",
      version: 1,
      parentTopicId: null,
      createdAt: new Date("2025-08-12T10:00:00Z"),
      updatedAt: new Date("2025-08-12T10:00:00Z"),
    },
    {
      id: "b2c3d4e5-7777-8888-9999-000011112222",
      name: "Child Topic 1",
      content: "This is the first child topic.",
      version: 1,
      parentTopicId: "a1e2b3c4-1111-2222-3333-444455556666",
      createdAt: new Date("2025-08-12T11:00:00Z"),
      updatedAt: new Date("2025-08-12T11:00:00Z"),
    },
    {
      id: "c3d4e5f6-3333-4444-5555-666677778888",
      name: "Child Topic 2",
      content: "This is the second child topic.",
      version: 1,
      parentTopicId: "a1e2b3c4-1111-2222-3333-444455556666",
      createdAt: new Date("2025-08-12T12:00:00Z"),
      updatedAt: new Date("2025-08-12T12:00:00Z"),
    },
    {
      id: "d4e5f6a7-9999-aaaa-bbbb-ccccddddeeee",
      name: "Grandchild Topic",
      content: "This is a grandchild topic.",
      version: 1,
      parentTopicId: "b2c3d4e5-7777-8888-9999-000011112222",
      createdAt: new Date("2025-08-12T13:00:00Z"),
      updatedAt: new Date("2025-08-12T13:00:00Z"),
    },
    {
      id: "e5f6a7b8-aaaa-bbbb-cccc-ddddeeeeffff",
      name: "Great-Grandchild Topic",
      content: "This is a great-grandchild topic.",
      version: 1,
      parentTopicId: "d4e5f6a7-9999-aaaa-bbbb-ccccddddeeee",
      createdAt: new Date("2025-08-12T14:00:00Z"),
      updatedAt: new Date("2025-08-12T14:00:00Z"),
    },
  ],
  resources: [],
};
