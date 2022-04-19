"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const expedients_controller_1 = require("../controllers/expedients.controller");
const verifyToken_1 = require("../middlewares/verifyToken");
const routerExp = (0, express_1.Router)();
routerExp.get("/:id", verifyToken_1.verifyToken, expedients_controller_1.getExp);
routerExp.get("/:id/status", verifyToken_1.verifyToken, expedients_controller_1.getStatusRequest);
routerExp.put("/:id/status", verifyToken_1.verifyToken, expedients_controller_1.setStatusRequest);
routerExp.put("/:id/statusDefault", verifyToken_1.verifyToken, setStatusDefault);
routerExp.post("/:id/upload", verifyToken_1.verifyToken, expedients_controller_1.uploadFile);
routerExp.get("/:id/test", verifyToken_1.verifyToken, expedients_controller_1.getExpTest);
exports.default = routerExp;
//# sourceMappingURL=expedients.routes.js.map