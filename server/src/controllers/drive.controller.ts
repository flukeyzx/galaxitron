import { Request, Response } from "express";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { createFolderService } from "../services/drive.service.js";

export const getDriveController = (req: Request, res: Response) => {
  try {
    return new ApiResponse()
      .setMessage("Drive fetched successfully")
      .send(res, 200);
  } catch (error) {
    console.error(error);
    throw new ApiError("Internal Server Error.", 500);
  }
};

export const createFolderController = async (req: Request, res: Response) => {
  const {
    name = "Untitled Folder",
    color = "#fff",
    tags = [],
    parentId,
  } = req.body;

  try {
    const folderData = {
      name,
      color,
      tags,
      parentId,
      type: "FOLDER",
    };

    const folder = await createFolderService(folderData);

    return new ApiResponse()
      .setMessage("Folder created successfully")
      .setData(folder)
      .send(res, 200);
  } catch (error) {
    console.error(error);
    throw new ApiError("Internal Server Error.", 500);
  }
};

/* 
    create item
    edit item
    delete item
    get all items
    get item
    get currentFolderItems
*/
