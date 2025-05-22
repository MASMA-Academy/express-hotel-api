import { Request, Response } from "../deps.ts";
import { bcrypt } from "../deps.ts";
import { createUser, findUserByEmail, promoteAdmin } from "../models/userModel.ts";
import { generateToken } from "../utils/jwt.ts";

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists with this email",
      });
    }

    // Create new user
    const user = await createUser({ username, email, password });

    // Generate JWT
    const token = generateToken({ userId: user.id, isAdmin: user.isAdmin });

    // Debug log
    console.log("Registered user:", {
      id: user.id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    });

    res.status(201).json({
      id: user.id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      token,
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error
      ? error.message
      : "An unknown error occurred";
    res.status(500).json({ message: errorMessage });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT
    const token = generateToken({ userId: user.id, isAdmin: user.isAdmin });

    // Debug log
    console.log("Logged in user:", {
      id: user.id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    });

    res.json({
      id: user.id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      token,
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error
      ? error.message
      : "An unknown error occurred";
    res.status(500).json({ message: errorMessage });
  }
};


export const promote = async (req: Request, res: Response) => {
  try {
    const user = await promoteAdmin(req.body.email);

    // Debug log
    console.log("Promoted user:", {
      id: user.id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    });

    res.status(201).json({
      id: user.id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error
      ? error.message
      : "An unknown error occurred";
    res.status(500).json({ message: errorMessage });
  }
};
