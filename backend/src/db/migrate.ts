import "dotenv/config";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import mysql from "mysql2/promise";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function migrate() {
  const dbName = process.env.DB_NAME || "lotes_web";
  const schemaPath = path.join(__dirname, "schema.sql");
  const schema = fs.readFileSync(schemaPath, "utf-8");

  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    multipleStatements: true,
  });

  try {
    await connection.query(
      `CREATE DATABASE IF NOT EXISTS \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
    );
    await connection.query(`USE \`${dbName}\``);
    await connection.query(schema);

    const defaultHeroBg =
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1600";
    const [cols] = await connection.query(
      `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS
       WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'about_page' AND COLUMN_NAME = 'hero_background_image_url'`,
      [dbName]
    );
    if ((cols as { COLUMN_NAME: string }[]).length === 0) {
      await connection.query(
        `ALTER TABLE about_page ADD COLUMN hero_background_image_url TEXT NULL AFTER hero_description`
      );
      await connection.query(
        `UPDATE about_page SET hero_background_image_url = ? WHERE hero_background_image_url IS NULL OR hero_background_image_url = ''`,
        [defaultHeroBg]
      );
      await connection.query(
        `ALTER TABLE about_page MODIFY hero_background_image_url TEXT NOT NULL`
      );
      console.log("✓ Columna hero_background_image_url añadida a about_page");
    }

    console.log(`✓ Base de datos "${dbName}" y tablas creadas correctamente`);
  } finally {
    await connection.end();
  }
}

migrate().catch((err) => {
  console.error("Error en migración:", err.message);
  process.exit(1);
});
