import "dotenv/config";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import mysql from "mysql2/promise";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function splitSqlStatements(sql: string): string[] {
  return sql
    .split(";")
    .map((statement) => statement.trim())
    .filter((statement) => statement.length > 0 && !statement.startsWith("--"));
}

function getConnectionConfig(database?: string) {
  return {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    ...(database ? { database } : {}),
  };
}

async function migrate() {
  const dbName = process.env.DB_NAME || "lotes_web_backend";
  const schemaPath = path.join(__dirname, "schema.sql");
  const schema = fs.readFileSync(schemaPath, "utf-8");

  const adminConn = await mysql.createConnection(getConnectionConfig());

  try {
    await adminConn.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
    console.log(`✓ Base de datos "${dbName}" verificada`);
  } finally {
    await adminConn.end();
  }

  const pool = mysql.createPool({
    ...getConnectionConfig(dbName),
    waitForConnections: true,
    connectionLimit: 5,
  });

  try {
    for (const statement of splitSqlStatements(schema)) {
      await pool.query(statement);
    }

    const defaultHeroBg =
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1600";

    const [heroColumn] = await pool.query(
      `SELECT column_name
       FROM information_schema.columns
       WHERE table_schema = DATABASE()
         AND table_name = 'about_page'
         AND column_name = 'hero_background_image_url'`,
    );

    if ((heroColumn as { column_name: string }[]).length === 0) {
      await pool.query(
        "ALTER TABLE about_page ADD COLUMN hero_background_image_url TEXT NULL",
      );
      await pool.query(
        "UPDATE about_page SET hero_background_image_url = ? WHERE hero_background_image_url IS NULL OR hero_background_image_url = ''",
        [defaultHeroBg],
      );
      await pool.query(
        "ALTER TABLE about_page MODIFY COLUMN hero_background_image_url TEXT NOT NULL",
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
