import "dotenv/config";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import pg from "pg";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function migrate() {
  const dbName = process.env.DB_NAME || "lotes_web";
  const schemaPath = path.join(__dirname, "schema.sql");
  const schema = fs.readFileSync(schemaPath, "utf-8");

  const adminPool = new pg.Pool({
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5432,
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_ADMIN_DATABASE || "postgres",
  });

  try {
    const existing = await adminPool.query(
      "SELECT 1 FROM pg_database WHERE datname = $1",
      [dbName],
    );

    if (existing.rowCount === 0) {
      await adminPool.query(`CREATE DATABASE "${dbName}"`);
      console.log(`✓ Base de datos "${dbName}" creada`);
    }
  } finally {
    await adminPool.end();
  }

  const pool = new pg.Pool({
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5432,
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "",
    database: dbName,
  });

  try {
    await pool.query(schema);

    const defaultHeroBg =
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1600";

    const heroColumn = await pool.query(
      `SELECT column_name
       FROM information_schema.columns
       WHERE table_schema = current_schema()
         AND table_name = 'about_page'
         AND column_name = 'hero_background_image_url'`,
    );

    if (heroColumn.rowCount === 0) {
      await pool.query(
        "ALTER TABLE about_page ADD COLUMN hero_background_image_url TEXT NULL",
      );
      await pool.query(
        "UPDATE about_page SET hero_background_image_url = $1 WHERE hero_background_image_url IS NULL OR hero_background_image_url = ''",
        [defaultHeroBg],
      );
      await pool.query(
        "ALTER TABLE about_page ALTER COLUMN hero_background_image_url SET NOT NULL",
      );
      console.log("✓ Columna hero_background_image_url añadida a about_page");
    }

    console.log(`✓ Base de datos "${dbName}" y tablas creadas correctamente`);
  } finally {
    await pool.end();
  }
}

migrate().catch((err) => {
  console.error("Error en migración:", err.message);
  process.exit(1);
});
