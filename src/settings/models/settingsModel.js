"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var ObjectId = mongoose_1.default.Types.ObjectId;
var settingsSchema = new mongoose_1.default.Schema({
    server: {
        type: String,
        required: true,
        unique: true
    },
    prefix: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    channel: {
        type: String,
        required: true
    },
    role: {
        type: String
    },
});
var settingsModel = mongoose_1.default.model('serverSettings', settingsSchema);
exports.default = settingsModel;
