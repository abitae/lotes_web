import { copyFileSync, mkdirSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

mkdirSync(path.join(root, "dist", "db"), { recursive: true });
copyFileSync(
  path.join(root, "src", "db", "schema.sql"),
  path.join(root, "dist", "db", "schema.sql"),
);
