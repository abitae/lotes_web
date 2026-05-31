import { Router } from "express";
import { asyncHandler } from "../middleware/errorHandler.js";
import { requireAuth } from "../middleware/auth.js";
import * as bannersController from "../controllers/banners.controller.js";

const router = Router();

router.get("/", asyncHandler(bannersController.getBanners));
router.post("/", requireAuth, asyncHandler(bannersController.createBanner));
router.put("/:id", requireAuth, asyncHandler(bannersController.updateBanner));
router.delete("/:id", requireAuth, asyncHandler(bannersController.deleteBanner));

export default router;
