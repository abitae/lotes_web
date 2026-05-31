import type { Request, Response } from "express";
import { randomUUID } from "crypto";
import { pool } from "../config/db.js";
import { AppError } from "../middleware/errorHandler.js";
import { mapBanner } from "../utils/mappers.js";
import type { BannerRow } from "../types/index.js";

export async function getBanners(_req: Request, res: Response) {
  const [rows] = await pool.query("SELECT * FROM banners ORDER BY created_at ASC");
  res.json((rows as BannerRow[]).map(mapBanner));
}

export async function createBanner(req: Request, res: Response) {
  const { title, subtitle, buttonText, imageUrl, badgeText, isActive } = req.body;

  if (!title || !subtitle || !buttonText || !imageUrl) {
    throw new AppError(400, "title, subtitle, buttonText e imageUrl son requeridos");
  }

  const id = randomUUID();

  await pool.query(
    `INSERT INTO banners (id, title, subtitle, button_text, image_url, badge_text, is_active)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [id, title, subtitle, buttonText, imageUrl, badgeText ?? null, isActive !== false ? 1 : 0]
  );

  const [rows] = await pool.query("SELECT * FROM banners WHERE id = ?", [id]);
  res.status(201).json(mapBanner((rows as BannerRow[])[0]));
}

export async function updateBanner(req: Request, res: Response) {
  const [existing] = await pool.query("SELECT * FROM banners WHERE id = ?", [req.params.id]);
  if (!(existing as BannerRow[])[0]) {
    throw new AppError(404, "Banner no encontrado");
  }

  const body = req.body;
  const fields: string[] = [];
  const values: unknown[] = [];

  const mapping: Record<string, string> = {
    title: "title",
    subtitle: "subtitle",
    buttonText: "button_text",
    imageUrl: "image_url",
    badgeText: "badge_text",
    isActive: "is_active",
  };

  for (const [key, column] of Object.entries(mapping)) {
    if (body[key] !== undefined) {
      fields.push(`${column} = ?`);
      values.push(key === "isActive" ? (body[key] ? 1 : 0) : body[key]);
    }
  }

  if (fields.length === 0) {
    throw new AppError(400, "No hay campos para actualizar");
  }

  values.push(req.params.id);
  await pool.query(`UPDATE banners SET ${fields.join(", ")} WHERE id = ?`, values);

  const [rows] = await pool.query("SELECT * FROM banners WHERE id = ?", [req.params.id]);
  res.json(mapBanner((rows as BannerRow[])[0]));
}

export async function deleteBanner(req: Request, res: Response) {
  const [result] = await pool.query("DELETE FROM banners WHERE id = ?", [req.params.id]);
  const affected = (result as { affectedRows: number }).affectedRows;

  if (affected === 0) {
    throw new AppError(404, "Banner no encontrado");
  }

  res.status(204).send();
}
