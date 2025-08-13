import { RoleStrategy } from "./RoleStrategy";
import { AdminStrategy } from "./AdminStrategy";
import { EditorStrategy } from "./EditorStrategy";
import { ViewerStrategy } from "./ViewerStrategy";
import { UserRole } from "../models/IUser";

export class StrategyFactory {
  static getStrategy(role: UserRole): RoleStrategy {
    switch (role) {
      case UserRole.ADMIN:
        return new AdminStrategy();
      case UserRole.EDITOR:
        return new EditorStrategy();
      case UserRole.VIEWER:
        return new ViewerStrategy();
      default:
        throw new Error("Role not supported");
    }
  }
}
