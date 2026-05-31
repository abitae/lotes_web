import type { Request, Response } from "express";
import { fetchAllProjects, fetchProjectById } from "../services/webProjects.service.js";
import { mapWebProjectToProject } from "../utils/mapWebProject.js";

export async function getProjects(_req: Request, res: Response) {
  const { projects } = await fetchAllProjects();
  res.json(projects.map(mapWebProjectToProject));
}

export async function getProjectById(req: Request, res: Response) {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const project = await fetchProjectById(id);
  res.json(mapWebProjectToProject(project));
}
