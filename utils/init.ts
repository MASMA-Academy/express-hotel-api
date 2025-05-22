import { adminExists, createAdminUser } from "../models/userModel.ts";

/**
 * Initialize a default admin user if no admin exists
 */
export const initializeAdmin = async (): Promise<void> => {
  try {
    console.log("Checking for admin users...");

    const hasAdmin = await adminExists();

    if (!hasAdmin) {
      console.log("No admin users found. Creating default admin user...");

      // Get admin credentials from environment variables or use defaults
      const adminUsername = Deno.env.get("ADMIN_USERNAME") || "admin";
      const adminEmail = Deno.env.get("ADMIN_EMAIL") || "admin@example.com";
      const adminPassword = Deno.env.get("ADMIN_PASSWORD") || "admin123";

      // Create the admin user
      const admin = await createAdminUser(
        adminUsername,
        adminEmail,
        adminPassword,
      );

      console.log(`Default admin user created with email: ${admin.email}`);
      console.log(
        "IMPORTANT: Please change the default admin password immediately!",
      );
    } else {
      console.log("Admin user(s) already exist.");
    }
  } catch (error) {
    console.error("Failed to initialize admin user:");
    console.error(error);
  }
};
