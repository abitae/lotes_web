import type { Request, Response } from "express";
import { randomUUID } from "crypto";
import { pool } from "../config/db.js";
import { AppError } from "../middleware/errorHandler.js";
import {
  mapGuaranteeItem,
  mapGuaranteeSection,
} from "../utils/siteContentMappers.js";
import type { GuaranteeItemRow, GuaranteeSectionRow } from "../types/index.js";

export async function getGuarantees(_req: Request, res: Response) {
  const [sectionRows] = await pool.query("SELECT * FROM guarantee_section WHERE id = 1");
  const section = (sectionRows as GuaranteeSectionRow[])[0];
  if (!section) throw new AppError(404, "Sección de garantías no encontrada");

  const [itemRows] = await pool.query(
    "SELECT * FROM guarantee_items ORDER BY sort_order ASC, created_at ASC"
  );

  res.json({
    section: mapGuaranteeSection(section),
    items: (itemRows as GuaranteeItemRow[]).map(mapGuaranteeItem),
  });
}

export async function updateGuaranteeSection(req: Request, res: Response) {
  const body = req.body;
  const fields: string[] = [];
  const values: unknown[] = [];

  const mapping: Record<string, string> = {
    eyebrow: "eyebrow",
    heading: "heading",
    description: "description",
    backgroundImageUrl: "background_image_url",
  };

  for (const [key, column] of Object.entries(mapping)) {
    if (body[key] !== undefined) {
      fields.push(`${column} = ?`);
      values.push(body[key]);
    }
  }

  if (fields.length === 0) throw new AppError(400, "No hay campos para actualizar");

  await pool.query(`UPDATE guarantee_section SET ${fields.join(", ")} WHERE id = 1`, values);
  const [rows] = await pool.query("SELECT * FROM guarantee_section WHERE id = 1");
  res.json(mapGuaranteeSection((rows as GuaranteeSectionRow[])[0]));
}

export async function createGuaranteeItem(req: Request, res: Response) {
  const { icon, title, description, sortOrder, isActive } = req.body;
  if (!icon || !title || !description) {
    throw new AppError(400, "icon, title y description son requeridos");
  }

  const id = randomUUID();
  await pool.query(
    `INSERT INTO guarantee_items (id, icon, title, description, sort_order, is_active)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [id, icon, title, description, sortOrder ?? 0, isActive !== false ? 1 : 0]
  );

  const [rows] = await pool.query("SELECT * FROM guarantee_items WHERE id = ?", [id]);
  res.status(201).json(mapGuaranteeItem((rows as GuaranteeItemRow[])[0]));
}

export async function updateGuaranteeItem(req: Request, res: Response) {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const [existing] = await pool.query("SELECT * FROM guarantee_items WHERE id = ?", [id]);
  if (!(existing as GuaranteeItemRow[])[0]) throw new AppError(404, "Tarjeta no encontrada");

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
  await pool.query(`UPDATE guarantee_items SET ${fields.join(", ")} WHERE id = ?`, values);

  const [rows] = await pool.query("SELECT * FROM guarantee_items WHERE id = ?", [id]);
  res.json(mapGuaranteeItem((rows as GuaranteeItemRow[])[0]));
}

export async function deleteGuaranteeItem(req: Request, res: Response) {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const [result] = await pool.query("DELETE FROM guarantee_items WHERE id = ?", [id]);
  if ((result as { affectedRows: number }).affectedRows === 0) {
    throw new AppError(404, "Tarjeta no encontrada");
  }
  res.status(204).send();
}
