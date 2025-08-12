import { Router } from "express";
import { TopicController } from "../controllers/topic.controller";

const router = Router();

router.post("/topics", TopicController.create);
router.get("/topics/:id", TopicController.get);
router.put("/topics/:id", TopicController.update);
router.delete("/topics/:id", TopicController.delete);
router.get("/topics/tree", TopicController.getTree);
router.get("/topics/shortest-path", TopicController.shortestPath);

export default router;
