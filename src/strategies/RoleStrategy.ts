import { Request, Response, NextFunction } from "express";
// import { UserRole } from '../models/IUser';

export interface RoleStrategy {
  canCreateTopic(req: Request): boolean;
  canDeleteTopic(req: Request): boolean;
  canUpdateTopic(req: Request): boolean;
  canEditTopic(req: Request): boolean;
  canViewTopic(req: Request): boolean;
}
