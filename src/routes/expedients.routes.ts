import { Router } from "express";
import {
  getExp,
  uploadFile,
  getStatusRequest,
  setStatusRequest,
  getExpTest
} from "../controllers/expedients.controller";
import { verifyToken } from "../middlewares/verifyToken";
const routerExp: Router = Router();

routerExp.get("/:id", verifyToken, getExp);
routerExp.get("/:id/status", verifyToken, getStatusRequest);
routerExp.put("/:id/status", verifyToken, setStatusRequest);
routerExp.post("/:id/upload",verifyToken, uploadFile);

routerExp.get("/:id/test",verifyToken,getExpTest);
export default routerExp;
