import { Router } from "express";
import { signin ,getUser, getPatients} from "../controllers/users.controller";
import { verifyToken } from "../middlewares/verifyToken";
const routerUser: Router = Router();

routerUser.post("/signin", signin);
routerUser.get("/",verifyToken, getUser);
routerUser.get("/allpatients",verifyToken,getPatients);

export default routerUser;
