import { Request, Response } from "express";
import ApiResponse from "../utils/ApiResponse.js";
import {
  createFolderService,
  createFileService,
  editItemService,
  deleteItemService,
  getFolderItemsService,
  getFolderPathService,
} from "../services/drive.service.js";
import ApiError from "../utils/ApiError.js";

export const createFolderController = async (req: Request, res: Response) => {
  const {
    name = "Untitled Folder",
    color = "#fff",
    tags = [],
    parentId,
  } = req.body;

  const folderData = {
    name,
    color,
    tags,
    parentId,
  };

  const folder = await createFolderService(folderData);

  return new ApiResponse()
    .setMessage("Folder created successfully")
    .setData(folder)
    .send(res, 201);
};

export const createFileController = async (req: Request, res: Response) => {
  const { name, tags = [], parentId } = req.body;

  const fileData = {
    name,
    tags,
    parentId,
  };

  const file = await createFileService(fileData);

  return new ApiResponse()
    .setMessage("File created successfully")
    .setData(file)
    .send(res, 201);
};

export const editItemController = async (req: Request, res: Response) => {
  const { name, tags = [] } = req.body;
  const { itemId } = req.params;

  if (!itemId) {
    throw new ApiError("Item ID is required", 400);
  }

  const item = await editItemService({
    itemId,
    name,
    tags,
  });

  return new ApiResponse()
    .setMessage("Item edited successfully")
    .setData(item)
    .send(res, 200);
};

export const deleteItemController = async (req: Request, res: Response) => {
  const { itemId } = req.params;

  if (!itemId) {
    throw new ApiError("Item ID is required", 400);
  }

  const { deleteCount, deletedItem } = await deleteItemService(itemId);

  return new ApiResponse()
    .setMessage("Item deleted successfully")
    .setData({ deleteCount, deletedItem })
    .send(res, 200);
};

export const getFolderItemsController = async (req: Request, res: Response) => {
  const { folderId } = req.params;

  const items = await getFolderItemsService(folderId);
  return new ApiResponse()
    .setMessage("Items fetched successfully")
    .setData(items)
    .send(res, 200);
};

export const getFolderPathController = async (req: Request, res: Response) => {
  const { folderId } = req.params;

  const items = await getFolderPathService(folderId);
  return new ApiResponse()
    .setMessage("Folder path fetched successfully")
    .setData(items)
    .send(res, 200);
};

/* 
    create item
    edit item
    delete item
    get all items
    get item
    get currentFolderItems
*/
