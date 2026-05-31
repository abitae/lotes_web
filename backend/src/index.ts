import "dotenv/config";
import app from "./app.js";
import { pool } from "./config/db.js";
import { assertWebApiConfig, webApiConfig } from "./config/webApi.js";

const PORT = Number(process.env.PORT) || 4000;

async function start() {
  assertWebApiConfig();

  try {
    await pool.query("SELECT 1");
    console.log("✓ Conexión a MySQL establecida");
  } catch (err) {
    console.error("✗ No se pudo conectar a MySQL. Ejecuta: npm run db:setup");
    console.error(err instanceof Error ? err.message : err);
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`✓ API corriendo en http://localhost:${PORT}`);
    console.log(`  Health: http://localhost:${PORT}/api/health`);
    console.log(`  Catálogo externo: ${webApiConfig.baseUrl} (tipo_web=${webApiConfig.tipoWeb})`);
  });
}

start();
