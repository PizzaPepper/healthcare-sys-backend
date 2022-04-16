"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const config_1 = require("../config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/**
 * Middleware to verify the token and add the userId to the request
 * @param req - The request object
 * @param res - The response object
 * @param next - The next function to call
 */
const verifyToken = (req, res, next) => {
    if (!req.headers.authorization)
        return res.status(401).json("Unthorize Request");
    try {
        const token = req.headers.authorization;
        const payload = jsonwebtoken_1.default.verify(token, config_1.SECRET_TOKEN);
        req.userId = payload._id;
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
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=verifyToken.js.map