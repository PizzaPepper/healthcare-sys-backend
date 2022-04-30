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
const Expedient_1 = __importDefault(require("../../models/Expedient"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../config");
const User_1 = __importDefault(require("../../models/User"));
class StrategyDoctor {
    handlerAccess(req, res, requestAccess, idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            if (requestAccess === "pending")
                return res.status(400).json("Status already pending");
            if (requestAccess === "default") {
                // * Update the expedient to pending if status is default
                yield Expedient_1.default.updateOne({ patient: idUser }, { $set: { requestAccess: "pending" } }, { new: true });
                return res.status(200).json("Status pending");
            }
            if (requestAccess === "accepted") {
                // * Update the expedient to default if status is accepted
                yield Expedient_1.default.findOneAndUpdate({ patient: idUser }, { $set: { requestAccess: "default" } }, { new: true });
                // * Get the user
                const user = yield User_1.default.findById(idUser);
                const tokenExp = jsonwebtoken_1.default.sign({ _id: user === null || user === void 0 ? void 0 : user.expedient }, config_1.SECRET_TOKEN, {
                    expiresIn: 60 * 60, // 1 hour
                });
                return res
                    .status(200)
                    .setHeader("X-Token", tokenExp)
                    .json("Status default");
            }
            return res.status(200).json("Status not allowed");
        });
    }
}
exports.default = StrategyDoctor;
//# sourceMappingURL=StrategyDoctor.js.map