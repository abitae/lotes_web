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

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const MAX_VIDEO_BYTES = 50 * 1024 * 1024;

const upload = multer({
  storage,
  limits: { fileSize: MAX_VIDEO_BYTES },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith("image/") || file.mimetype.startsWith("video/")) {
      cb(null, true);
    } else {
      cb(new Error("Solo se permiten imágenes o videos"));
    }
  },
});

function assertFileSize(file: { mimetype: string; size: number }): void {
  const max = file.mimetype.startsWith("video/") ? MAX_VIDEO_BYTES : MAX_IMAGE_BYTES;
  if (file.size > max) {
    const mb = Math.round(max / (1024 * 1024));
    throw new AppError(400, `El archivo supera el límite de ${mb} MB`);
  }
}

export const uploadMiddleware = upload.single("file");

export async function uploadFile(req: Request, res: Response) {
  if (!req.file) {
    throw new AppError(400, "No se recibió ningún archivo");
  }

  assertFileSize(req.file);

  const baseUrl = process.env.API_BASE_URL || `http://localhost:${process.env.PORT || 4000}`;
  const url = `${baseUrl}/uploads/${req.file.filename}`;

  res.status(201).json({
    url,
    filename: req.file.filename,
    mimeType: req.file.mimetype,
    mediaType: req.file.mimetype.startsWith("video/") ? "video" : "image",
  });
}
