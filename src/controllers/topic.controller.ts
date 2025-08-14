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
        parentTopicId: parentTopicId || null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const topicService = new TopicService();
      const createdTopic = await topicService.create(newTopic);

      res.status(201).json(createdTopic);
    } catch (err) {
      next(err);
    }
  },
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const topicService = new TopicService();
      const topic = await topicService.getById(id);
      if (!topic) {
        return res.status(404).json({ message: "Topic not found" });
      }
      res.json(topic);
    } catch (err) {
      next(err);
    }
  },
  async update(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const payload = req.body;

    try {
      const topicService = new TopicService();
      const updatedTopic = await topicService.update(id, payload);
      res.json(updatedTopic);
    } catch (err) {
      next(err);
    }
  },
  async delete(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      const topicService = new TopicService();
      await topicService.delete(id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  },
  async getTree(req: Request, res: Response, next: NextFunction) {
    try {
      const topicService = new TopicService();
      const tree = await topicService.getTree(req.params.id);
      res.json(tree);
    } catch (err) {
      next(err);
    }
  },
  async shortestPath(req: Request, res: Response, next: NextFunction) {
    try {
      const { fromId, toId } = req.body;
      const topicService = new TopicService();
      const path = await topicService.getShortestPath(fromId, toId);
      res.json(path);
    } catch (err) {
      next(err);
    }
  },
};
