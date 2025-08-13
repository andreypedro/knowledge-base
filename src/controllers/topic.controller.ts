import { NextFunction, Request, Response } from "express";
import { TopicService } from "../services/TopicService";

export const TopicController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, content, parentTopicId } = req.body;

      if (!name || !content) {
        return res
          .status(400)
          .json({ message: "Name and content are required" });
      }

      const newTopic = {
        name,
        content,
        version: 1,
        parentTopicId: parentTopicId || null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const topicService = new TopicService();
      const createdTopic = await topicService.create(newTopic, req.user.id);

      res.status(201).json(createdTopic);
    } catch (err) {
      next(err);
    }
  },
  async get(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    res.json({ message: "Get topic by ID" });
  },
  async update(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    res.json({ message: "Update topic by ID" });
  },
  async delete(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    res.json({ message: "Delete topic by ID" });
  },
  async getTree(req: Request, res: Response, next: NextFunction) {
    res.json({ message: "Get topic tree" });
  },
  async shortestPath(req: Request, res: Response, next: NextFunction) {
    res.json({ message: "Get shortest path" });
  },
};
