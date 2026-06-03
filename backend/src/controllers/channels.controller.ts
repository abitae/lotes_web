import type { Request, Response } from "express";
import { randomUUID } from "crypto";
import { pool } from "../config/db.js";
import { AppError } from "../middleware/errorHandler.js";
import { mapCorporateChannel } from "../utils/siteContentMappers.js";
import type { CorporateChannelRow, ChannelType } from "../types/index.js";

const VALID_TYPES: ChannelType[] = ["address", "phone", "email", "whatsapp"];

export async function getChannels(_req: Request, res: Response) {
  const [rows] = await pool.query(
    "SELECT * FROM corporate_channels ORDER BY sort_order ASC, created_at ASC"
  );
  res.json((rows as CorporateChannelRow[]).map(mapCorporateChannel));
}

export async function createChannel(req: Request, res: Response) {
  const { channelType, label, value, extraInfo, sortOrder, isActive } = req.body;
  if (!channelType || !label || !value) {
    throw new AppError(400, "channelType, label y value son requeridos");
  }
  if (!VALID_TYPES.includes(channelType)) {
    throw new AppError(400, "channelType inválido");
  }

  const id = randomUUID();
  await pool.query(
    `INSERT INTO corporate_channels (id, channel_type, label, value, extra_info, sort_order, is_active)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [id, channelType, label, value, extraInfo ?? null, sortOrder ?? 0, isActive !== false]
  );

  const [rows] = await pool.query("SELECT * FROM corporate_channels WHERE id = ?", [id]);
  res.status(201).json(mapCorporateChannel((rows as CorporateChannelRow[])[0]));
}

export async function updateChannel(req: Request, res: Response) {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const [existing] = await pool.query("SELECT * FROM corporate_channels WHERE id = ?", [id]);
  if (!(existing as CorporateChannelRow[])[0]) throw new AppError(404, "Canal no encontrado");

  const body = req.body;
  if (body.channelType && !VALID_TYPES.includes(body.channelType)) {
    throw new AppError(400, "channelType inválido");
  }

  const fields: string[] = [];
  const values: unknown[] = [];

  const mapping: Record<string, string> = {
    channelType: "channel_type",
    label: "label",
    value: "value",
    extraInfo: "extra_info",
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
  await pool.query(`UPDATE corporate_channels SET ${fields.join(", ")} WHERE id = ?`, values);

  const [rows] = await pool.query("SELECT * FROM corporate_channels WHERE id = ?", [id]);
  res.json(mapCorporateChannel((rows as CorporateChannelRow[])[0]));
}

export async function deleteChannel(req: Request, res: Response) {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const [, result] = await pool.query("DELETE FROM corporate_channels WHERE id = ?", [id]);
  if ((result as { affectedRows: number }).affectedRows === 0) {
    throw new AppError(404, "Canal no encontrado");
  }
  res.status(204).send();
}
