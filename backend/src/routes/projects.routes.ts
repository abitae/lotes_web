import { Router } from "express";
import { asyncHandler } from "../middleware/errorHandler.js";
import { requireAuth } from "../middleware/auth.js";
import * as projectsController from "../controllers/projects.controller.js";

const router = Router();

router.get("/", asyncHandler(projectsController.getProjects));
router.get("/:id", asyncHandler(projectsController.getProjectById));
router.post("/", requireAuth, asyncHandler(projectsController.createProject));
router.put("/:id", requireAuth, asyncHandler(projectsController.updateProject));
router.delete("/:id", requireAuth, asyncHandler(projectsController.deleteProject));

export default router;
