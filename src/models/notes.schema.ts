import mongoose, { Schema, Document } from "mongoose";
import Joi, { boolean } from "joi";
export interface Notes extends Document {
  subject: string;
  question: string;
  answer: { ans: string[]; format: string };
  ansQuery: string[];
  favorite: boolean;
  screenshort: { Url: string; PublicId: string | null }[];
  questionNumber: number;
  links: string[];
  important: string;

  table: { heading: string[]; body: string[][] };
}

const notesSchema: Schema = new Schema(
  {
    subject: { type: String },
    question: { type: String },
    answer: { ans: { type: [String] }, format: { type: String } },
    ansQuery: { ans: { type: [String] }, format: { type: String } },
    favorite: { type: Boolean, default: false },
    table: { heading: { type: [String] }, body: { type: [[String]] } },
    questionNumber: { type: Number },
    links: { type: [String] },
    important: {
      type: String,
      enum: ["red", "yellow", "gray", "white"],
      default: "white",
    },
    screenshort: [
      {
        Url: { type: String },
        PublicId: { type: String, default: null },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<Notes>("notes", notesSchema);

const notesValidationSchema = Joi.object({
  subject: Joi.string().required(),
  question: Joi.string().allow("").optional(),
  answer: Joi.object({
    ans: Joi.array().items(Joi.string()).required(),
    format: Joi.string().optional(),
  }).required(),
  ansQuery: Joi.array().items(Joi.string()).optional(),
  favorite: Joi.boolean().default(false),
  questionNumber: Joi.number().required(),
  links: Joi.array().items(Joi.string()).optional(),
  important: Joi.string()
    .valid("red", "yellow", "gray", "white")
    .default("white"),
  screenshort: Joi.array()
    .items(
      Joi.object({
        Url: Joi.string().required(),
        PublicId: Joi.string().allow(null).optional(),
      })
    )
    .optional(),
});
