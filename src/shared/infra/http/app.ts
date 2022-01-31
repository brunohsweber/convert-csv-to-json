import "reflect-metadata";
import cors from "cors";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import dotenv from "dotenv";
import methodOverride from "method-override";
import path from "path/posix";
import swaggerUi from "swagger-ui-express";

import { AppError } from "@shared/errors/AppError";

import swaggerFile from "../../../swagger.json";
import { router } from "./routes";

dotenv.config({
  path: process.env.NODE_ENV === "test" ? ".env.testing" : ".env"
});

const app = express();

const pathPublic = path.join(__dirname, "../../../temp");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(pathPublic));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(router);

app.use(methodOverride("_method"));

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message
      });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`
    });
  }
);

export { app, pathPublic };
