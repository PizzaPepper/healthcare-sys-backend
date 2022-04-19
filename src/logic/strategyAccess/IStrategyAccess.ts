import { Request, Response } from "express";
export default interface IStrategyAccess {
  handlerAccess(
    req: Request,
    res: Response,
    requestAccess: string,
    idUser: string
  ): Promise<any>;
}
