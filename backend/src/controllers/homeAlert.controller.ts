import type { Request, Response } from "express";
import { pool } from "../config/db.js";
import { AppError } from "../middleware/errorHandler.js";
import { mapHomeAlertModal } from "../utils/siteContentMappers.js";
import type { HomeAlertModalRow } from "../types/index.js";

export async function getHomeAlert(_req: Request, res: Response) {
  const [rows] = await pool.query("SELECT * FROM home_alert_modal WHERE id = 1");
  const row = (rows as HomeAlertModalRow[])[0];
  if (!row) throw new AppError(404, "Modal de aviso no configurado");
  res.json(mapHomeAlertModal(row));
}

export async function updateHomeAlert(req: Request, res: Response) {
  const body = req.body;
  const fields: string[] = [];
  const values: unknown[] = [];

  const mapping: Record<string, string> = {
    isEnabled: "is_enabled",
    title: "title",
    description: "description",
    imageUrl: "image_url",
    videoUrl: "video_url",
    buttonText: "button_text",
    buttonLink: "button_link",
  };

  for (const [key, column] of Object.entries(mapping)) {
    if (body[key] !== undefined) {
      fields.push(`${column} = ?`);
      values.push(key === "isEnabled" ? Boolean(body[key]) : body[key]);
    }
  }

  if (fields.length === 0) throw new AppError(400, "No hay campos para actualizar");

  await pool.query(`UPDATE home_alert_modal SET ${fields.join(", ")} WHERE id = 1`, values);
  const [rows] = await pool.query("SELECT * FROM home_alert_modal WHERE id = 1");
  res.json(mapHomeAlertModal((rows as HomeAlertModalRow[])[0]));
}
