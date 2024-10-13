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

    const totalItems = await Notes.countDocuments();
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
    const result = await Notes.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
      message: "single data Edited succefully",
      data: result,
      status: 200,
    });
  } catch (error) {
    next(error);
  }
};
const deleteNotes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await Notes.findByIdAndDelete({ _id: req.params.id });
    if (!result) {
      return next(createError(400, "Data is not present"));
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

// async function updateDocuments() {
//   try {
//     const documents = await Notes.find(); // Fetch all documents
//     let serial = 1; // Start from 1
//     for (const doc of documents) {
//       // Update the document with the incrementing number
//       doc.serialNumber = {
//         subject: "REACT",
//         SlNumber: serial, // Assign the incrementing number
//       };
//       await doc.save(); // Save each document
//       serial++; // Increment for the next document
//     }
//     console.log(`${documents.length} documents updated successfully!`);
//   } catch (error) {
//     console.error("Error updating documents:", error);
//   }
// }
async function updateDocuments() {
  try {
    // const defaultProgrammingLanguage = [{ language: "", code: "" }];
    // const result = await Notes.updateMany(
    //   { programingLanguage: { $exists: true } }, // Only update documents without the field
    //   { $set: { programingLanguage: defaultProgrammingLanguage } }
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
