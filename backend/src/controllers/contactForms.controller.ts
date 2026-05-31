import type { Request, Response } from "express";
import { pool } from "../config/db.js";
import { AppError } from "../middleware/errorHandler.js";
import { mapContactForm } from "../utils/siteContentMappers.js";
import type { ContactFormRow } from "../types/index.js";

export async function getContactForms(_req: Request, res: Response) {
  const [rows] = await pool.query("SELECT * FROM contact_forms ORDER BY slug ASC");
  res.json((rows as ContactFormRow[]).map(mapContactForm));
}

export async function updateContactForm(req: Request, res: Response) {
  const slug = Array.isArray(req.params.slug) ? req.params.slug[0] : req.params.slug;
  const [existing] = await pool.query("SELECT * FROM contact_forms WHERE slug = ?", [slug]);
  if (!(existing as ContactFormRow[])[0]) throw new AppError(404, "Formulario no encontrado");

  const body = req.body;
  const fields: string[] = [];
  const values: unknown[] = [];

  const mapping: Record<string, string> = {
    formTitle: "form_title",
    formSubtitle: "form_subtitle",
    submitLabel: "submit_label",
    successTitle: "success_title",
    successMessage: "success_message",
    defaultMessage: "default_message",
    defaultProjectInterest: "default_project_interest",
    sectionEyebrow: "section_eyebrow",
    sectionHeading: "section_heading",
    sectionDescription: "section_description",
  };

  for (const [key, column] of Object.entries(mapping)) {
    if (body[key] !== undefined) {
      fields.push(`${column} = ?`);
      values.push(body[key]);
    }
  }

  if (body.bullets !== undefined) {
    fields.push("bullets = ?");
    values.push(body.bullets ? JSON.stringify(body.bullets) : null);
  }

  if (fields.length === 0) throw new AppError(400, "No hay campos para actualizar");

  values.push(slug);
  await pool.query(`UPDATE contact_forms SET ${fields.join(", ")} WHERE slug = ?`, values);

  const [rows] = await pool.query("SELECT * FROM contact_forms WHERE slug = ?", [slug]);
  res.json(mapContactForm((rows as ContactFormRow[])[0]));
}
