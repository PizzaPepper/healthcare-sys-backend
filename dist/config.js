"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SECRET_TOKEN = exports.MONGODB_URI = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.PORT = process.env.PORT || 3000;
exports.MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/healthcareTest';
exports.SECRET_TOKEN = process.env.SECRET_TOKEN || 'whateveryouwant';
//# sourceMappingURL=config.js.map