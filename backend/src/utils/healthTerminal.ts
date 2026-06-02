import path from "path";
import { fileURLToPath } from "url";
import { webApiConfig } from "../config/webApi.js";

export interface HealthReport {
  ok: boolean;
  timestamp: string;
  uptimeSeconds: number;
  nodeVersion: string;
  environment: string;
  port: number;
  database: {
    ok: boolean;
    host: string;
    name: string;
    latencyMs: number | null;
    error: string | null;
  };
  corsOrigin: string;
  webApi: {
    baseUrl: string;
    tipoWeb: string;
    timeoutMs: number;
  };
  uploadDir: string;
  packageName: string;
  packageVersion: string;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatUptime(seconds: number): string {
  const s = Math.floor(seconds);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  if (h > 0) return `${h}h ${m}m ${sec}s`;
  if (m > 0) return `${m}m ${sec}s`;
  return `${sec}s`;
}

function statusLine(ok: boolean, label: string, detail: string): string {
  const tag = ok ? "OK" : "ERR";
  const color = ok ? "#4ade80" : "#f87171";
  const padded = label.padEnd(22, ".");
  return `<span class="line"><span class="tag" style="color:${color}">[${tag}]</span> ${escapeHtml(padded)} ${escapeHtml(detail)}</span>`;
}

export function buildHealthReport(
  dbOk: boolean,
  dbLatencyMs: number | null,
  dbError: string | null
): HealthReport {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const uploadDir = process.env.UPLOAD_DIR || path.join(__dirname, "..", "..", "uploads");

  return {
    ok: dbOk,
    timestamp: new Date().toISOString(),
    uptimeSeconds: process.uptime(),
    nodeVersion: process.version,
    environment: process.env.NODE_ENV || "development",
    port: Number(process.env.PORT) || 4000,
    database: {
      ok: dbOk,
      host: `${process.env.DB_HOST || "localhost"}:${process.env.DB_PORT || "3306"}`,
      name: process.env.DB_NAME || "lotes_web",
      latencyMs: dbLatencyMs,
      error: dbError,
    },
    corsOrigin: process.env.CORS_ORIGIN || "http://localhost:3000",
    webApi: {
      baseUrl: webApiConfig.baseUrl,
      tipoWeb: webApiConfig.tipoWeb,
      timeoutMs: webApiConfig.timeoutMs,
    },
    uploadDir,
    packageName: "lotes-backend",
    packageVersion: "1.0.0",
  };
}

export function renderHealthTerminal(report: HealthReport): string {
  const lines = [
    statusLine(report.ok, "API REMATE PANEL", "online"),
    statusLine(
      report.database.ok,
      "MySQL",
      report.database.ok
        ? `${report.database.name} (${report.database.latencyMs}ms)`
        : report.database.error || "desconectado"
    ),
    `<span class="line muted">────────────────────────────────────────────────────────</span>`,
    `<span class="line"><span class="tag info">[INF]</span> Servicio ............. ${escapeHtml(report.packageName)} v${escapeHtml(report.packageVersion)}</span>`,
    `<span class="line"><span class="tag info">[INF]</span> Entorno .............. ${escapeHtml(report.environment)}</span>`,
    `<span class="line"><span class="tag info">[INF]</span> Node.js .............. ${escapeHtml(report.nodeVersion)}</span>`,
    `<span class="line"><span class="tag info">[INF]</span> Puerto ............... ${report.port}</span>`,
    `<span class="line"><span class="tag info">[INF]</span> Uptime ............... ${escapeHtml(formatUptime(report.uptimeSeconds))}</span>`,
    `<span class="line"><span class="tag info">[INF]</span> DB Host .............. ${escapeHtml(report.database.host)}</span>`,
    `<span class="line"><span class="tag info">[INF]</span> CORS ................. ${escapeHtml(report.corsOrigin)}</span>`,
    `<span class="line"><span class="tag info">[INF]</span> Web API .............. ${escapeHtml(report.webApi.baseUrl)}</span>`,
    `<span class="line"><span class="tag info">[INF]</span> tipo_web ............. ${escapeHtml(report.webApi.tipoWeb)}</span>`,
    `<span class="line"><span class="tag info">[INF]</span> Upload dir ........... ${escapeHtml(report.uploadDir)}</span>`,
    `<span class="line"><span class="tag info">[INF]</span> Timestamp ............ ${escapeHtml(report.timestamp)}</span>`,
    `<span class="line muted">────────────────────────────────────────────────────────</span>`,
    `<span class="line prompt">$ <span class="cursor">█</span> system status --json  →  <a href="?format=json">?format=json</a></span>`,
    `<span class="line status ${report.ok ? "ok" : "err"}">${report.ok ? "STATUS: OPERATIONAL" : "STATUS: DEGRADED"}</span>`,
  ];

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>lotes_web — health terminal</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      min-height: 100vh;
      background: #0a0a0b;
      color: #a3e635;
      font-family: "JetBrains Mono", "Cascadia Code", "Consolas", monospace;
      font-size: 13px;
      line-height: 1.55;
      padding: 1.5rem;
    }
    .window {
      max-width: 720px;
      margin: 0 auto;
      border: 1px solid #27272a;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 24px 48px rgba(0,0,0,0.55);
    }
    .titlebar {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 10px 14px;
      background: #18181b;
      border-bottom: 1px solid #27272a;
    }
    .dot { width: 11px; height: 11px; border-radius: 50%; }
    .dot-r { background: #ef4444; }
    .dot-y { background: #eab308; }
    .dot-g { background: #22c55e; }
    .titlebar span {
      margin-left: auto;
      font-size: 10px;
      color: #71717a;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }
    .screen {
      padding: 1.25rem 1.5rem 1.5rem;
      background: #09090b;
      min-height: 420px;
    }
    .banner {
      color: #008f4a;
      font-weight: 700;
      font-size: 11px;
      letter-spacing: 0.12em;
      margin-bottom: 1rem;
      white-space: pre;
    }
    .line { display: block; margin-bottom: 2px; }
    .line.muted { color: #3f3f46; }
    .line .tag { font-weight: 700; margin-right: 6px; }
    .line .tag.info { color: #38bdf8; }
    .line.prompt { color: #d4d4d8; margin-top: 0.75rem; }
    .line.prompt a { color: #4ade80; text-decoration: none; }
    .line.prompt a:hover { text-decoration: underline; }
    .cursor { animation: blink 1s step-end infinite; color: #4ade80; }
    .line.status { margin-top: 0.5rem; font-weight: 800; letter-spacing: 0.06em; }
    .line.status.ok { color: #4ade80; }
    .line.status.err { color: #f87171; }
    @keyframes blink { 50% { opacity: 0; } }
  </style>
</head>
<body>
  <div class="window">
    <div class="titlebar">
      <div class="dot dot-r"></div>
      <div class="dot dot-y"></div>
      <div class="dot dot-g"></div>
      <span>lotes_web@health — bash</span>
    </div>
    <div class="screen">
      <pre class="banner">╔══════════════════════════════════════╗
║   LOTES WEB API — SYSTEM MONITOR     ║
╚══════════════════════════════════════╝</pre>
      <div class="output">
        <span class="line prompt" style="margin-top:0">$ lotes_web health --check</span>
        ${lines.join("\n        ")}
      </div>
    </div>
  </div>
</body>
</html>`;
}

export function wantsJsonHealthResponse(acceptHeader: string | undefined, formatQuery: unknown): boolean {
  if (formatQuery === "json") return true;
  const accept = acceptHeader?.toLowerCase() ?? "";
  if (accept.includes("application/json") && !accept.includes("text/html")) return true;
  return false;
}
