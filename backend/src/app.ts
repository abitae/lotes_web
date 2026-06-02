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
import siteSettingsRoutes from "./routes/siteSettings.routes.js";
import guaranteesRoutes from "./routes/guarantees.routes.js";
import contactFormsRoutes from "./routes/contactForms.routes.js";
import channelsRoutes from "./routes/channels.routes.js";
import faqsRoutes from "./routes/faqs.routes.js";
import aboutRoutes from "./routes/about.routes.js";
import homeAlertRoutes from "./routes/homeAlert.routes.js";
import { asyncHandler, errorHandler } from "./middleware/errorHandler.js";
import { healthCheck } from "./controllers/health.controller.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadDir = process.env.UPLOAD_DIR || path.join(__dirname, "..", "uploads");

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN || "http://localhost:3000" }));
app.use(express.json());
app.use("/uploads", express.static(uploadDir));

app.get("/api/health", asyncHandler(healthCheck));

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectsRoutes);
app.use("/api/banners", bannersRoutes);
app.use("/api/testimonials", testimonialsRoutes);
app.use("/api/inquiries", inquiriesRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/site-settings", siteSettingsRoutes);
app.use("/api/guarantees", guaranteesRoutes);
app.use("/api/contact-forms", contactFormsRoutes);
app.use("/api/channels", channelsRoutes);
app.use("/api/faqs", faqsRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/home-alert", homeAlertRoutes);

app.use(errorHandler);

export default app;
