function trimUrl(value: string | undefined, fallback: string): string {
  return (value?.trim() || fallback).replace(/\/$/, "");
}

export const webApiConfig = {
  baseUrl: trimUrl(process.env.WEB_API_BASE_URL, "https://api.ejemplo.com"),
  tipoWeb: process.env.WEB_API_TIPO_WEB?.trim() || "lotesenremate.pe",
  timeoutMs: Number(process.env.WEB_API_TIMEOUT_MS) || 15000,
};

export function assertWebApiConfig(): void {
  if (!process.env.WEB_API_BASE_URL?.trim()) {
    console.warn("⚠ WEB_API_BASE_URL no configurado, usando valor por defecto:", webApiConfig.baseUrl);
  }
  if (!process.env.WEB_API_TIPO_WEB?.trim()) {
    console.warn("⚠ WEB_API_TIPO_WEB no configurado, usando:", webApiConfig.tipoWeb);
  }
}

export function getWebProjectsUrl(path = ""): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${webApiConfig.baseUrl}/api/v1/web${normalized}`;
}
