import type { Request, Response } from "express";
import { randomUUID } from "crypto";
import { pool } from "../config/db.js";
import { AppError } from "../middleware/errorHandler.js";
import { mapFaq } from "../utils/siteContentMappers.js";
import type { FaqRow } from "../types/index.js";

export async function getFaqs(_req: Request, res: Response) {
  const [rows] = await pool.query("SELECT * FROM faqs ORDER BY sort_order ASC, created_at ASC");
  res.json((rows as FaqRow[]).map(mapFaq));
}

export async function createFaq(req: Request, res: Response) {
  const { question, answer, sortOrder, isActive } = req.body;
  if (!question || !answer) throw new AppError(400, "question y answer son requeridos");

  const id = randomUUID();
  await pool.query(
    `INSERT INTO faqs (id, question, answer, sort_order, is_active)
     VALUES (?, ?, ?, ?, ?)`,
    [id, question, answer, sortOrder ?? 0, isActive !== false]
  );

  const [rows] = await pool.query("SELECT * FROM faqs WHERE id = ?", [id]);
  res.status(201).json(mapFaq((rows as FaqRow[])[0]));
}

export async function updateFaq(req: Request, res: Response) {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const [existing] = await pool.query("SELECT * FROM faqs WHERE id = ?", [id]);
  if (!(existing as FaqRow[])[0]) throw new AppError(404, "FAQ no encontrada");

  const body = req.body;
  const fields: string[] = [];
  const values: unknown[] = [];

  const mapping: Record<string, string> = {
    question: "question",
    answer: "answer",
    sortOrder: "sort_order",
    isActive: "is_active",
  };

  for (const [key, column] of Object.entries(mapping)) {
    if (body[key] !== undefined) {
      fields.push(`${column} = ?`);
      values.push(key === "isActive" ? Boolean(body[key]) : body[key]);
    }
  }

  if (fields.length === 0) throw new AppError(400, "No hay campos para actualizar");

  values.push(id);
  await pool.query(`UPDATE faqs SET ${fields.join(", ")} WHERE id = ?`, values);

  const [rows] = await pool.query("SELECT * FROM faqs WHERE id = ?", [id]);
  res.json(mapFaq((rows as FaqRow[])[0]));
}

export async function deleteFaq(req: Request, res: Response) {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const [, result] = await pool.query("DELETE FROM faqs WHERE id = ?", [id]);
  if ((result as { affectedRows: number }).affectedRows === 0) {
    throw new AppError(404, "FAQ no encontrada");
  }
  res.status(204).send();
}
