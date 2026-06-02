import { Router } from "express";
import { asyncHandler } from "../middleware/errorHandler.js";
import { requireAuth } from "../middleware/auth.js";
import * as controller from "../controllers/about.controller.js";

const router = Router();

router.get("/", asyncHandler(controller.getAbout));
router.put("/page", requireAuth, asyncHandler(controller.updateAboutPage));
router.post("/values", requireAuth, asyncHandler(controller.createAboutValue));
router.put("/values/:id", requireAuth, asyncHandler(controller.updateAboutValue));
router.delete("/values/:id", requireAuth, asyncHandler(controller.deleteAboutValue));
router.post("/advisors", requireAuth, asyncHandler(controller.createExpertAdvisor));
router.put("/advisors/:id", requireAuth, asyncHandler(controller.updateExpertAdvisor));
router.delete("/advisors/:id", requireAuth, asyncHandler(controller.deleteExpertAdvisor));

export default router;
