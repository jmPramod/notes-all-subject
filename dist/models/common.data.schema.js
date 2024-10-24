"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const commonDataSchema = new mongoose_1.Schema({
    subjects: {},
    sequal: {},
    nonSequal: {},
}, {
    timestamps: true,
});
