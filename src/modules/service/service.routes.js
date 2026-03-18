import { Router } from "express";
import { getServices, getService, addService, editService, removeService } from "./service.controller.js";

const router = Router();

router.get("/", getServices);
router.get("/:id", getService);
router.post("/", addService);
router.put("/:id", editService);
router.delete("/:id", removeService);

export default router;
