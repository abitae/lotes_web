import { Router } from "express";
import { asyncHandler } from "../middleware/errorHandler.js";
import { requireAuth } from "../middleware/auth.js";
import * as testimonialsController from "../controllers/testimonials.controller.js";

const router = Router();

router.get("/", asyncHandler(testimonialsController.getTestimonials));
router.post("/", requireAuth, asyncHandler(testimonialsController.createTestimonial));
router.put("/:id", requireAuth, asyncHandler(testimonialsController.updateTestimonial));
router.delete("/:id", requireAuth, asyncHandler(testimonialsController.deleteTestimonial));

export default router;
