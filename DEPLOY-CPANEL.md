# Despliegue en cPanel — Lotes Web

Arquitectura con **backend Laravel** (`backend_laravel`) + **frontend React** estático.

```
https://tudominio.com          → public_html (React dist/)
https://api.tudominio.com      → backend_laravel/public (Laravel)
MySQL cPanel                 → lotes_web_backend
```

---

## 1. Base de datos MySQL (cPanel)

1. Crear base `usuario_lotes_web_backend`
2. Crear usuario con contraseña y asignar privilegios
3. Importar tablas si es instalación nueva (desde `backend/src/db/schema.sql` del Node legacy) o usar datos existentes
4. Ejecutar migración Sanctum en el servidor:

```bash
php artisan migrate --force
```

(Solo crea `personal_access_tokens`.)

---

## 2. Backend Laravel (subdominio `api.tudominio.com`)

### Subir archivos

Sube `lotes_web/backend_laravel/` excluyendo `node_modules`, `vendor` (instalar en servidor).

### En el servidor (SSH)

```bash
cd ~/lotes-api
composer install --no-dev --optimize-autoloader
cp .env.example .env
# Editar .env (ver abajo)
php artisan key:generate
php artisan migrate --force
php artisan config:cache
php artisan route:cache
mkdir -p public/uploads && chmod 775 public/uploads
```

### Document root del subdominio

Apuntar a: `backend_laravel/public`

### `.env` producción

```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://api.tudominio.com

DB_CONNECTION=mysql
DB_HOST=localhost
DB_DATABASE=usuario_lotes_web_backend
DB_USERNAME=...
DB_PASSWORD=...

CORS_ORIGIN=https://tudominio.com
API_BASE_URL=https://api.tudominio.com

WEB_API_BASE_URL=https://inmopro.laravel.cloud
WEB_API_TIPO_WEB=lotesenremate.pe
WEB_API_TIMEOUT_MS=15000
```

### Verificar

`https://api.tudominio.com/api/health?format=json` → `"ok": true`

---

## 3. Frontend React (dominio principal)

En tu PC:

```bash
cd lotes_web/frontend
# .env.production
VITE_API_URL=https://api.tudominio.com/api
npm run build
```

Sube el contenido de `frontend/dist/` a `public_html` (incluye `.htaccess`).

---

## 4. Checklist

- [ ] SSL en dominio y subdominio API
- [ ] Login admin: `https://tudominio.com/#/admin/login`
- [ ] Catálogo de proyectos (CRM externo)
- [ ] Formulario de contacto guarda leads
- [ ] Subida de imágenes en admin → URLs `https://api.tudominio.com/uploads/...`

---

## Desarrollo local

```bash
# Terminal 1
cd backend_laravel && php artisan serve --port=8000

# Terminal 2
cd frontend && npm run dev
# VITE_API_URL=http://localhost:8000/api
```

---

## Backend Node (legacy)

`lotes_web/backend` (Express) queda **deprecado**. Usar `backend_laravel` para nuevos despliegues.
