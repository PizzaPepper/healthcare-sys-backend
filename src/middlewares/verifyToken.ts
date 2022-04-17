import { NextFunction, Request, Response } from "express";
import { SECRET_TOKEN } from "../config";
import jwt from "jsonwebtoken";

/**
 * Middleware to verify the token and add the userId to the request
 * @param req - The request object
 * @param res - The response object
 * @param next - The next function to call
 */
export const verifyToken = (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers.authorization)
    return res.status(401).json("Unthorize Request");

  try {
    const token = req.headers.authorization;
    const payload: any = jwt.verify(token, SECRET_TOKEN);
    req.userId = payload._id;
  } catch (error: any) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json("Unthiorize Token");
    } else if (error.name === "TokenExpiredError") {
      return res.status(401).json("Expired Token");
    } else {
      return res.status(401).json("An error ocurred");
    }
  }

  next();
};
