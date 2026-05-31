import { Router } from "express";
import { asyncHandler } from "../middleware/errorHandler.js";
import { requireAuth } from "../middleware/auth.js";
import * as controller from "../controllers/faqs.controller.js";

const router = Router();

router.get("/", asyncHandler(controller.getFaqs));
router.post("/", requireAuth, asyncHandler(controller.createFaq));
router.put("/:id", requireAuth, asyncHandler(controller.updateFaq));
router.delete("/:id", requireAuth, asyncHandler(controller.deleteFaq));

export default router;
