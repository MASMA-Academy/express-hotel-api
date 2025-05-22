import db from "../config/db.ts";
import { bcrypt } from "../deps.ts";
import { User } from "../types/index.ts";

export const findUserByEmail = async (email: string): Promise<User | null> => {
  const result = await db.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);

  if (!result.rows[0]) return null;

  // Map database fields to TypeScript model
  const user = result.rows[0];
  return {
    ...user,
    isAdmin: user.is_admin,
  };
};

export const findUserById = async (id: number): Promise<User | null> => {
  const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);

  if (!result.rows[0]) return null;

  // Map database fields to TypeScript model
  const user = result.rows[0];
  return {
    ...user,
    isAdmin: user.is_admin,
  };
};

export const createUser = async (userData: Partial<User>): Promise<User> => {
  const { username, email, password, isAdmin = false } = userData;
  const hashedPassword = await bcrypt.hash(password as string, 10);

  const result = await db.query(
    "INSERT INTO users (username, email, password, is_admin) VALUES ($1, $2, $3, $4) RETURNING *",
    [username, email, hashedPassword, isAdmin],
  );

  // Map database fields to TypeScript model
  const user = result.rows[0];
  return {
    ...user,
    isAdmin: user.is_admin,
  };
};

export const adminExists = async (): Promise<boolean> => {
  const result = await db.query(
    "SELECT COUNT(*) FROM users WHERE is_admin = true",
  );
  return parseInt(result.rows[0].count) > 0;
};

export const createAdminUser = async (
  username: string,
  email: string,
  password: string,
): Promise<User> => {
  return await createUser({
    username,
    email,
    password,
    isAdmin: true,
  });
};


export const promoteAdmin = async (
  email: string):  Promise<User> => {
  const result = await db.query("UPDATE users SET is_admin = TRUE WHERE email = $1", [email]);
  
  // Map database fields to TypeScript model
  const user = result.rows[0];
  return {
    ...user,
    isAdmin: true,
  };
};