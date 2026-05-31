import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { pool } from "../config/db.js";
import { AppError } from "../middleware/errorHandler.js";
import { signToken } from "../middleware/auth.js";

export async function login(req: Request, res: Response) {
  const { email, password } = req.body as { email?: string; password?: string };

  if (!email || !password) {
    throw new AppError(400, "Email y contraseña son requeridos");
  }

  const [rows] = await pool.query(
    "SELECT id, email, password_hash FROM admins WHERE email = ?",
    [email]
  );

  const admin = (rows as { id: number; email: string; password_hash: string }[])[0];

  if (!admin) {
    throw new AppError(401, "Credenciales inválidas");
  }

  const valid = await bcrypt.compare(password, admin.password_hash);
  if (!valid) {
    throw new AppError(401, "Credenciales inválidas");
  }

  const token = signToken({ adminId: admin.id, email: admin.email });

  res.json({ token, email: admin.email });
}

export async function me(req: Request, res: Response) {
  res.json({ email: req.admin!.email });
}
