export enum UserRole {
  ADMIN = "Admin",
  EDITOR = "Editor",
  VIEWER = "Viewer",
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: Date;
}
