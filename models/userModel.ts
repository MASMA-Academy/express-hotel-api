import db from "../config/db.ts";
import { bcrypt } from "../deps.ts";
import { User } from "../types/index.ts";

export const findUserByEmail = async (email: string): Promise<User | null> => {
  const result = await db.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  return result.rows[0] || null;
};

export const findUserById = async (id: number): Promise<User | null> => {
  const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);
  return result.rows[0] || null;
};

export const createUser = async (userData: Partial<User>): Promise<User> => {
  const { username, email, password } = userData;
  const hashedPassword = await bcrypt.hash(password as string, 10);

  const result = await db.query(
    "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
    [username, email, hashedPassword],
  );

  return result.rows[0];
};
