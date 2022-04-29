import { NextFunction, Request, Response } from "express";
import User, { IUser } from "../models/User";
import { SECRET_TOKEN } from "../config";
import jwt from "jsonwebtoken";

/**
 * Middleware to verify the token Expedient and add the userId to the request
 * @param req - The request object
 * @param res - The response object
 * @param next - The next function to call
 */
export const verifyTokenExp = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  const idSession: string = req.userId;
  const userSession: IUser | null = await User.findById(idSession);
  if (!userSession) return res.status(404).json("User session doesn't exist!");


  if (userSession.role === "doctor") {
    if (!req.headers.authorizationsession)
      return res.status(401).json("Unthorize Session");
    res.removeHeader("authorizationsession");
      
    try {
      const token = req.headers.authorizationsession;
      const payload: any = jwt.verify(token, SECRET_TOKEN);
      req.expSessionId = payload._id;
    } catch (error: any) {
      if (error.name === "JsonWebTokenError") {
        return res.status(401).json("Unthiorize Token");
      } else if (error.name === "TokenExpiredError") {
        return res.status(401).json("Expired Token");
      } else {
        return res.status(401).json("An error ocurred");
      }
    }
    return next();
  }
  if (userSession.role === "patient") {
    return next();
  }
 
  return res.status(401).json("Unthorize Request");
};
