import { Router } from "express";
import {
  getExp,
  uploadFile,
  getStatusRequest,
  setStatusRequest,
} from "../controllers/expedients.controller";
import { verifyToken } from "../middlewares/verifyToken";
const routerExp: Router = Router();

routerExp.get("/:id", verifyToken, getExp);
routerExp.get("/:id/status", verifyToken, getStatusRequest);
routerExp.put("/:id/status", verifyToken, setStatusRequest);
routerExp.post("/:id/upload",verifyToken, uploadFile);

export default routerExp;
