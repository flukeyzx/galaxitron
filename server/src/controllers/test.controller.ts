import { Request, Response } from "express";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

export const testController = async (req: Request, res: Response) => {
  try {
    throw new ApiError("This username is already registered.", 400);

    return new ApiResponse()
      .setData([{ id: 1, name: "Abdul Ahad" }])
      .setMessage("Data fetched successfully.")
      .send(res, 200);
  } catch (error: any) {
    console.log("Error in testController.", error.message);
    return res.status(500).json({ message: error.message });
  }
};

/*
  next tasks:
  1. Create Drive API's
  2. Create Auth API's
*/
