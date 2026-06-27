const trim = (value: string | undefined, fallback: string) =>
  (value?.trim() || fallback).replace(/\/$/, "");

export const env = {
  /** Base URL de la API (monolito Laravel: /api en el mismo origen) */
  apiUrl: trim(import.meta.env.VITE_API_URL, "/api"),
  authStorageKey: import.meta.env.VITE_AUTH_STORAGE_KEY?.trim() || "lotes_auth_token",
  authEmailKey: import.meta.env.VITE_AUTH_EMAIL_KEY?.trim() || "lotes_admin_email",
  themeStorageKey: import.meta.env.VITE_THEME_STORAGE_KEY?.trim() || "lotes_theme",
};
