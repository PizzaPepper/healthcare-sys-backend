import IStrategyAccess from "./IStrategyAccess";
import { Request, Response } from "express";
import Expedient from "../../models/Expedient";
import jwt from "jsonwebtoken";
import { SECRET_TOKEN } from "../../config";
import User, { IUser } from "../../models/User";

export default class StrategyDoctor implements IStrategyAccess {
  async handlerAccess(
    req: Request,
    res: Response,
    requestAccess: string,
    idUser: string
  ): Promise<any> {
    if (requestAccess === "pending")
      return res.status(400).json("Status already pending");

    if (requestAccess === "default") {
      // * Update the expedient to pending if status is default
      await Expedient.updateOne(
        { patient: idUser },
        { $set: { requestAccess: "pending" } },
        { new: true }
      );
      return res.status(200).json("Status pending");
    }

    if (requestAccess === "accepted") {
      // * Update the expedient to default if status is accepted
      await Expedient.findOneAndUpdate(
        { patient: idUser },
        { $set: { requestAccess: "default" } },
        { new: true }
      );

      // * Get the user
      const user: IUser | null = await User.findById(idUser);

      const tokenExp: string = jwt.sign(
        { _id: user?.expedient },
        SECRET_TOKEN,
        {
          expiresIn: 60 * 60, // 1 hour
        }
      );
      return res
        .status(200)
        .setHeader("X-Token", tokenExp)
        .json("Status default");
    }

    return res.status(200).json("Status not allowed");
  }
}
