import { Router } from "express";
import {
  getExp,
  uploadFile,
  getStatusRequest,
  setStatusRequest,
  setStatusDefault,
} from "../controllers/expedients.controller";
import { verifyToken } from "../middlewares/verifyToken";
import { verifyTokenExp } from "../middlewares/verifyTokenExp";
const routerExp: Router = Router();

routerExp.get("/:id", verifyToken, verifyTokenExp, getExp);
routerExp.get("/:id/status", verifyToken, getStatusRequest);
routerExp.put("/:id/status", verifyToken, setStatusRequest);
routerExp.put("/:id/statusDefault", verifyToken, setStatusDefault);
routerExp.post("/:id/upload", verifyToken, uploadFile);

export default routerExp;
