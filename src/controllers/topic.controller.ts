import { NextFunction, Request, Response } from "express";

export const TopicController = {
  async create(req: Request, res: Response, next: NextFunction) {},
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
