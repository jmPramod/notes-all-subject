"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectMongooseDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connectMongooseDB = async () => {
    try {
        if (process.env.NODE_ENV === "DEV") {
            const dbData = await mongoose_1.default.connect(process.env.MONGO_LOCAL);
            console.log("MONGO Local DB connected👍!!!");
        }
        else {
            const dbData = await mongoose_1.default.connect(process.env.MONGO_CLOUD);
            console.log("MONGO Cloud DB connected 👍!!!");
        }
    }
    catch (err) {
        console.log("Error in DB😒", err);
    }
};
exports.connectMongooseDB = connectMongooseDB;
