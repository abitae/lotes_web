import type { Request, Response } from "express";
import { randomUUID } from "crypto";
import { pool } from "../config/db.js";
import { AppError } from "../middleware/errorHandler.js";
import { mapTestimonial } from "../utils/mappers.js";
import type { TestimonialRow } from "../types/index.js";

export async function getTestimonials(_req: Request, res: Response) {
  const [rows] = await pool.query("SELECT * FROM testimonials ORDER BY created_at DESC");
  res.json((rows as TestimonialRow[]).map(mapTestimonial));
}

export async function createTestimonial(req: Request, res: Response) {
  const { name, role, stars, quote, projectPurchased, avatarUrl } = req.body;

  if (!name || !role || !quote || !projectPurchased || !avatarUrl) {
    throw new AppError(400, "name, role, quote, projectPurchased y avatarUrl son requeridos");
  }

  const id = randomUUID();

  await pool.query(
    `INSERT INTO testimonials (id, name, role, stars, quote, project_purchased, avatar_url)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [id, name, role, stars ?? 5, quote, projectPurchased, avatarUrl]
  );

  const [rows] = await pool.query("SELECT * FROM testimonials WHERE id = ?", [id]);
  res.status(201).json(mapTestimonial((rows as TestimonialRow[])[0]));
}

export async function updateTestimonial(req: Request, res: Response) {
  const [existing] = await pool.query("SELECT * FROM testimonials WHERE id = ?", [req.params.id]);
  if (!(existing as TestimonialRow[])[0]) {
    throw new AppError(404, "Testimonio no encontrado");
  }

  const body = req.body;
  const fields: string[] = [];
  const values: unknown[] = [];

  const mapping: Record<string, string> = {
    name: "name",
    role: "role",
    stars: "stars",
    quote: "quote",
    projectPurchased: "project_purchased",
    avatarUrl: "avatar_url",
  };

  for (const [key, column] of Object.entries(mapping)) {
    if (body[key] !== undefined) {
      fields.push(`${column} = ?`);
      values.push(body[key]);
    }
  }

  if (fields.length === 0) {
    throw new AppError(400, "No hay campos para actualizar");
  }

  values.push(req.params.id);
  await pool.query(`UPDATE testimonials SET ${fields.join(", ")} WHERE id = ?`, values);

  const [rows] = await pool.query("SELECT * FROM testimonials WHERE id = ?", [req.params.id]);
  res.json(mapTestimonial((rows as TestimonialRow[])[0]));
}

export async function deleteTestimonial(req: Request, res: Response) {
  const [result] = await pool.query("DELETE FROM testimonials WHERE id = ?", [req.params.id]);
  const affected = (result as { affectedRows: number }).affectedRows;

  if (affected === 0) {
    throw new AppError(404, "Testimonio no encontrado");
  }

  res.status(204).send();
}
