import { Router } from "express";
import { TopicController } from "../controllers/topic.controller";
import { authorize } from "../middleware/role.middleware";
import { ResourceController } from "../controllers/resource.controller";

const router = Router();

router.post("/", authorize("canCreateTopic"), TopicController.create);
router.put("/:id", authorize("canUpdateTopic"), TopicController.update);
router.delete("/:id", authorize("canDeleteTopic"), TopicController.delete);
router.get(
  "/shortest-path",
  authorize("canViewTopic"),
  TopicController.shortestPath
);
router.get("/:id", authorize("canViewTopic"), TopicController.get);
router.get("/:id/tree", authorize("canViewTopic"), TopicController.getTree);
router.get(
  "/:id/resources",
  authorize("canViewTopic"),
  ResourceController.listByTopic
);

export default router;
