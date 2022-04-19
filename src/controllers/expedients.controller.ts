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
  const id: string = req.userId;
  const idExp: string = req.params.id;

  // * Check if the user exists
  const user: IUser | null = await User.findById(id);
  if (!user) return res.status(404).json("user doesn't exist!");

  // * Check if the user is a doctor or have the same expedient
  if (user.role == "patient" && user.expedient != idExp)
    return res.status(401).json("Unauthorized Expedient");

  // * Check if the expedient exists with the expedient id
  // TODO: Improve this query
  let exp: IExpedient | Array<IExpedient> = await Expedient.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "patient",
        foreignField: "_id",
        as: "patient",
      },
    },
    {
      $match: {
        "patient.expedient": idExp,
      },
    },
    { $limit: 1 },
    {
      $project: {
        id: 1,
        patient: {
          $first: "$patient",
        },
        records: 1,
        files: 1,
        requestAccess: 1,
      },
    },
  ]);

  exp = exp[0];
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
    { expedient: idExp },
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
  // * Check if the expedient exists
  const exp: IExpedient | null = await Expedient.findOne({ expedient: idExp }).populate('patient');
  if (!exp) return res.status(404).json("Expedient doesn't exist!");
  console.log(exp);
  
  return res.status(200).json(exp.requestAccess);
};

/**
 * API endpoint to change the status access of an expedient
 * @param req - The request object
 * @param res - The response object
 * @returns - The promise send to the client
 */
export const setStatusRequest = async (req: Request | any, res: Response) => {
  const id: string = req.userId;
  const idExp: string = req.params.id;
  
  
  // * Check if the user exists (sesion)
  const user: IUser | null = await User.findById(id);
  if (!user) return res.status(404).json("User doesn't exist!");

  // * Check if the expedient exists
  const exp: IExpedient | null = await Expedient.findOne({ expedient: idExp });
  if (!exp) return res.status(404).json("Expedient doesn't exist!");

  const stateAccessStrategy: StateAccessStrategy= new StateAccessStrategy();
  stateAccessStrategy.setRequestAccess(exp.requestAccess);
  stateAccessStrategy.setIdExp(idExp);

  // * Check if the user is the patient
  if (user.role === "patient") {
   stateAccessStrategy.setStrategyAccess(new StrategyPatient());
  }

  // * Check if the user is the doctor
  if (user.role === "doctor") {
    stateAccessStrategy.setStrategyAccess(new StrategyDoctor());
  }

  return await stateAccessStrategy.HandlerStrategy(req, res);
};

export const setStatusDefault= async (req: Request | any, res: Response) =>{
  const id: string = req.userId;
  const idExp: string = req.params.id;
  
  // * Check if the user exists (sesion)
  const user: IUser | null = await User.findById(id);
  if (!user) return res.status(404).json("User doesn't exist!");

  // * Check if the expedient exists
  const exp: IExpedient | null = await Expedient.findOne({ expedient: idExp });
  if (!exp) return res.status(404).json("Expedient doesn't exist!");

  //Set Expedient status to default
  await Expedient.updateOne(
    { expedient: idExp },
    { $set: { requestAccess: "default" } },
    { new: true }
  );
  
  return res.status(200).json("Expedient status changed to default");
}
