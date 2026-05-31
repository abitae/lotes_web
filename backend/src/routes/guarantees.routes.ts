import { Router } from "express";
import { asyncHandler } from "../middleware/errorHandler.js";
import { requireAuth } from "../middleware/auth.js";
import * as controller from "../controllers/guarantees.controller.js";

const router = Router();

router.get("/", asyncHandler(controller.getGuarantees));
router.put("/section", requireAuth, asyncHandler(controller.updateGuaranteeSection));
router.post("/items", requireAuth, asyncHandler(controller.createGuaranteeItem));
router.put("/items/:id", requireAuth, asyncHandler(controller.updateGuaranteeItem));
router.delete("/items/:id", requireAuth, asyncHandler(controller.deleteGuaranteeItem));

export default router;
