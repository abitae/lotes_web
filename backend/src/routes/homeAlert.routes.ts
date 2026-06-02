import { Router } from "express";
import { asyncHandler } from "../middleware/errorHandler.js";
import { requireAuth } from "../middleware/auth.js";
import * as controller from "../controllers/homeAlert.controller.js";

const router = Router();

router.get("/", asyncHandler(controller.getHomeAlert));
router.put("/", requireAuth, asyncHandler(controller.updateHomeAlert));

export default router;
