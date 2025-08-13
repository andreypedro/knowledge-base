import { Router } from "express";
import { TopicController } from "../controllers/topic.controller";
import { authorize } from "../middleware/role.middleware";

const router = Router();

router.post("/", authorize("canCreateTopic"), TopicController.create);
router.get("/:id", TopicController.get);
router.put("/:id", TopicController.update);
router.delete("/:id", TopicController.delete);
router.get("/tree", TopicController.getTree);
router.get("/shortest-path", TopicController.shortestPath);

export default router;
