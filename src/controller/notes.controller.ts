import express, { NextFunction, Request, Response } from "express";

import Notes from "../models/notes.schema"; // , { notesValidationSchema }
import createError from "../middlewear/error.middlewear";
const createNotes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const count = await Notes.find({
      subject: req.body.subject,
    }).countDocuments();
    req.body.serialNumber = {
      subject: req.body.subject,

      SlNumber: 0,
    };
    if (count) {
      req.body.questionNumber = count + 1;
      req.body.serialNumber.SlNumber = count + 1;
    } else {
      req.body.questionNumber = 1;

      req.body.serialNumber.SlNumber = 1;
    }

    let data = new Notes(req.body);
    const result = await data.save();

    res.status(200).json({
      message: `${req.body.subject} Question was successfully created`,
      data: result,
      status: 200,
    });
  } catch (error) {
    next(error);
  }
};
const getNotes = async (req: Request, res: Response, next: NextFunction) => {
  const subject = req.params.sub;

  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  try {
    const items2 = await Notes.find();

    const items = await Notes.find({ subject })
      .sort({ "serialNumber.SlNumber": 1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const totalItems = await Notes.countDocuments({ subject });
    const totalPages = Math.ceil(totalItems / limit);
    const info = { page, totalPages, totalItems };
    // items.info = info;
    res.status(200).json({
      message: `Data related to ${subject} fetched`,
      info,
      data: items,
      status: 200,
    });
  } catch (error) {
    next(error);
  }
};
const getSingleNotes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await Notes.findById(req.params.id);
    if (!result) {
      return next(createError(400, "Data is not present"));
    }

    res.status(200).json({
      message: "single data fetched",
      data: result,
      status: 200,
    });
  } catch (error) {
    next(error);
  }
};
const editNotes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { serialNumber } = req.body;
    const noteId = req.params.id;
    const existingNote = await Notes.findById(noteId);
    const dataUpdated = await Notes.findByIdAndUpdate(noteId, req.body);
    if (!existingNote) {
      return res.status(404).json({ message: "Note not found", status: 404 });
    }

    const currentSlNumber = existingNote.serialNumber.SlNumber;

    if (currentSlNumber !== serialNumber.SlNumber) {
      // If moving from 10 to 12
      if (serialNumber.SlNumber > currentSlNumber) {
        await Notes.updateMany(
          {
            "serialNumber.SlNumber": {
              $gte: currentSlNumber + 1,
              $lte: serialNumber.SlNumber,
            },
          },
          { $inc: { "serialNumber.SlNumber": -1 } }
        );
      } else {
        // If moving from 12 to 10
        await Notes.updateMany(
          {
            "serialNumber.SlNumber": {
              $gte: serialNumber.SlNumber,
              $lt: currentSlNumber,
            },
          },
          { $inc: { "serialNumber.SlNumber": 1 } }
        );
      }
    }

    existingNote.serialNumber.SlNumber = serialNumber.SlNumber;
    const updatedNote = await existingNote.save();

    res.status(200).json({
      message: "Single data edited successfully",
      data: updatedNote,
      status: 200,
    });
  } catch (error) {
    next(error);
  }
};

const deleteNotes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const noteToDelete = await Notes.findById(req.params.id);

    // Get the SlNumber of the note to be deleted

    const result = await Notes.findByIdAndDelete({ _id: req.params.id });

    if (!result) {
      return next(createError(400, "Data is not present"));
    }
    let slNumberToDelete = null;
    if (noteToDelete) {
      slNumberToDelete = noteToDelete.serialNumber.SlNumber;
    }
    if (slNumberToDelete) {
      await Notes.updateMany(
        { "serialNumber.SlNumber": { $gt: slNumberToDelete } },
        { $inc: { "serialNumber.SlNumber": -1 } }
      );
    }
    res.status(200).json({
      message: "Question and  Ans  deleted  successfully.",
      data: result,
      status: 200,
    });
  } catch (error) {
    next(error);
  }
};
const getDistintSubject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await Notes.distinct("subject");
    if (!result) {
      return next(createError(400, "no subject avalable"));
    }
    res.status(200).json({
      message: "Distint subject fetched",
      data: result,
      status: 200,
    });
  } catch (error) {}
};
async function updateDocuments() {
  try {
    // const defaultProgrammingLanguage = [];
    // const result = await Notes.updateMany(
    //   { LibOrFramework: { $exists: true } }, // Only update documents without the field
    //   { $set: { LibOrFramework: [] } }
    // );
    // console.log(`${result.modifiedCount} documents updated successfully!`);
  } catch (error) {
    console.error("Error updating documents:", error);
  }
}

export {
  createNotes,
  getNotes,
  editNotes,
  deleteNotes,
  getDistintSubject,
  updateDocuments,
  getSingleNotes,
};
