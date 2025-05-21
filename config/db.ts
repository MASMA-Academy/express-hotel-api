import { loadEnv, Pool } from "../deps.ts";

// Load environment variables
loadEnv();

const pool = new Pool({
  host: Deno.env.get("DB_HOST") || "localhost",
  port: parseInt(Deno.env.get("DB_PORT") || "5432"),
  user: Deno.env.get("DB_USER") || "postgres",
  password: Deno.env.get("DB_PASSWORD") || "postgres",
  database: Deno.env.get("DB_NAME") || "hotel_booking",
});

export default pool;
