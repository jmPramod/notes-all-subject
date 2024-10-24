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
exports.RegisterSchemaValidation = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const joi_1 = __importDefault(require("joi"));
const authSchema = new mongoose_1.Schema({
    firstName: { type: String },
    lastName: { type: String },
    phone: { type: Number },
    address: { type: String },
    state: { type: String },
    country: { type: String },
    pinCode: { type: Number },
    email: { type: String },
    password: { type: String },
    isAdmin: { type: String, enum: ["admin", "user"], default: "user" },
    profileImage: { type: String, default: "" },
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model("users", authSchema);
exports.RegisterSchemaValidation = joi_1.default.object({
    firstName: joi_1.default.string().required().messages({
        "any.required": "First name is required.",
        "string.empty": "First name cannot be empty.",
    }),
    lastName: joi_1.default.string().allow(null, "").optional(),
    phone: joi_1.default.number().required().messages({
        "any.required": "Phone number is required.",
        "number.base": "Phone number must be a number.",
        "number.empty": "Phone number cannot be empty.",
    }),
    address: joi_1.default.string().allow(null, "").optional(),
    state: joi_1.default.string().allow(null, "").optional(),
    country: joi_1.default.string().required().messages({
        "any.required": "Country is required.",
        "string.empty": "Country cannot be empty.",
    }),
    pinCode: joi_1.default.number().required().messages({
        "any.required": "Pin code is required.",
        "number.base": "Pin code must be a number.",
        "number.empty": "Pin code cannot be empty.",
    }),
    email: joi_1.default.string().email().required().messages({
        "any.required": "Email is required.",
        "string.empty": "Email cannot be empty.",
        "string.email": "Email must be a valid email address.",
    }),
    password: joi_1.default.string().required().messages({
        "any.required": "Password is required.",
        "string.empty": "Password cannot be empty.",
    }),
    isAdmin: joi_1.default.string().valid("admin", "user").default("user"),
    profileImage: joi_1.default.string().default(""),
});
const forgotPasswordSchemaValidation = joi_1.default.object({
    firstName: joi_1.default.string().required().messages({
        "any.required": "First name is required.",
        "string.empty": "First name cannot be empty.",
    }),
    lastName: joi_1.default.string().allow(null, "").optional(),
    accounts: joi_1.default.array().items(joi_1.default.object()),
    phone: joi_1.default.number().required().messages({
        "any.required": "Phone number is required.",
        "number.base": "Phone number must be a number.",
        "number.empty": "Phone number cannot be empty.",
    }),
    address: joi_1.default.string().allow(null, "").optional(),
    state: joi_1.default.string().allow(null, "").optional(),
    country: joi_1.default.string().required().messages({
        "any.required": "Country is required.",
        "string.empty": "Country cannot be empty.",
    }),
    pinCode: joi_1.default.number().required().messages({
        "any.required": "Pin code is required.",
        "number.base": "Pin code must be a number.",
        "number.empty": "Pin code cannot be empty.",
    }),
    email: joi_1.default.string().email().required().messages({
        "any.required": "Email is required.",
        "string.empty": "Email cannot be empty.",
        "string.email": "Email must be a valid email address.",
    }),
    password: joi_1.default.string().required().messages({
        "any.required": "Password is required.",
        "string.empty": "Password cannot be empty.",
    }),
    isAdmin: joi_1.default.string().valid("admin", "user").default("user"),
});
