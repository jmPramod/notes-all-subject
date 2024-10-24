"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = require("./app");
dotenv_1.default.config();
const Port = process.env.PORT;
(0, app_1.runServer)();
app_1.app.listen(Port, () => {
    console.log(`server is running http://localhost:${Port} `);
});