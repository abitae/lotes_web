import { Router } from "express";
import { asyncHandler } from "../middleware/errorHandler.js";
import { requireAuth } from "../middleware/auth.js";
import * as controller from "../controllers/channels.controller.js";

const router = Router();

router.get("/", asyncHandler(controller.getChannels));
router.post("/", requireAuth, asyncHandler(controller.createChannel));
router.put("/:id", requireAuth, asyncHandler(controller.updateChannel));
router.delete("/:id", requireAuth, asyncHandler(controller.deleteChannel));

export default router;
