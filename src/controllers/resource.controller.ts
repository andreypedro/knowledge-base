import { NextFunction, Request, Response } from "express";
import { ResourceService } from "../services/ResourceService";

export const ResourceController = {
  async create(req: Request, res: Response, next: NextFunction) {
    const { body } = req;
    try {
      const resourceService = new ResourceService();
      const resource = await resourceService.create(body, req.user.id);
      res.status(201).json(resource);
    } catch (err) {
      next(err);
    }
  },
  async getById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const resourceService = new ResourceService();
      const resource = await resourceService.getById(id);
      res.json(resource);
    } catch (err) {
      next(err);
    }
  },
  async listByTopic(req: Request, res: Response, next: NextFunction) {
    const { id: topicId } = req.params;
    try {
      const resourceService = new ResourceService();
      const resources = await resourceService.listByTopic(topicId);
      res.json(resources);
    } catch (err) {
      next(err);
    }
  },
  async delete(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const resourceService = new ResourceService();
      await resourceService.delete(id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  },
};
