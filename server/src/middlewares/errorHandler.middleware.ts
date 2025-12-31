import ApiError from "../utils/ApiError.js";
import { NextFunction, Request, Response } from "express";
import dbErrorHandler from "../utils/dbErrorHandler.js";

const errorHandler = (
  error: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.log("Error: ", error);

  let apiError: ApiError;

  if (error instanceof ApiError) {
    apiError = error;
  } else {
    apiError = dbErrorHandler(error);
  }

  return res.status(apiError.status).json(apiError.payload);
};

export default errorHandler;
