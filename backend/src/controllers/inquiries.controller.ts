import type { Request, Response } from "express";
import { randomUUID } from "crypto";
import { pool } from "../config/db.js";
import { AppError } from "../middleware/errorHandler.js";
import { mapInquiry } from "../utils/mappers.js";
import type { InquiryRow, InquiryStatus } from "../types/index.js";

export async function getInquiries(_req: Request, res: Response) {
  const [rows] = await pool.query("SELECT * FROM inquiries ORDER BY created_at DESC");
  res.json((rows as InquiryRow[]).map(mapInquiry));
}

export async function createInquiry(req: Request, res: Response) {
  const { fullName, phone, email, projectInterest, message } = req.body;

  if (!fullName || !phone || !email || !projectInterest || !message) {
    throw new AppError(400, "fullName, phone, email, projectInterest y message son requeridos");
  }

  const id = randomUUID();

  await pool.query(
    `INSERT INTO inquiries (id, full_name, phone, email, project_interest, message, status)
     VALUES (?, ?, ?, ?, ?, ?, 'Pendiente')`,
    [id, fullName, phone, email, projectInterest, message]
  );

  const [rows] = await pool.query("SELECT * FROM inquiries WHERE id = ?", [id]);
  res.status(201).json(mapInquiry((rows as InquiryRow[])[0]));
}

export async function updateInquiry(req: Request, res: Response) {
  const [existing] = await pool.query("SELECT * FROM inquiries WHERE id = ?", [req.params.id]);
  if (!(existing as InquiryRow[])[0]) {
    throw new AppError(404, "Consulta no encontrada");
  }

  const { status, notes } = req.body as { status?: InquiryStatus; notes?: string };
  const fields: string[] = [];
  const values: unknown[] = [];

  if (status !== undefined) {
    fields.push("status = ?");
    values.push(status);
  }

  if (notes !== undefined) {
    fields.push("notes = ?");
    values.push(notes);
  }

  if (fields.length === 0) {
    throw new AppError(400, "No hay campos para actualizar");
  }

  values.push(req.params.id);
  await pool.query(`UPDATE inquiries SET ${fields.join(", ")} WHERE id = ?`, values);

  const [rows] = await pool.query("SELECT * FROM inquiries WHERE id = ?", [req.params.id]);
  res.json(mapInquiry((rows as InquiryRow[])[0]));
}

export async function deleteInquiry(req: Request, res: Response) {
  const [result] = await pool.query("DELETE FROM inquiries WHERE id = ?", [req.params.id]);
  const affected = (result as { affectedRows: number }).affectedRows;

  if (affected === 0) {
    throw new AppError(404, "Consulta no encontrada");
  }

  res.status(204).send();
}
