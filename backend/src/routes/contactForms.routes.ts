import { Router } from "express";
import { asyncHandler } from "../middleware/errorHandler.js";
import { requireAuth } from "../middleware/auth.js";
import * as controller from "../controllers/contactForms.controller.js";

const router = Router();

router.get("/", asyncHandler(controller.getContactForms));
router.put("/:slug", requireAuth, asyncHandler(controller.updateContactForm));

export default router;
