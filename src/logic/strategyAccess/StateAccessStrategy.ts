import IStrategyAccess from "./IStrategyAccess";
import { Request, Response } from "express";

export default class StateAccessStrategy {
  constructor(
    private strategy?: IStrategyAccess,
    private requestAccess: string = "",
    private idUser: string = ""
  ) {}

  setStrategyAccess(strategy: IStrategyAccess): void {
    this.strategy = strategy;
  }

  setRequestAccess(requestAccess: string): void {
    this.requestAccess = requestAccess;
  }


  setIdUser(idUser: string): void {
    this.idUser = idUser;
  }

  async HandlerStrategy(req: Request, res: Response): Promise<any> {
    return await this.strategy?.handlerAccess(
      req,
      res,
      this.requestAccess,
      this.idUser
    );
  }
}
