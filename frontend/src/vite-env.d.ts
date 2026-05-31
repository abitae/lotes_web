/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_DEV_API_PROXY: string;
  readonly VITE_AUTH_STORAGE_KEY: string;
  readonly VITE_AUTH_EMAIL_KEY: string;
  readonly VITE_THEME_STORAGE_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
