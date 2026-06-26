import mysql, { type ExecuteValues } from "mysql2/promise";

const mysqlPool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "lotes_web_backend",
  waitForConnections: true,
  connectionLimit: 10,
});

type QueryMeta = {
  affectedRows: number;
};

// Filas devueltas por mysql2 (forma depende de la consulta)
type QueryRow = Record<string, any>;

function normalizeRows(rows: QueryRow[]): QueryRow[] {
  return rows.map((row) => {
    if ("count" in row && (typeof row.count === "string" || typeof row.count === "bigint")) {
      return { ...row, count: Number(row.count) };
    }

    return row;
  });
}

async function query(
  sql: string,
  params?: unknown[],
): Promise<[QueryRow[], QueryMeta]> {
  const [rows, result] = await mysqlPool.execute(sql, (params ?? []) as ExecuteValues);
  const rowList = Array.isArray(rows) ? (rows as QueryRow[]) : [];
  const affectedRows =
    result && typeof result === "object" && "affectedRows" in result
      ? Number((result as { affectedRows: number }).affectedRows)
      : 0;

  return [normalizeRows(rowList), { affectedRows }];
}

export const pool = {
  query,
  end: () => mysqlPool.end(),
};
