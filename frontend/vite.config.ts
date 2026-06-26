import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const proxyTarget = env.VITE_DEV_API_PROXY || 'http://backend_laravel.test';

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
      proxy: {
        '/api': {
          target: proxyTarget,
          changeOrigin: true,
          secure: false,
          timeout: 120_000,
          proxyTimeout: 120_000,
        },
        '/uploads': {
          target: proxyTarget,
          changeOrigin: true,
          secure: false,
          timeout: 120_000,
          proxyTimeout: 120_000,
        },
      },
    },
  };
});
