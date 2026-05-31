import type { Request, Response } from "express";
import { randomUUID } from "crypto";
import { pool } from "../config/db.js";
import { AppError } from "../middleware/errorHandler.js";
import { mapProject } from "../utils/mappers.js";
import type { ProjectRow, ProjectType, ProjectStatus } from "../types/index.js";

export async function getProjects(_req: Request, res: Response) {
  const [rows] = await pool.query("SELECT * FROM projects ORDER BY created_at DESC");
  res.json((rows as ProjectRow[]).map(mapProject));
}

export async function getProjectById(req: Request, res: Response) {
  const [rows] = await pool.query("SELECT * FROM projects WHERE id = ?", [req.params.id]);
  const row = (rows as ProjectRow[])[0];

  if (!row) {
    throw new AppError(404, "Proyecto no encontrado");
  }

  res.json(mapProject(row));
}

export async function createProject(req: Request, res: Response) {
  const body = req.body;
  const id = randomUUID();

  const required = ["title", "location", "region", "projectType", "surface", "priceSoles", "priceDollars", "status", "imageUrl", "description", "totalLots", "availableLots"];
  for (const field of required) {
    if (body[field] === undefined || body[field] === null || body[field] === "") {
      throw new AppError(400, `Campo requerido: ${field}`);
    }
  }

  const lat = body.coordinates?.lat ?? body.lat;
  const lng = body.coordinates?.lng ?? body.lng;

  if (lat === undefined || lng === undefined) {
    throw new AppError(400, "Coordenadas (lat/lng) son requeridas");
  }

  await pool.query(
    `INSERT INTO projects (id, title, location, region, project_type, surface, price_soles, price_dollars, status, image_url, lat, lng, description, features, featured, total_lots, available_lots)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      body.title,
      body.location,
      body.region,
      body.projectType as ProjectType,
      body.surface,
      body.priceSoles,
      body.priceDollars,
      body.status as ProjectStatus,
      body.imageUrl,
      lat,
      lng,
      body.description,
      JSON.stringify(body.features ?? []),
      body.featured ? 1 : 0,
      body.totalLots,
      body.availableLots,
    ]
  );

  const [rows] = await pool.query("SELECT * FROM projects WHERE id = ?", [id]);
  res.status(201).json(mapProject((rows as ProjectRow[])[0]));
}

export async function updateProject(req: Request, res: Response) {
  const [existing] = await pool.query("SELECT * FROM projects WHERE id = ?", [req.params.id]);
  if (!(existing as ProjectRow[])[0]) {
    throw new AppError(404, "Proyecto no encontrado");
  }

  const body = req.body;
  const fields: string[] = [];
  const values: unknown[] = [];

  const mapping: Record<string, string> = {
    title: "title",
    location: "location",
    region: "region",
    projectType: "project_type",
    surface: "surface",
    priceSoles: "price_soles",
    priceDollars: "price_dollars",
    status: "status",
    imageUrl: "image_url",
    description: "description",
    featured: "featured",
    totalLots: "total_lots",
    availableLots: "available_lots",
  };

  for (const [key, column] of Object.entries(mapping)) {
    if (body[key] !== undefined) {
      fields.push(`${column} = ?`);
      values.push(key === "featured" ? (body[key] ? 1 : 0) : body[key]);
    }
  }

  if (body.features !== undefined) {
    fields.push("features = ?");
    values.push(JSON.stringify(body.features));
  }

  if (body.coordinates?.lat !== undefined || body.lat !== undefined) {
    fields.push("lat = ?");
    values.push(body.coordinates?.lat ?? body.lat);
  }

  if (body.coordinates?.lng !== undefined || body.lng !== undefined) {
    fields.push("lng = ?");
    values.push(body.coordinates?.lng ?? body.lng);
  }

  if (fields.length === 0) {
    throw new AppError(400, "No hay campos para actualizar");
  }

  values.push(req.params.id);
  await pool.query(`UPDATE projects SET ${fields.join(", ")} WHERE id = ?`, values);

  const [rows] = await pool.query("SELECT * FROM projects WHERE id = ?", [req.params.id]);
  res.json(mapProject((rows as ProjectRow[])[0]));
}

export async function deleteProject(req: Request, res: Response) {
  const [result] = await pool.query("DELETE FROM projects WHERE id = ?", [req.params.id]);
  const affected = (result as { affectedRows: number }).affectedRows;

  if (affected === 0) {
    throw new AppError(404, "Proyecto no encontrado");
  }

  res.status(204).send();
}
