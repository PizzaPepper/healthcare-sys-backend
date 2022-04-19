import IStrategyAccess from "./IStrategyAccess";
import { Request, Response } from "express";
import Expedient from "../../models/Expedient";
import User from "../../models/User";

export default class StrategyPatient implements IStrategyAccess {
  async handlerAccess(
    req: Request,
    res: Response,
    requestAccess: string,
    idUser: string
  ): Promise<any> {

    if (requestAccess === "accepted")
      return res.status(400).json("Status already accepted");
    if (requestAccess === "default")
      return res.status(400).json("Status already default");

    if (requestAccess === "pending") {
      // * Update the expedient to accepted if status is pending
      await Expedient.updateOne(
        { patient: idUser},
        { $set: { requestAccess: "accepted" } },
        { new: true }
      );
      return res.status(200).json("Status accepted");
    }
    
    return res.status(400).json("Status not allowed");
  }
}
