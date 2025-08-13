import { RoleStrategy } from "./RoleStrategy";
import { Request } from "express";

export class EditorStrategy implements RoleStrategy {
  canCreateTopic(_: Request) {
    return true;
  }
  canEditTopic(_: Request) {
    return true;
  }
  canViewTopic(_: Request) {
    return true;
  }
  canDeleteTopic(_: Request) {
    return false;
  }
  canUpdateTopic(_: Request) {
    return true;
  }
}
