"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const expedients_controller_1 = require("../controllers/expedients.controller");
const verifyToken_1 = require("../middlewares/verifyToken");
const routerExp = (0, express_1.Router)();
routerExp.get("/:id", verifyToken_1.verifyToken, expedients_controller_1.getExp);
exports.default = routerExp;
//# sourceMappingURL=expedients.routes.js.map