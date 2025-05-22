import app from "./app.ts";
import { loadEnv } from "./deps.ts";
import { initializeAdmin } from "./utils/init.ts";

// Load environment variables (will be loaded in app.ts, but ensuring it's loaded here too)
loadEnv({ export: true });

const PORT = Deno.env.get("PORT") || 3000;

// Initialize the admin user before starting the server
await initializeAdmin();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
