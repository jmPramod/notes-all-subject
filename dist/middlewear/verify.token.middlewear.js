"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const error_middlewear_1 = __importDefault(require("./error.middlewear"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const verifyToken = (req, res, next) => {
    const authorizationHeader = req.header("Authorization");
    if (!authorizationHeader)
        return next((0, error_middlewear_1.default)(401, "Access denied.Token not provided."));
    const tokenArray = authorizationHeader.split(" ");
    if (tokenArray.length !== 2 || tokenArray[0] !== "Bearer") {
        return next((0, error_middlewear_1.default)(401, "Invalid authorization header format."));
    }
    const token = tokenArray[1];
    if (!token)
        return next((0, error_middlewear_1.default)(401, "Access denied. No token provided."));
    try {
        req.token = token;
        jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY, (err, user) => {
            if (err) {
                return next((0, error_middlewear_1.default)(401, "Token is not Valid"));
            }
            req.user_info = user;
            next();
        });
    }
    catch (err) {
        return next((0, error_middlewear_1.default)(401, "Token Error!"));
    }
};
const verifyUser = (req, res, next) => {
    verifyToken(req, res, (err) => {
        if (err) {
            return next(err);
        }
        if (req.user_info) {
            next();
        }
        else {
            return next((0, error_middlewear_1.default)(403, "You are not authorized !"));
        }
    });
};
exports.verifyUser = verifyUser;
