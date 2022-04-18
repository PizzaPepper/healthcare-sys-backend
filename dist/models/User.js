"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
/**
 * User schema
 * @param name - type: string, required: true, trim: true
 * @param fsurname - type: string, required: true, trim: true
 * @param lsurname - type: string, required: true, trim: true
 * @param age - type: number, required: true
 * @param username - type: string, required: true, trim: true, unique: true
 * @param password - type: string, required: true, trim: true
 * @param expedient - type: string, required: true, trim: true
 * @param role - type: string, required: true, trim: true
 **/
const UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    fsurname: {
        type: String,
        required: true,
        trim: true,
    },
    lsurname: {
        type: String,
        required: true,
        trim: true,
    },
    age: {
        type: Number,
        required: true,
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    expedient: {
        type: String,
        required: true,
        trim: true,
    },
    role: {
        type: String,
        required: true,
        trim: true,
    },
});
exports.default = (0, mongoose_1.model)("User", UserSchema);
//# sourceMappingURL=User.js.map