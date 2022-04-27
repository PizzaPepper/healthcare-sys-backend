"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyTokenExp = void 0;
const User_1 = __importDefault(require("../models/User"));
const config_1 = require("../config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/**
 * Middleware to verify the token Expedient and add the userId to the request
 * @param req - The request object
 * @param res - The response object
 * @param next - The next function to call
 */
const verifyTokenExp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const idSession = req.userId;
    const userSession = yield User_1.default.findById(idSession);
    if (!userSession)
        return res.status(404).json("User session doesn't exist!");
    if (userSession.role === "doctor") {
        if (!req.headers.authorizationSession)
            return res.status(401).json("Unthorize Session");
        try {
            const token = req.headers.authorizationSession;
            const payload = jsonwebtoken_1.default.verify(token, config_1.SECRET_TOKEN);
            req.expSessionId = payload._id;
        }
        catch (error) {
            if (error.name === "JsonWebTokenError") {
                return res.status(401).json("Unthiorize Token");
            }
            else if (error.name === "TokenExpiredError") {
                return res.status(401).json("Expired Token");
            }
            else {
                return res.status(401).json("An error ocurred");
            }
        }
        next();
    }
    if (userSession.role === "patient") {
        next();
    }
    return res.status(401).json("Unthorize Request");
});
exports.verifyTokenExp = verifyTokenExp;
//# sourceMappingURL=verifyTokenExp.js.map