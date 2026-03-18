import { Router } from "express";
import { submitContact, getContacts, removeContact } from "./contact.controller.js";
import { contactValidation } from "./contact.validation.js";
import validate from "../../middlewares/validate.middleware.js";

const router = Router();

router.post("/", contactValidation, validate, submitContact);
router.get("/", getContacts);
router.delete("/:id", removeContact);

export default router;
