import { Request, Response } from "express";
import Expedient, { IExpedient } from "../models/Expedient";
import User, { IUser } from "../models/User";
import { upload } from "../libs/cloudinary";
import { UploadApiResponse } from "cloudinary";
import fs from "fs-extra";
import StateAccessStrategy from "../logic/strategyAccess/StateAccessStrategy";
import StrategyPatient from "../logic/strategyAccess/StrategyPatient";
import StrategyDoctor from "../logic/strategyAccess/StrategyDoctor";

/**
 * API endpoint to get a expedient from a patient
 * @param req - The request object
 * @param res - The response object
 * @returns - The promise send to the client
 */
export const getExp = async (req: Request | any, res: Response) => {
  const idUserSession: string = req.userId;
  const idExpSession: string = req.expSessionId;
  const idExp: string = req.params.id;

  // * Check if the user exists
  const user: IUser | null = await User.findOne({ expedient: idExp });
  if (!user) return res.status(404).json("User doesn't exist!");

  // * Get info user session
  const userSession: IUser | null = await User.findById(idUserSession);
  if (!userSession) return res.status(404).json("User session doesn't exist!");

  // * Check if the user is a patient and has the same expedient
  if (userSession.role === "patient") {
    if (userSession.expedient != idExp)
      return res.status(401).json("Unauthorized Expedient");
  }

  // * Check if the user is a doctor and has the same expedient
  if (userSession.role === "doctor") {
    if (idExpSession != idExp)
      return res.status(401).json("Unauthorized Expedient");
  }

  // * Check if the expedient exists with the expedient id
  const exp: IExpedient | null = await Expedient.findOne({ patient: user.id });
  if (!exp) return res.status(404).json("Expedient doesn't exist!");
  
  return res.status(200).json(exp);
};

/**
 * API endpoint to upload a file to an expedient
 * @param req - The request object
 * @param res - The response object
 * @returns - The promise send to the client
 */
export const uploadFile = async (req: Request | any, res: Response) => {
  const idExp: string = req.params.id;

  const user: IUser | null = await User.findOne({ expedient: idExp });
  if (!user) return res.status(404).json("User doesn't exist!");

  // * Check if the header 'fileuploading' is present
  if (!req.files?.fileuploading)
    return res.status(404).json("File doesn't exist!");

  // * Upload the file to cloudinary
  const result: UploadApiResponse = await upload(
    req.files.fileuploading.tempFilePath
  );

  fs.remove(req.files.fileuploading.tempFilePath);

  // * Fill the file object
  const newFile = {
    name: req.files.fileuploading.name,
    extension: result.format,
    url: result.url,
    public_id: result.public_id,
  };

  // * Check if the expedient exists
  await Expedient.updateOne(
    { patient: user.id },
    { $push: { files: newFile } },
    { new: true }
  );
  return res.status(201).json(newFile);
};

/**
 * API endpoint to get current status access of an expedient
 * @param req - The request object
 * @param res - The response object
 * @returns - The promise send to the client
 */
export const getStatusRequest = async (req: Request | any, res: Response) => {
  const idExp: string = req.params.id;

  const user: IUser | null = await User.findOne({ expedient: idExp });
  if (!user) return res.status(404).json("User doesn't exist!");

  const exp: IExpedient | null = await Expedient.findOne({ patient: user.id });
  if (!exp) return res.status(404).json("Expedient doesn't exist!");
  return res.status(200).json(exp.requestAccess);
};

/**
 * API endpoint to change the status access of an expedient
 * @param req - The request object
 * @param res - The response object
 * @returns - The promise send to the client
 */
export const setStatusRequest = async (req: Request | any, res: Response) => {
  const idUserSession: string = req.userId;
  const idExp: string = req.params.id;

  // * Check if the user exists (sesion)
  const userSession: IUser | null = await User.findById(idUserSession);
  if (!userSession) return res.status(404).json("User session doesn't exist!");

  // * Check if the user exists (expedient)
  const userExp: IUser | null = await User.findOne({ expedient: idExp });
  if (!userExp) return res.status(404).json("User doesn't exist!");

  // * Check if the expedient exists
  const exp: IExpedient | null = await Expedient.findOne({
    patient: userExp.id,
  });
  if (!exp) return res.status(404).json("Expedient doesn't exist!");

  const stateAccessStrategy: StateAccessStrategy = new StateAccessStrategy();
  stateAccessStrategy.setRequestAccess(exp.requestAccess);
  stateAccessStrategy.setIdUser(userExp.id);

  // * Check if the user is the patient
  if (userSession.role === "patient") {
    stateAccessStrategy.setStrategyAccess(new StrategyPatient());
  }

  // * Check if the user is the doctor
  if (userSession.role === "doctor") {
    stateAccessStrategy.setStrategyAccess(new StrategyDoctor());
  }

  return await stateAccessStrategy.HandlerStrategy(req, res);
};

/**
 * API endpoint to set the status access of an expedient
 * @param req - The request object
 * @param res - The response object
 * @returns - The promise send to the client
 */
export const setStatusDefault = async (req: Request | any, res: Response) => {
  const idExp: string = req.params.id;

  // * Check if the user exists (sesion)
  const user: IUser | null = await User.findOne({ expedient: idExp });
  if (!user) return res.status(404).json("User doesn't exist!");

  // * Check if the expedient exists
  const exp: IExpedient | null = await Expedient.findOne({ patient: user.id });
  if (!exp) return res.status(404).json("Expedient doesn't exist!");
  // * Set Expedient status to default
  await Expedient.updateOne(
    { patient: user.id },
    { $set: { requestAccess: "default" } },
    { new: true }
  );

  return res.status(200).json("Expedient status changed to default");
};
