import { Router } from "express";
import { getExp, uploadFile } from "../controllers/expedients.controller";
import { verifyToken } from "../middlewares/verifyToken";
const routerExp: Router = Router();

routerExp.get("/:id", verifyToken, getExp);
routerExp.post("/:id/upload", verifyToken, uploadFile);
export default routerExp;
