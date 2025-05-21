import { assertEquals } from "https://deno.land/std@0.217.0/assert/mod.ts";
import app from "./app.ts";

// Simple test to check if the API server is configured correctly
Deno.test("API setup test", async () => {
  // Ensure app object exists and has expected methods
  assertEquals(
    typeof app.listen,
    "function",
    "Express app should have listen method",
  );
  assertEquals(
    typeof app.use,
    "function",
    "Express app should have use method",
  );
  assertEquals(
    typeof app.get,
    "function",
    "Express app should have get method",
  );
});
