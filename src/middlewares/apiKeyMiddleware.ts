import { NextFunction, Request, Response } from "express";

export const apiKeyMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const apiKey = req.header("X-API-Key");

  if (!apiKey || apiKey !== process.env.API_SECRET_KEY) {
    res.status(401).send("Forbidden");
  } else {
    next();
  }
};
