import db from "./config/db.ts";

console.log("Testing database connection...");

try {
  const client = await db.connect();
  console.log("Database connection successful!");

  const result = await client.query("SELECT 1 as test");
  console.log("Query result:", result.rows);

  client.release();
} catch (error) {
  console.error("Database connection failed:");
  console.error(error);
}
