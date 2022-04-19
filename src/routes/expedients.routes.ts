import { Router } from "express";
import {
  getExp,
  uploadFile,
  getStatusRequest,
  setStatusRequest,
<<<<<<< HEAD
  getExpTest
=======
  setStatusDefault,
>>>>>>> 667bdb3d65c971b7b3b6e0bbec4b4904107dc0c8
} from "../controllers/expedients.controller";
import { verifyToken } from "../middlewares/verifyToken";
const routerExp: Router = Router();

routerExp.get("/:id", verifyToken, getExp);
routerExp.get("/:id/status", verifyToken, getStatusRequest);
routerExp.put("/:id/status", verifyToken, setStatusRequest);
routerExp.put("/:id/statusDefault", verifyToken, setStatusDefault);
routerExp.post("/:id/upload",verifyToken, uploadFile);

routerExp.get("/:id/test",verifyToken,getExpTest);
export default routerExp;
