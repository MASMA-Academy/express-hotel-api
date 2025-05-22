import { loadEnv, Pool } from "../deps.ts";

// Load environment variables from .env file
const env = loadEnv({ export: true });

// Verify that environment variables are loaded
console.log("Database configuration:");
console.log("DB_HOST:", Deno.env.get("DB_HOST"));
console.log("DB_PORT:", Deno.env.get("DB_PORT"));
console.log("DB_USER:", Deno.env.get("DB_USER"));
console.log("DB_NAME:", Deno.env.get("DB_NAME"));

const pool = new Pool({
  host: Deno.env.get("DB_HOST") || "localhost",
  port: parseInt(Deno.env.get("DB_PORT") || "5432"),
  user: Deno.env.get("DB_USER") || "postgres",
  password: Deno.env.get("DB_PASSWORD") || "postgres",
  database: Deno.env.get("DB_NAME") || "hotel_booking",
});

export default pool;
