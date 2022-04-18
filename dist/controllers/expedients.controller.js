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
exports.setStatusRequest = exports.getStatusRequest = exports.uploadFile = exports.getExp = void 0;
const Expedient_1 = __importDefault(require("../models/Expedient"));
const User_1 = __importDefault(require("../models/User"));
const cloudinary_1 = require("../libs/cloudinary");
const fs_extra_1 = __importDefault(require("fs-extra"));
/**
 * API endpoint to get a expedient from a patient
 * @param req - The request object
 * @param res - The response object
 * @returns - The promise send to the client
 */
const getExp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.userId;
    const idExp = req.params.id;
    // * Check if the user exists
    const user = yield User_1.default.findById(id);
    if (!user)
        return res.status(404).json("user doesn't exist!");
    // * Check if the user is a doctor or have the same expedient
    if (user.role == "patient" && user.expedient != idExp)
        return res.status(401).json("Unauthorized Expedient");
    // * Check if the expedient exists with the expedient id
    // TODO: Improve this query
    let exp = yield Expedient_1.default.aggregate([
        {
            $lookup: {
                from: "users",
                localField: "patient",
                foreignField: "_id",
                as: "patient",
            },
        },
        {
            $match: {
                "patient.expedient": idExp,
            },
        },
        { $limit: 1 },
        {
            $project: {
                id: 1,
                patient: {
                    $first: "$patient",
                },
                records: 1,
                files: 1,
                requestAccess: 1,
            },
        },
    ]);
    exp = exp[0];
    if (!exp)
        return res.status(404).json("Expedient doesn't exist!");
    return res.status(200).json(exp);
});
exports.getExp = getExp;
/**
 * API endpoint to upload a file to an expedient
 * @param req - The request object
 * @param res - The response object
 * @returns - The promise send to the client
 */
const uploadFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const idExp = req.params.id;
    // * Check if the header 'fileuploading' is present
    if (!((_a = req.files) === null || _a === void 0 ? void 0 : _a.fileuploading))
        return res.status(404).json("File doesn't exist!");
    // * Upload the file to cloudinary
    const result = yield (0, cloudinary_1.upload)(req.files.fileuploading.tempFilePath);
    fs_extra_1.default.remove(req.files.fileuploading.tempFilePath);
    // * Fill the file object
    const newFile = {
        name: req.files.fileuploading.name,
        extension: result.format,
        url: result.url,
        public_id: result.public_id,
    };
    // * Check if the expedient exists
    yield Expedient_1.default.updateOne({ expedient: idExp }, { $push: { files: newFile } }, { new: true });
    return res.status(201).json(newFile);
});
exports.uploadFile = uploadFile;
/**
 * API endpoint to get current status access of an expedient
 * @param req - The request object
 * @param res - The response object
 * @returns - The promise send to the client
 */
const getStatusRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idExp = req.params.id;
    // * Check if the expedient exists
    const exp = yield Expedient_1.default.findOne({ expedient: idExp });
    if (!exp)
        return res.status(404).json("Expedient doesn't exist!");
    return res.status(200).json(exp.requestAccess);
});
exports.getStatusRequest = getStatusRequest;
/**
 * API endpoint to change the status access of an expedient
 * @param req - The request object
 * @param res - The response object
 * @returns - The promise send to the client
 */
const setStatusRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.userId;
    const idExp = req.params.id;
    // * Check if the user exists (sesion)
    const user = yield User_1.default.findById(id);
    if (!user)
        return res.status(404).json("user doesn't exist!");
    // * Check if the expedient exists
    const exp = yield Expedient_1.default.findOne({ expedient: idExp });
    if (!exp)
        return res.status(404).json("Expedient doesn't exist!");
    // * Check if the user is the patient
    if (user.role === "patient") {
        if (exp.requestAccess === "accepted")
            return res.status(400).json("Status already accepted");
        if (exp.requestAccess === "default")
            return res.status(400).json("Status already default");
        if (exp.requestAccess === "pending") {
            // * Update the expedient to accepted if status is pending
            yield Expedient_1.default.updateOne({ expedient: idExp }, { $set: { requestAccess: "accepted" } }, { new: true });
            return res.status(200).json("Status accepted");
        }
        else {
            return res.status(400).json("Status not allowed");
        }
    }
    // * Check if the user is the doctor
    if (user.role === "doctor") {
        if (exp.requestAccess === "pending")
            return res.status(400).json("Status already pending");
        if (exp.requestAccess === "default") {
            // * Update the expedient to pending if status is default
            yield Expedient_1.default.updateOne({ expedient: idExp }, { $set: { requestAccess: "pending" } }, { new: true });
            return res.status(200).json("Status pending");
        }
        if (exp.requestAccess === "accepted") {
            // * Update the expedient to default if status is accepted
            yield Expedient_1.default.updateOne({ expedient: idExp }, { $set: { requestAccess: "default" } }, { new: true });
            return res.status(200).json("Status default");
        }
    }
    return res.status(400).json("Status not allowed");
});
exports.setStatusRequest = setStatusRequest;
//# sourceMappingURL=expedients.controller.js.map