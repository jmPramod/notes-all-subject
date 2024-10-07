import express from "express";
import cors from "cors";
import morgan from "morgan";
import { ErrorHandelingMiddlewear } from "./middlewear/global.middlewear";
import swaggerUI from "swagger-ui-express";
import * as swaggerDocument from "../src/config/swagger.json";
import { authRoute } from "./routes/auth.routes";
import { connectMongooseDB } from "./config/db.connect";
import dotenv from "dotenv";
import { notesRoute } from "./routes/notes.route";
dotenv.config();

const app = express();
const runServer = async () => {
  //!middlewear

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan("dev"));
  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
  app.use(cors({ origin: "*", credentials: true }));
  app.use("/", authRoute);
  app.use("/", notesRoute);
  app.use(ErrorHandelingMiddlewear);
  connectMongooseDB();
};

export { runServer, app };
