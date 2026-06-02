import type { Request, Response } from "express";
import { pool } from "../config/db.js";
import {
  buildHealthReport,
  renderHealthTerminal,
  wantsJsonHealthResponse,
} from "../utils/healthTerminal.js";

export async function healthCheck(req: Request, res: Response) {
  let dbOk = false;
  let dbLatencyMs: number | null = null;
  let dbError: string | null = null;

  try {
    const t0 = Date.now();
    await pool.query("SELECT 1");
    dbLatencyMs = Date.now() - t0;
    dbOk = true;
  } catch (err) {
    dbError = err instanceof Error ? err.message : "Error de conexión";
  }

  const report = buildHealthReport(dbOk, dbLatencyMs, dbError);

  if (wantsJsonHealthResponse(req.headers.accept, req.query.format)) {
    res.json({
      ok: report.ok,
      timestamp: report.timestamp,
      uptimeSeconds: report.uptimeSeconds,
      environment: report.environment,
      database: report.database,
      webApi: report.webApi,
    });
    return;
  }

  res.status(report.ok ? 200 : 503).type("html").send(renderHealthTerminal(report));
}
