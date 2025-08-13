import { RoleStrategy } from "./RoleStrategy";
import { Request } from "express";

export class ViewerStrategy implements RoleStrategy {
  canCreateTopic(_: Request) {
    return false;
  }
  canEditTopic(_: Request) {
    return false;
  }
  canViewTopic(_: Request) {
    return true;
  }
  canDeleteTopic(_: Request) {
    return false;
  }
  canUpdateTopic(_: Request) {
    return false;
  }
}
