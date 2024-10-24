"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSingleNotes = exports.getDistintSubject = exports.deleteNotes = exports.editNotes = exports.getNotes = exports.createNotes = void 0;
exports.updateDocuments = updateDocuments;
const notes_schema_1 = __importDefault(require("../models/notes.schema"));
const error_middlewear_1 = __importDefault(require("../middlewear/error.middlewear"));
const createNotes = async (req, res, next) => {
    try {
        const count = await notes_schema_1.default.find({
            subject: req.body.subject,
        }).countDocuments();
        req.body.serialNumber = {
            subject: req.body.subject,
            SlNumber: 0,
        };
        if (count) {
            req.body.questionNumber = count + 1;
            req.body.serialNumber.SlNumber = count + 1;
        }
        else {
            req.body.questionNumber = 1;
            req.body.serialNumber.SlNumber = 1;
        }
        let data = new notes_schema_1.default(req.body);
        const result = await data.save();
        res.status(200).json({
            message: `${req.body.subject} Question was successfully created`,
            data: result,
            status: 200,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.createNotes = createNotes;
const getNotes = async (req, res, next) => {
    const subject = req.params.sub;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    try {
        const items2 = await notes_schema_1.default.find();
        const items = await notes_schema_1.default.find({ subject })
            .sort({ "serialNumber.SlNumber": 1 })
            .skip((page - 1) * limit)
            .limit(limit);
        const totalItems = await notes_schema_1.default.countDocuments({ subject });
        const totalPages = Math.ceil(totalItems / limit);
        const info = { page, totalPages, totalItems };
        res.status(200).json({
            message: `Data related to ${subject} fetched`,
            info,
            data: items,
            status: 200,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getNotes = getNotes;
const getSingleNotes = async (req, res, next) => {
    try {
        const result = await notes_schema_1.default.findById(req.params.id);
        if (!result) {
            return next((0, error_middlewear_1.default)(400, "Data is not present"));
        }
        res.status(200).json({
            message: "single data fetched",
            data: result,
            status: 200,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getSingleNotes = getSingleNotes;
const editNotes = async (req, res, next) => {
    try {
        const { serialNumber } = req.body;
        const noteId = req.params.id;
        const existingNote = await notes_schema_1.default.findById(noteId);
        const dataUpdated = await notes_schema_1.default.findByIdAndUpdate(noteId, req.body);
        if (!existingNote) {
            return res.status(404).json({ message: "Note not found", status: 404 });
        }
        const subject = existingNote.serialNumber.subject;
        const currentSlNumber = existingNote.serialNumber.SlNumber;
        if (currentSlNumber !== serialNumber.SlNumber) {
            if (serialNumber.SlNumber > currentSlNumber) {
                await notes_schema_1.default.updateMany({
                    "serialNumber.SlNumber": {
                        $gte: currentSlNumber + 1,
                        $lte: serialNumber.SlNumber,
                    },
                    "serialNumber.subject": subject,
                }, { $inc: { "serialNumber.SlNumber": -1 } });
            }
            else {
                await notes_schema_1.default.updateMany({
                    "serialNumber.SlNumber": {
                        $gte: serialNumber.SlNumber,
                        $lt: currentSlNumber,
                    },
                    "serialNumber.subject": subject,
                }, { $inc: { "serialNumber.SlNumber": 1 } });
            }
        }
        existingNote.serialNumber.SlNumber = serialNumber.SlNumber;
        const updatedNote = await existingNote.save();
        res.status(200).json({
            message: "Single data edited successfully",
            data: updatedNote,
            status: 200,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.editNotes = editNotes;
const deleteNotes = async (req, res, next) => {
    try {
        const noteToDelete = await notes_schema_1.default.findById(req.params.id);
        const result = await notes_schema_1.default.findByIdAndDelete({ _id: req.params.id });
        if (!result) {
            return next((0, error_middlewear_1.default)(400, "Data is not present"));
        }
        let slNumberToDelete = null;
        if (noteToDelete) {
            slNumberToDelete = noteToDelete.serialNumber.SlNumber;
        }
        if (slNumberToDelete) {
            await notes_schema_1.default.updateMany({ "serialNumber.SlNumber": { $gt: slNumberToDelete } }, { $inc: { "serialNumber.SlNumber": -1 } });
        }
        res.status(200).json({
            message: "Question and  Ans  deleted  successfully.",
            data: result,
            status: 200,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteNotes = deleteNotes;
const getDistintSubject = async (req, res, next) => {
    try {
        const result = await notes_schema_1.default.distinct("subject");
        if (!result) {
            return next((0, error_middlewear_1.default)(400, "no subject avalable"));
        }
        res.status(200).json({
            message: "Distint subject fetched",
            data: result,
            status: 200,
        });
    }
    catch (error) { }
};
exports.getDistintSubject = getDistintSubject;
async function updateDocuments() {
    try {
    }
    catch (error) {
        console.error("Error updating documents:", error);
    }
}
