import type { Request, Response } from "express";
import { randomUUID } from "crypto";
import { pool } from "../config/db.js";
import { AppError } from "../middleware/errorHandler.js";
import {
  mapAboutPage,
  mapAboutValue,
  mapExpertAdvisor,
} from "../utils/siteContentMappers.js";
import type { AboutPageRow, AboutValueRow, ExpertAdvisorRow } from "../types/index.js";

export async function getAbout(_req: Request, res: Response) {
  const [pageRows] = await pool.query("SELECT * FROM about_page WHERE id = 1");
  const page = (pageRows as AboutPageRow[])[0];
  if (!page) throw new AppError(404, "Contenido de la página Nosotros no encontrado");

  const [valueRows] = await pool.query(
    "SELECT * FROM about_values ORDER BY sort_order ASC, created_at ASC"
  );
  const [advisorRows] = await pool.query(
    "SELECT * FROM expert_advisors ORDER BY sort_order ASC, created_at ASC"
  );

  res.json({
    page: mapAboutPage(page),
    values: (valueRows as AboutValueRow[]).map(mapAboutValue),
    advisors: (advisorRows as ExpertAdvisorRow[]).map(mapExpertAdvisor),
  });
}

export async function updateAboutPage(req: Request, res: Response) {
  const body = req.body;
  const fields: string[] = [];
  const values: unknown[] = [];

  const mapping: Record<string, string> = {
    heroEyebrow: "hero_eyebrow",
    heroHeading: "hero_heading",
    heroDescription: "hero_description",
    heroBackgroundImageUrl: "hero_background_image_url",
    missionHeading: "mission_heading",
    missionDescription: "mission_description",
    visionHeading: "vision_heading",
    visionDescription: "vision_description",
    valuesEyebrow: "values_eyebrow",
    valuesHeading: "values_heading",
    valuesDescription: "values_description",
    advisorsEyebrow: "advisors_eyebrow",
    advisorsHeading: "advisors_heading",
    advisorsDescription: "advisors_description",
  };

  for (const [key, column] of Object.entries(mapping)) {
    if (body[key] !== undefined) {
      fields.push(`${column} = ?`);
      values.push(body[key]);
    }
  }

  if (fields.length === 0) throw new AppError(400, "No hay campos para actualizar");

  await pool.query(`UPDATE about_page SET ${fields.join(", ")} WHERE id = 1`, values);
  const [rows] = await pool.query("SELECT * FROM about_page WHERE id = 1");
  res.json(mapAboutPage((rows as AboutPageRow[])[0]));
}

export async function createAboutValue(req: Request, res: Response) {
  const { icon, title, description, sortOrder, isActive } = req.body;
  if (!icon || !title || !description) {
    throw new AppError(400, "icon, title y description son requeridos");
  }

  const id = randomUUID();
  await pool.query(
    `INSERT INTO about_values (id, icon, title, description, sort_order, is_active)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [id, icon, title, description, sortOrder ?? 0, isActive !== false ? 1 : 0]
  );

  const [rows] = await pool.query("SELECT * FROM about_values WHERE id = ?", [id]);
  res.status(201).json(mapAboutValue((rows as AboutValueRow[])[0]));
}

export async function updateAboutValue(req: Request, res: Response) {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const [existing] = await pool.query("SELECT * FROM about_values WHERE id = ?", [id]);
  if (!(existing as AboutValueRow[])[0]) throw new AppError(404, "Valor no encontrado");

  const body = req.body;
  const fields: string[] = [];
  const values: unknown[] = [];

  const mapping: Record<string, string> = {
    icon: "icon",
    title: "title",
    description: "description",
    sortOrder: "sort_order",
    isActive: "is_active",
  };

  for (const [key, column] of Object.entries(mapping)) {
    if (body[key] !== undefined) {
      fields.push(`${column} = ?`);
      values.push(key === "isActive" ? (body[key] ? 1 : 0) : body[key]);
    }
  }

  if (fields.length === 0) throw new AppError(400, "No hay campos para actualizar");

  values.push(id);
  await pool.query(`UPDATE about_values SET ${fields.join(", ")} WHERE id = ?`, values);

  const [rows] = await pool.query("SELECT * FROM about_values WHERE id = ?", [id]);
  res.json(mapAboutValue((rows as AboutValueRow[])[0]));
}

export async function deleteAboutValue(req: Request, res: Response) {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const [result] = await pool.query("DELETE FROM about_values WHERE id = ?", [id]);
  if ((result as { affectedRows: number }).affectedRows === 0) {
    throw new AppError(404, "Valor no encontrado");
  }
  res.status(204).send();
}

export async function createExpertAdvisor(req: Request, res: Response) {
  const { name, role, bio, imageUrl, sortOrder, isActive } = req.body;
  if (!name || !role || !bio || !imageUrl) {
    throw new AppError(400, "name, role, bio e imageUrl son requeridos");
  }

  const id = randomUUID();
  await pool.query(
    `INSERT INTO expert_advisors (id, name, role, bio, image_url, sort_order, is_active)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [id, name, role, bio, imageUrl, sortOrder ?? 0, isActive !== false ? 1 : 0]
  );

  const [rows] = await pool.query("SELECT * FROM expert_advisors WHERE id = ?", [id]);
  res.status(201).json(mapExpertAdvisor((rows as ExpertAdvisorRow[])[0]));
}

export async function updateExpertAdvisor(req: Request, res: Response) {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const [existing] = await pool.query("SELECT * FROM expert_advisors WHERE id = ?", [id]);
  if (!(existing as ExpertAdvisorRow[])[0]) throw new AppError(404, "Asesor no encontrado");

  const body = req.body;
  const fields: string[] = [];
  const values: unknown[] = [];

  const mapping: Record<string, string> = {
    name: "name",
    role: "role",
    bio: "bio",
    imageUrl: "image_url",
    sortOrder: "sort_order",
    isActive: "is_active",
  };

  for (const [key, column] of Object.entries(mapping)) {
    if (body[key] !== undefined) {
      fields.push(`${column} = ?`);
      values.push(key === "isActive" ? (body[key] ? 1 : 0) : body[key]);
    }
  }

  if (fields.length === 0) throw new AppError(400, "No hay campos para actualizar");

  values.push(id);
  await pool.query(`UPDATE expert_advisors SET ${fields.join(", ")} WHERE id = ?`, values);

  const [rows] = await pool.query("SELECT * FROM expert_advisors WHERE id = ?", [id]);
  res.json(mapExpertAdvisor((rows as ExpertAdvisorRow[])[0]));
}

export async function deleteExpertAdvisor(req: Request, res: Response) {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const [result] = await pool.query("DELETE FROM expert_advisors WHERE id = ?", [id]);
  if ((result as { affectedRows: number }).affectedRows === 0) {
    throw new AppError(404, "Asesor no encontrado");
  }
  res.status(204).send();
}
