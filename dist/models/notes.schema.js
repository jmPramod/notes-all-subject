"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const joi_1 = __importDefault(require("joi"));
const notesSchema = new mongoose_1.Schema({
    subject: { type: String },
    question: { type: String },
    answer: { ans: { type: [String] }, format: { type: String } },
    ansQuery: { ans: { type: [String] }, format: { type: String } },
    favorite: { type: Boolean, default: false },
    table: { heading: { type: [String] }, body: { type: [[String]] } },
    serialNumber: {
        subject: { type: String },
        SlNumber: { type: Number, default: 0 },
    },
    links: { type: [String] },
    important: {
        type: String,
        enum: ["red", "yellow", "gray", "white"],
        default: "white",
    },
    screenshort: [
        {
            Url: { type: String },
            PublicId: { type: String, default: null },
        },
    ],
    programingLanguage: [
        {
            language: { type: String, default: "" },
            code: { type: String, default: "" },
            result: { type: String, default: "" },
            title: { type: String, default: "" },
        },
    ],
    LibOrFramework: [
        {
            language: { type: String, default: "" },
            code: { type: String, default: "" },
            result: { type: String, default: "" },
            title: { type: String, default: "" },
        },
    ],
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model("notes", notesSchema);
const notesValidationSchema = joi_1.default.object({
    subject: joi_1.default.string().required(),
    question: joi_1.default.string().allow("").optional(),
    answer: joi_1.default.object({
        ans: joi_1.default.array().items(joi_1.default.string()).required(),
        format: joi_1.default.string().optional(),
    }).required(),
    ansQuery: joi_1.default.array().items(joi_1.default.string()).optional(),
    favorite: joi_1.default.boolean().default(false),
    serialNumber: joi_1.default.number().required(),
    links: joi_1.default.array().items(joi_1.default.string()).optional(),
    important: joi_1.default.string()
        .valid("red", "yellow", "gray", "white")
        .default("white"),
    screenshort: joi_1.default.array()
        .items(joi_1.default.object({
        Url: joi_1.default.string().required(),
        PublicId: joi_1.default.string().allow(null).optional(),
    }))
        .optional(),
});
