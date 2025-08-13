import { Router } from "express";
import { authorize } from "../middleware/role.middleware";
import { ResourceController } from "../controllers/resource.controller";

const router = Router();

router.get("/:id", authorize("canViewTopic"), ResourceController.getById);
router.delete("/:id", authorize("canDeleteTopic"), ResourceController.delete);
router.post("/", authorize("canCreateTopic"), ResourceController.create);

export default router;
