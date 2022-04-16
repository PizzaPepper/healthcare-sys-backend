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
exports.getExp = void 0;
const Expedient_1 = __importDefault(require("../models/Expedient"));
const User_1 = __importDefault(require("../models/User"));
/**
 * API endpoint to get a expedient from a patient
 * @param req - The request object
 * @param res - The response object
 * @returns - The promise send to the client
 */
const getExp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.userId;
    const idExp = req.params.id;
    // ? Middleware here?
    // * Check if the user exists
    const user = yield User_1.default.findById(id);
    if (!user)
        return res.status(404).json("user doesn't exist!");
    // * Check if the user is a doctor or have the same expedient
    if (user.role == "patient" && user.expedient != idExp)
        return res.status(401).json("Unauthorized Expedient");
    // * Check if the expedient exists
    const exp = yield Expedient_1.default.findOne({
        expedient: idExp,
    }).populate({
        path: "patient",
        select: "-_id -username -password",
    });
    if (!exp)
        return res.status(404).json("Expedient doesn't exist!");
    return res.status(200).json(exp);
});
exports.getExp = getExp;
//# sourceMappingURL=expedients.controller.js.map