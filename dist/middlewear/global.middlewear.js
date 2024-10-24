"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandelingMiddlewear = void 0;
const ErrorHandelingMiddlewear = (err, req, res, next) => {
    const status = err.status || 500;
    const errorMessage = err.message || "Something went wrong!!!!";
    return res.status(500).json({
        status: status,
        message: errorMessage,
        data: null,
        error: errorMessage,
        stacks: err.stack,
    });
};
exports.ErrorHandelingMiddlewear = ErrorHandelingMiddlewear;
