import IStrategyAccess from "./IStrategyAccess";
import { Request, Response } from "express";
import Expedient from "../../models/Expedient";

export default class StrategyDoctor implements IStrategyAccess {
  async handlerAccess(
    req: Request,
    res: Response,
    requestAccess: string,
    idExp: string
  ): Promise<any> {
    if (requestAccess === "pending")
      return res.status(400).json("Status already pending");

    if (requestAccess === "default") {
      // * Update the expedient to pending if status is default
      await Expedient.updateOne(
        { expedient: idExp },
        { $set: { requestAccess: "pending" } },
        { new: true }
      );
      return res.status(200).json("Status pending");
    }

    if (requestAccess === "accepted") {
      // * Update the expedient to default if status is accepted
      await Expedient.updateOne(
        { expedient: idExp },
        { $set: { requestAccess: "default" } },
        { new: true }
      );
    return res.status(200).json("Status default");

    }
    
    return res.status(200).json("Status not allowed");
  }
}
