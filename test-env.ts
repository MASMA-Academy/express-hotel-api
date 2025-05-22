import { loadEnv } from "./deps.ts";

// Load environment variables
loadEnv();

console.log("Environment variables:");
console.log("DB_HOST:", Deno.env.get("DB_HOST"));
console.log("DB_PORT:", Deno.env.get("DB_PORT"));
console.log("DB_USER:", Deno.env.get("DB_USER"));
console.log("DB_PASSWORD:", Deno.env.get("DB_PASSWORD") ? "***" : undefined);
console.log("DB_NAME:", Deno.env.get("DB_NAME"));
