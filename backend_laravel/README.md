# Lotes en Remate — Laravel + React (monolito)

Aplicación Laravel 13 con SPA React embebida (`resources/js/`) y API JSON bajo `/api`.

## Requisitos

- PHP 8.3+
- Composer
- Node.js 20+
- MySQL (`lotes_web_backend`)

## Desarrollo local

```bash
cd backend_laravel
composer install
cp .env.example .env   # si no existe
php artisan key:generate
php artisan migrate
php artisan storage:link
npm install
composer run dev
```

Abre **http://localhost:8000** — la SPA React y la API comparten el mismo origen (`VITE_API_URL=/api`).

Consola de estado del sistema (antes en `/`): **http://localhost:8000/system**

API JSON: **http://localhost:8000/api/health?format=json**

## Variables `.env` importantes

```env
APP_URL=http://localhost:8000
FILESYSTEM_DISK=public
WEB_API_BASE_URL=https://inmopro.laravel.cloud
WEB_API_TIPO_WEB=lotesenremate.pe

VITE_API_URL=/api
VITE_AUTH_STORAGE_KEY=lotes_auth_token
VITE_AUTH_EMAIL_KEY=lotes_admin_email
VITE_THEME_STORAGE_KEY=lotes_theme
```

## Uploads CMS

Los archivos subidos desde el panel admin se guardan en `storage/app/public/uploads/` y se sirven en `/storage/uploads/...` (symlink `public/storage`).

## Build producción

```bash
composer install --no-dev --optimize-autoloader
npm ci && npm run build
php artisan migrate --force
php artisan storage:link --force
php artisan config:cache
php artisan route:cache
```

## Despliegue Banahosting (monolito)

- Document Root → `public/` del proyecto Laravel
- Un solo dominio (ej. `https://lotesenremate.pe`)
- PHP 8.3+, extensiones estándar Laravel
- Permisos `775` en `storage/` y `bootstrap/cache/`
- Ejecutar `php artisan storage:link` en el servidor

## API

Todos los endpoints bajo `/api` — ver `routes/api.php`. Auth admin con **Sanctum** (`POST /api/auth/login` → Bearer token).

## Tests

```bash
php artisan test --filter=Api
```

## Frontend legacy

La carpeta `../frontend/` quedó deprecada; el código activo está en `resources/js/`.
