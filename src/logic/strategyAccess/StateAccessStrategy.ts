import  IStrategyAccess  from "./IStrategyAccess";
import { Request, Response } from "express";

export default class StateAccessStrategy {
  constructor(private strategy?: IStrategyAccess,private requestAccess: string='', private idExp:string='') {}

  setStrategyAccess(strategy: IStrategyAccess): void {
    this.strategy = strategy;
  }

  setRequestAccess(requestAccess: string): void {
    this.requestAccess = requestAccess;
  }

  setIdExp(idExp: string): void {
    this.idExp = idExp;
  }

  async HandlerStrategy(req: Request, res: Response): Promise<any> {
    return await this.strategy?.handlerAccess(req, res, this.requestAccess,this.idExp);
  }
}
