import type { Request, Response } from "express";
import path from "path";
import fs from "fs";
import multer from "multer";
import { AppError } from "../middleware/errorHandler.js";

const uploadDir = process.env.UPLOAD_DIR || "uploads";

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = `${Date.now()}-${Math.round(Math.random() * 1e6)}${ext}`;
    cb(null, name);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Solo se permiten imágenes"));
    }
  },
});

export const uploadMiddleware = upload.single("file");

export async function uploadFile(req: Request, res: Response) {
  if (!req.file) {
    throw new AppError(400, "No se recibió ningún archivo");
  }

  const baseUrl = process.env.API_BASE_URL || `http://localhost:${process.env.PORT || 4000}`;
  const url = `${baseUrl}/uploads/${req.file.filename}`;

  res.status(201).json({ url, filename: req.file.filename });
}
