import pg from "pg";

const pgPool = new pg.Pool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "lotes_web",
  max: 10,
});

type QueryMeta = {
  affectedRows: number;
};

function toPgPlaceholders(sql: string, params: unknown[]): { text: string; values: unknown[] } {
  if (params.length === 0) {
    return { text: sql, values: [] };
  }

  let index = 0;
  const text = sql.replace(/\?/g, () => `$${++index}`);

  return { text, values: params };
}

function normalizeRows(rows: pg.QueryResultRow[]): pg.QueryResultRow[] {
  return rows.map((row) => {
    if ("count" in row && typeof row.count === "string") {
      return { ...row, count: Number(row.count) };
    }

    return row;
  });
}

async function query(
  sql: string,
  params?: unknown[],
): Promise<[pg.QueryResultRow[], QueryMeta]> {
  const values = params ?? [];
  const { text, values: pgValues } = toPgPlaceholders(sql, values);
  const result = await pgPool.query(text, pgValues);

  return [
    normalizeRows(result.rows),
    { affectedRows: result.rowCount ?? 0 },
  ];
}

export const pool = {
  query,
  end: () => pgPool.end(),
};
