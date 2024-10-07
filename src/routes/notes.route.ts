import express, { NextFunction, Request, Response } from "express";

import { verifyUser } from "../middlewear/verify.token.middlewear";
import {
  createNotes,
  getNotes,
  editNotes,
  deleteNotes,
} from "../controller/notes.controller";

export const notesRoute = express.Router();

notesRoute.post("/create-notes", verifyUser, createNotes);

notesRoute.get("/get-notes", verifyUser, getNotes);

notesRoute.patch("/update-notes/:id", verifyUser, editNotes);

notesRoute.delete("/delete-notes/:id", verifyUser, deleteNotes);
