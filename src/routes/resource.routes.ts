import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "Resource route" });
});

export default router;
