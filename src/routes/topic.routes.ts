import { Router } from "express";
import { TopicController } from "../controllers/topic.controller";
import { authorize } from "../middleware/role.middleware";

const router = Router();

router.post("/", authorize("canCreateTopic"), TopicController.create);
router.get("/:id", authorize("canViewTopic"), TopicController.get);
router.put("/:id", authorize("canUpdateTopic"), TopicController.update);
router.delete("/:id", authorize("canDeleteTopic"), TopicController.delete);
router.get("/tree", authorize("canViewTopic"), TopicController.getTree);
router.get(
  "/shortest-path",
  authorize("canViewTopic"),
  TopicController.shortestPath
);

export default router;
