import { NextFunction, Request, Response } from "../deps.ts";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(err.stack);

  res.status(500).json({
    message: err.message || "Something went wrong on the server",
    stack: Deno.env.get("NODE_ENV") === "production" ? null : err.stack,
  });
};
