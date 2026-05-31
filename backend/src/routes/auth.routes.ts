import { Router } from "express";
import { asyncHandler } from "../middleware/errorHandler.js";
import { requireAuth } from "../middleware/auth.js";
import * as authController from "../controllers/auth.controller.js";

const router = Router();

router.post("/login", asyncHandler(authController.login));
router.get("/me", requireAuth, asyncHandler(authController.me));

export default router;
