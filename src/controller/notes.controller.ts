import express, { NextFunction, Request, Response } from "express";

import Notes from "../models/notes.schema"; // , { notesValidationSchema }
import createError from "../middlewear/error.middlewear";
const createNotes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const count = await Notes.countDocuments();
    req.body.questionNumber = count + 1;
    let data = new Notes(req.body);
    const result = await data.save();

    res.status(200).json({
      message: "Question and  Ans  logged in successfully.",
      data: result,
      status: 200,
    });
  } catch (error) {
    next(error);
  }
};
const getNotes = async (req: Request, res: Response, next: NextFunction) => {
  try {
  } catch (error) {
    next(error);
  }
};

const editNotes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("req.params._id", req.params.id);

    const result = await Notes.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      message: "Question and  Ans  Updated  successfully.",
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
export { createNotes, getNotes, editNotes, deleteNotes };
