import { Prisma } from "../generated/prisma/client.js";
import ApiError from "./ApiError.js";

const dbErrorHandler = (error: any): ApiError => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002":
        return new ApiError("Record already exists.", 400, {
          field: error.meta?.target,
        });
      case "P2025":
        return new ApiError("Record not found.", 404);
      default:
        return new ApiError("Database error", 400);
    }
  }
  if (error instanceof Prisma.PrismaClientUnknownRequestError) {
    return new ApiError("Unkown database error.", 500);
  }
  if (error instanceof Prisma.PrismaClientValidationError) {
    return new ApiError("Validation Failed", 400);
  }
  return new ApiError(error.message || "Internal Server Error.", 500);
};

export default dbErrorHandler;
