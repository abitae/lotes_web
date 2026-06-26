# API Laravel — Lotes en Remate

Backend PHP (Laravel 13) compatible con el frontend React. Reemplaza `lotes_web/backend` (Node.js).

## Requisitos

- PHP 8.3+
- Composer
- MySQL (`lotes_web_backend`)

## Configuración local (Laravel Herd)

URL del API: **https://backend_laravel.test**

1. Enlaza el proyecto en Herd (carpeta `backend_laravel`)
2. `.env`: `APP_URL=https://backend_laravel.test`
3. Visita https://backend_laravel.test — verás la consola de estado del sistema
4. API JSON: https://backend_laravel.test/api/health?format=json

Frontend con Vite (`frontend/.env`):

```env
VITE_API_URL=/api
VITE_DEV_API_PROXY=https://backend_laravel.test
```

## Configuración local (artisan serve)

```bash
php artisan serve --port=8000
```

Variables importantes en `.env`:

```env
DB_DATABASE=lotes_web_backend
CORS_ORIGIN=http://localhost:3000
API_BASE_URL=http://localhost:8000
WEB_API_BASE_URL=https://inmopro.laravel.cloud
WEB_API_TIPO_WEB=lotesenremate.pe
```

Frontend (`.env`):

```env
VITE_API_URL=http://localhost:8000/api
```

## Endpoints

Todos bajo `/api` — ver `routes/api.php`. Autenticación admin con **Sanctum** (`POST /api/auth/login` → Bearer token).

## Despliegue cPanel

Ver [DEPLOY-CPANEL.md](../DEPLOY-CPANEL.md) (sección Laravel API).

## Tests

```bash
php artisan test --filter=Api
```
