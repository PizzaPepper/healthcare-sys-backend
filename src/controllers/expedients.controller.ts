import { Request, Response } from "express";
import Expedient, { IExpedient } from "../models/Expedient";
import User, { IUser } from "../models/User";

/**
 * API endpoint to get a expedient from a patient
 * @param req - The request object
 * @param res - The response object
 * @returns - The promise send to the client
 */
export const getExp = async (req: Request | any, res: Response) => {
  const id = req.userId;
  const idExp = req.params.id;

  // ? Middleware here?
  // * Check if the user exists
  const user: IUser | null = await User.findById(id);
  if (!user) return res.status(404).json("user doesn't exist!");

  // * Check if the user is a doctor or have the same expedient
  if (user.role == "patient" && user.expedient != idExp)
    return res.status(401).json("Unauthorized Expedient");

  // * Check if the expedient exists
  const exp: IExpedient | null = await Expedient.findOne({
    expedient: idExp,
  }).populate({
    path: "patient",
    select: "-_id -username -password",
  });

  if (!exp) return res.status(404).json("Expedient doesn't exist!");

  return res.status(200).json(exp);
};
