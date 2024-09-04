import express, { NextFunction, Request, Response } from "express";
import routes from "./api/routes";
import { prisma } from "./db/config";
import { logger } from "../src/logger";
import bodyParser from "body-parser";
import { ErrorHandler, handleError } from "./api/middleware/error.middleware";

const app = express();

app.use(bodyParser.json());
app.use("/api", routes);
app.use(
  (err: ErrorHandler, _req: Request, res: Response, _next: NextFunction) => {
    handleError(err, res);
  }
);

const checkDatabaseConnection = async () => {
  try {
    await prisma.$connect();
    logger.debug("Connection has been established successfully.");
  } catch (error) {
    logger.error("Unable to connect to the database!");
  }
};

checkDatabaseConnection();

export default app;
