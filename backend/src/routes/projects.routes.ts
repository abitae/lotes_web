import { Router } from "express";
import { asyncHandler } from "../middleware/errorHandler.js";
import * as projectsController from "../controllers/projects.controller.js";

const router = Router();

router.get("/", asyncHandler(projectsController.getProjects));
router.get("/:id", asyncHandler(projectsController.getProjectById));

export default router;
