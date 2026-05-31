import { Router } from "express";
import { asyncHandler } from "../middleware/errorHandler.js";
import { requireAuth } from "../middleware/auth.js";
import * as controller from "../controllers/siteSettings.controller.js";

const router = Router();

router.get("/", asyncHandler(controller.getSiteSettings));
router.put("/", requireAuth, asyncHandler(controller.updateSiteSettings));

export default router;
