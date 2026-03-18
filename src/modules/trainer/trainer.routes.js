import { Router } from "express";
import { getTrainers, getTrainer, addTrainer, editTrainer, removeTrainer } from "./trainer.controller.js";

const router = Router();

router.get("/", getTrainers);
router.get("/:id", getTrainer);
router.post("/", addTrainer);
router.put("/:id", editTrainer);
router.delete("/:id", removeTrainer);

export default router;
