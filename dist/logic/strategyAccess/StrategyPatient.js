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
class StrategyPatient {
    handlerAccess(req, res, requestAccess, idExp) {
        return __awaiter(this, void 0, void 0, function* () {
            if (requestAccess === "accepted")
                return res.status(400).json("Status already accepted");
            if (requestAccess === "default")
                return res.status(400).json("Status already default");
            if (requestAccess === "pending") {
                // * Update the expedient to accepted if status is pending
                yield Expedient_1.default.updateOne({ expedient: idExp }, { $set: { requestAccess: "accepted" } }, { new: true });
                return res.status(200).json("Status accepted");
            }
            return res.status(400).json("Status not allowed");
        });
    }
}
exports.default = StrategyPatient;
//# sourceMappingURL=StrategyPatient.js.map