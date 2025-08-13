import { RoleStrategy } from "./RoleStrategy";
import { Request } from "express";

export class AdminStrategy implements RoleStrategy {
  canCreateTopic(_: Request) {
    return true;
  }
  canEditTopic(_: Request) {
    return true;
  }
  canViewTopic(_: Request) {
    return true;
  }
}
