import { Request, Response } from "express";
import { SECRET_TOKEN } from "../config";
import User from "../models/User";
import jwt from "jsonwebtoken";

/**
 * API endpoint to get a token from a user
 * @param req - The request object
 * @param res - The response object
 * @returns - The promise send to the client.
 */
export const signin = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  // * Check if the user exists
  const user = await User.findOne({ username: username });
  if (!user) return res.status(404).json("Username or Password is wrong");

  // * Check if the password is right
  const correctPassword: boolean = user.password === password;
  if (!correctPassword) return res.status(403).json("Invalid Password");

  // * Add a token of 1 hour session & put the userId in the payload
  const token: string = jwt.sign({ _id: user._id }, SECRET_TOKEN, {
    expiresIn: 60 * 60 * 2, // 1 hour
  });

  return res.status(200).json(token);
};

/**
 * API endpoint to get a user from a token
 * @param res - The request object
 * @param req - The response object
 * @returns - The promise send to the client
 */
export const getUser = async (req: Request | any, res: Response) => {
  // * Must be verified with a token before
  const id = req.userId;

  // * Check if the user exists
  const user = await User.findById(id);
  if (!user) return res.status(404).json("user doesn't exist!");

  return res.status(200).json(user);
};

/**
 * API endpoint to get all patients
 * @param req - The request object
 * @param res - The response object
 * @returns - The promise send to the client
 */
export const getPatients = async (req: Request | any, res: Response) => {
  // * Check if the patients exists
  const patients = await User.find({ role: "patient" });
  if (!patients) return res.status(404).json("patient doesn't exist!");

  return res.status(200).json(patients);
};
