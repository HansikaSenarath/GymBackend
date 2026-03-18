import { Router } from "express";
import { getMemberships, getMembership, addMembership, editMembership, removeMembership } from "./membership.controller.js";

const router = Router();

router.get("/", getMemberships);
router.get("/:id", getMembership);
router.post("/", addMembership);
router.put("/:id", editMembership);
router.delete("/:id", removeMembership);

export default router;
