const trim = (value: string | undefined, fallback: string) =>
  (value?.trim() || fallback).replace(/\/$/, "");

export const env = {
  /** Base URL de la API (ej. /api en dev con proxy, https://dominio.com/api en prod) */
  apiUrl: trim(import.meta.env.VITE_API_URL, "/api"),
  /** Target del proxy de Vite en desarrollo */
  devApiProxy: trim(import.meta.env.VITE_DEV_API_PROXY, "http://localhost:4000"),
  authStorageKey: import.meta.env.VITE_AUTH_STORAGE_KEY?.trim() || "lotes_auth_token",
  authEmailKey: import.meta.env.VITE_AUTH_EMAIL_KEY?.trim() || "lotes_admin_email",
  themeStorageKey: import.meta.env.VITE_THEME_STORAGE_KEY?.trim() || "lotes_theme",
};
