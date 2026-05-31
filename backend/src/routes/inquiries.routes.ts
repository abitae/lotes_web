import { Router } from "express";
import { asyncHandler } from "../middleware/errorHandler.js";
import { requireAuth } from "../middleware/auth.js";
import * as inquiriesController from "../controllers/inquiries.controller.js";

const router = Router();

router.get("/", requireAuth, asyncHandler(inquiriesController.getInquiries));
router.post("/", asyncHandler(inquiriesController.createInquiry));
router.patch("/:id", requireAuth, asyncHandler(inquiriesController.updateInquiry));
router.delete("/:id", requireAuth, asyncHandler(inquiriesController.deleteInquiry));

export default router;
