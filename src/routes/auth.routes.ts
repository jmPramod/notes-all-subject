import express, { NextFunction, Request, Response } from "express";

import { register, login } from "../controller/auth.controller";
import { verifyUser } from "../middlewear/verify.token.middlewear";

export const authRoute = express.Router();

authRoute.post("/login", login);

authRoute.get("/", (req, res) => {
  res.send("API working");
});

authRoute.post("/register", register);
