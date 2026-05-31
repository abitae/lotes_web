import { Router } from "express";
import { asyncHandler } from "../middleware/errorHandler.js";
import { requireAuth } from "../middleware/auth.js";
import * as statsController from "../controllers/stats.controller.js";

const router = Router();

router.get("/", requireAuth, asyncHandler(statsController.getStats));

export default router;
