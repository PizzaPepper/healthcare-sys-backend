"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
/**
 * Expedient schema
 * @param patient - type: IUser, required: true
 * @param records - type: Array<object>, required: true
 * @param files - type: Array<object>, required: true
 */
const ExpedientSchema = new mongoose_1.Schema({
    patient: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        autopopulate: true,
    },
    records: [{
            record: String,
            date: mongoose_1.Schema.Types.Date,
        }],
    files: [{
            name: String,
            extension: String,
            url: String,
        }]
});
exports.default = (0, mongoose_1.model)('Expedient', ExpedientSchema);
//# sourceMappingURL=Expedient.js.map