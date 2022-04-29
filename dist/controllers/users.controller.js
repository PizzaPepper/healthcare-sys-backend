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
exports.getPatients = exports.getUser = exports.signin = void 0;
const config_1 = require("../config");
const User_1 = __importDefault(require("../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/**
 * API endpoint to get a token from a user
 * @param req - The request object
 * @param res - The response object
 * @returns - The promise send to the client.
 */
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    // * Check if the user exists
    const user = yield User_1.default.findOne({ username: username });
    if (!user)
        return res.status(404).json("Username or Password is wrong");
    // * Check if the password is right
    const correctPassword = user.password === password;
    if (!correctPassword)
        return res.status(403).json("Invalid Password");
    // * Add a token of 1 hour session & put the userId in the payload
    const token = jsonwebtoken_1.default.sign({ _id: user._id }, config_1.SECRET_TOKEN, {
        expiresIn: 60 * 60 * 2, // 1 hour
    });
    return res.status(200).json(token);
});
exports.signin = signin;
/**
 * API endpoint to get a user from a token
 * @param res - The request object
 * @param req - The response object
 * @returns - The promise send to the client
 */
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // * Must be verified with a token before
    const id = req.userId;
    // * Check if the user exists
    const user = yield User_1.default.findById(id);
    if (!user)
        return res.status(404).json("user doesn't exist!");
    return res.status(200).json(user);
});
exports.getUser = getUser;
/**
 * API endpoint to get all patients
 * @param req - The request object
 * @param res - The response object
 * @returns - The promise send to the client
 */
const getPatients = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // * Check if the patients exists
    const patients = yield User_1.default.find({ role: "patient" });
    if (!patients)
        return res.status(404).json("patient doesn't exist!");
    return res.status(200).json(patients);
});
exports.getPatients = getPatients;
//# sourceMappingURL=users.controller.js.map