"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controller_1 = require("../controllers/users.controller");
const verifyToken_1 = require("../middlewares/verifyToken");
const routerUser = (0, express_1.Router)();
routerUser.post("/signin", users_controller_1.signin);
routerUser.get("/", verifyToken_1.verifyToken, users_controller_1.getUser);
routerUser.get("/allpatients", verifyToken_1.verifyToken, users_controller_1.getPatients);
exports.default = routerUser;
//# sourceMappingURL=users.routes.js.map