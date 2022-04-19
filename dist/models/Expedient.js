"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_autopopulate_1 = __importDefault(require("mongoose-autopopulate"));
/**
 * Expedient schema
 * @param patient - type: IUser, required: true
 * @param records - type: Array<object>, required: true.plugin(mongooseDeepPopulate);
 * @param files - type: Array<object>, required: true
 */
const ExpedientSchema = new mongoose_1.Schema({
    patient: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        autopopulate: true,
    },
    records: [
        {
            record: String,
            date: mongoose_1.Schema.Types.Date,
        },
    ],
    files: [
        {
            name: String,
            extension: String,
            url: String,
            public_id: String,
        },
    ],
    requestAccess: {
        type: String,
        enum: ["pending", "accepted", "default"],
        default: "default",
    }
}).plugin(mongoose_autopopulate_1.default);
exports.default = (0, mongoose_1.model)("Expedient", ExpedientSchema);
//# sourceMappingURL=Expedient.js.map