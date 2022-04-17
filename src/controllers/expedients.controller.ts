import { Request, Response } from "express";
import Expedient, { IExpedient } from "../models/Expedient";
import User, { IUser } from "../models/User";
import { upload } from "../libs/cloudinary";
import { UploadApiResponse } from "cloudinary";
import fs from "fs-extra";
/**
 * API endpoint to get a expedient from a patient
 * @param req - The request object
 * @param res - The response object
 * @returns - The promise send to the client
 */
export const getExp = async (req: Request | any, res: Response) => {
  const id: string = req.userId;
  const idExp: string = req.params.id;

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
  const resUpdate = await Expedient.updateOne(
    { expedient: idExp },
    { $push: { files: newFile } }
  );

  return res.status(201).json(resUpdate);
};
