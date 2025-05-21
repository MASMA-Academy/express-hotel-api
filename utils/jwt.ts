import { jwt } from "../deps.ts";
import { JwtPayload } from "../types/index.ts";

const JWT_SECRET = Deno.env.get("JWT_SECRET") || "your-secret-key";

export const generateToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
};

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
};
