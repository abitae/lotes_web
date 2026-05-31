import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.routes.js";
import projectsRoutes from "./routes/projects.routes.js";
import bannersRoutes from "./routes/banners.routes.js";
import testimonialsRoutes from "./routes/testimonials.routes.js";
import inquiriesRoutes from "./routes/inquiries.routes.js";
import statsRoutes from "./routes/stats.routes.js";
import uploadRoutes from "./routes/upload.routes.js";
import { errorHandler } from "./middleware/errorHandler.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadDir = process.env.UPLOAD_DIR || path.join(__dirname, "..", "uploads");

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN || "http://localhost:3000" }));
app.use(express.json());
app.use("/uploads", express.static(uploadDir));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, timestamp: new Date().toISOString() });
});

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectsRoutes);
app.use("/api/banners", bannersRoutes);
app.use("/api/testimonials", testimonialsRoutes);
app.use("/api/inquiries", inquiriesRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/upload", uploadRoutes);

app.use(errorHandler);

export default app;
