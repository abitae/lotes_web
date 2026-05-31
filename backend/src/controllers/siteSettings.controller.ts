import type { Request, Response } from "express";
import { pool } from "../config/db.js";
import { AppError } from "../middleware/errorHandler.js";
import { mapSiteSettings } from "../utils/siteContentMappers.js";
import type { SiteSettingsRow } from "../types/index.js";

export async function getSiteSettings(_req: Request, res: Response) {
  const [rows] = await pool.query("SELECT * FROM site_settings WHERE id = 1");
  const row = (rows as SiteSettingsRow[])[0];
  if (!row) throw new AppError(404, "Configuración del sitio no encontrada");
  res.json(mapSiteSettings(row));
}

export async function updateSiteSettings(req: Request, res: Response) {
  const body = req.body;
  const fields: string[] = [];
  const values: unknown[] = [];

  const mapping: Record<string, string> = {
    logoUrl: "logo_url",
    faviconUrl: "favicon_url",
    siteName: "site_name",
    siteTagline: "site_tagline",
    browserTitle: "browser_title",
    footerTagline: "footer_tagline",
    footerDescription: "footer_description",
  };

  for (const [key, column] of Object.entries(mapping)) {
    if (body[key] !== undefined) {
      fields.push(`${column} = ?`);
      values.push(body[key]);
    }
  }

  if (fields.length === 0) throw new AppError(400, "No hay campos para actualizar");

  await pool.query(`UPDATE site_settings SET ${fields.join(", ")} WHERE id = 1`, values);
  const [rows] = await pool.query("SELECT * FROM site_settings WHERE id = 1");
  res.json(mapSiteSettings((rows as SiteSettingsRow[])[0]));
}
