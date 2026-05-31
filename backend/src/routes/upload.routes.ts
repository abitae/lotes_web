import { Router } from "express";
import { asyncHandler } from "../middleware/errorHandler.js";
import { requireAuth } from "../middleware/auth.js";
import { uploadMiddleware, uploadFile } from "../controllers/upload.controller.js";

const router = Router();

router.post("/", requireAuth, uploadMiddleware, asyncHandler(uploadFile));

export default router;
