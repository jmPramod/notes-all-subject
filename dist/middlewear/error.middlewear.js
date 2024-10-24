"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createError = (status, message) => {
    const error = new Error(message);
    error.status = status;
    error.data = null;
    return error;
};
exports.default = createError;
