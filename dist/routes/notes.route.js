"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notesRoute = void 0;
const express_1 = __importDefault(require("express"));
const verify_token_middlewear_1 = require("../middlewear/verify.token.middlewear");
const notes_controller_1 = require("../controller/notes.controller");
exports.notesRoute = express_1.default.Router();
exports.notesRoute.post("/create-notes", verify_token_middlewear_1.verifyUser, notes_controller_1.createNotes);
exports.notesRoute.get("/get-notes/:sub", verify_token_middlewear_1.verifyUser, notes_controller_1.getNotes);
exports.notesRoute.get("/get-single-notes/:id", verify_token_middlewear_1.verifyUser, notes_controller_1.getSingleNotes);
exports.notesRoute.patch("/update-notes/:id", verify_token_middlewear_1.verifyUser, notes_controller_1.editNotes);
exports.notesRoute.delete("/delete-notes/:id", verify_token_middlewear_1.verifyUser, notes_controller_1.deleteNotes);
exports.notesRoute.get("/get-subject", verify_token_middlewear_1.verifyUser, notes_controller_1.getDistintSubject);
exports.notesRoute.get("/omg", notes_controller_1.updateDocuments);
