import express, { NextFunction, Request, Response } from "express";
import { registerValidation } from "../validations/auth.validation";
import createError from "../middlewear/error.middlewear";
import { ValidationError } from "joi";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Auth, { RegisterSchemaValidation } from "../models/auth.schema";
import dotenv from "dotenv";
dotenv.config();
const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const emailExist = await Auth.findOne({
      email: req.body.email,
    });

    if (emailExist) {
      return next(createError(401, "User Exist."));
    }
    const phoneExist = await Auth.findOne({
      email: req.body.phone,
    });
    if (phoneExist) {
      return next(createError(401, "This phone number already exist."));
    }

    const { error, value } = RegisterSchemaValidation.validate(req.body);

    if (error) {
      return next(createError(401, error.details[0].message));
    }
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    value.password = hashPassword;

    const newBank = new Auth(value);
    const savedUser = await newBank.save();
    res.json({
      Success: true,
      status: 201,
      message: "New User created",
      data: savedUser,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    console.log("req.body", req.body);

    //validation
    const userExist = await Auth.findOne({ email: email });
    if (!userExist) {
      return next(createError(404, "Invalid User."));
    }
    const isPassword = await bcrypt.compare(password, userExist.password);
    if (!isPassword) {
      return next(createError(404, "Invalid Password."));
    }
    // JWT token generation
    const token = jwt.sign(
      { email: userExist.email, id: userExist._id },
      process.env.SECRET_KEY as string
    );
    res.cookie("Bearer", token, {
      httpOnly: true,
      sameSite: "strict",
      path: "/",
      secure: true,
    });
    res.status(200).json({
      message: "User logged in successfully.",
      data: userExist,
      token: token,
      Success: true,
      status: 200,
    });
  } catch (err) {
    next(err);
  }
};
export { register, login };
