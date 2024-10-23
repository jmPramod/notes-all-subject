import mongoose, { Schema, Document } from "mongoose";

export interface CommonData extends Document {}

const commonDataSchema: Schema = new Schema(
  {
    subjects: {},
    sequal: {},
    nonSequal: {},
  },
  {
    timestamps: true,
  }
);
