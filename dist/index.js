"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./db");
const app_1 = __importDefault(require("./app"));
const config_1 = require("./config");
(0, db_1.connectDB)();
app_1.default.listen(config_1.PORT, () => {
    console.log("Server it's work on", config_1.PORT);
});
//# sourceMappingURL=index.js.map