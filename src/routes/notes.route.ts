import express, { NextFunction, Request, Response } from "express";

import { verifyUser } from "../middlewear/verify.token.middlewear";
import {
  createNotes,
  getNotes,
  editNotes,
  deleteNotes,
  getDistintSubject,
  updateDocuments,
} from "../controller/notes.controller";

export const notesRoute = express.Router();

notesRoute.post("/create-notes", verifyUser, createNotes);

notesRoute.get("/get-notes/:sub", verifyUser, getNotes);

notesRoute.patch("/update-notes/:id", verifyUser, editNotes);

notesRoute.delete("/delete-notes/:id", verifyUser, deleteNotes);

notesRoute.get("/get-subject", verifyUser, getDistintSubject);
notesRoute.get("/omg", updateDocuments);
