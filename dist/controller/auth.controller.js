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
exports.login = exports.register = void 0;
const error_middlewear_1 = __importDefault(require("../middlewear/error.middlewear"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_schema_1 = __importStar(require("../models/auth.schema"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const register = async (req, res, next) => {
    try {
        const emailExist = await auth_schema_1.default.findOne({
            email: req.body.email,
        });
        if (emailExist) {
            return next((0, error_middlewear_1.default)(401, "User Exist."));
        }
        const phoneExist = await auth_schema_1.default.findOne({
            email: req.body.phone,
        });
        if (phoneExist) {
            return next((0, error_middlewear_1.default)(401, "This phone number already exist."));
        }
        const { error, value } = auth_schema_1.RegisterSchemaValidation.validate(req.body);
        if (error) {
            return next((0, error_middlewear_1.default)(401, error.details[0].message));
        }
        const hashPassword = await bcryptjs_1.default.hash(req.body.password, 10);
        value.password = hashPassword;
        const newBank = new auth_schema_1.default(value);
        const savedUser = await newBank.save();
        res.json({
            Success: true,
            status: 201,
            message: "New User created",
            data: savedUser,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.register = register;
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const userExist = await auth_schema_1.default.findOne({ email: email });
        if (!userExist) {
            return next((0, error_middlewear_1.default)(404, "Invalid User."));
        }
        const isPassword = await bcryptjs_1.default.compare(password, userExist.password);
        if (!isPassword) {
            return next((0, error_middlewear_1.default)(404, "Invalid Password."));
        }
        const token = jsonwebtoken_1.default.sign({ email: userExist.email, id: userExist._id }, process.env.SECRET_KEY);
        res.cookie("Bearer", token, {
            httpOnly: true,
            sameSite: "strict",
            path: "/",
            secure: true,
        });
        res.status(200).json({
            message: "User logged in successfully.",
            data: userExist,
            token: token,
            Success: true,
            status: 200,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.login = login;
