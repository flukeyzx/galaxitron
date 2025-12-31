import { Router } from "express";
import asyncHandler from "../utils/asyncHandler.js";
import {
  createFileController,
  createFolderController,
  deleteItemController,
  getFolderItemsController,
  getFolderPathController,
} from "../controllers/drive.controller.js";

const router = Router();

router.get("/:folderId", asyncHandler(getFolderItemsController));
router.get("/path/:folderId", asyncHandler(getFolderPathController));
router.post("/folder", asyncHandler(createFolderController));
router.post("/file", asyncHandler(createFileController));
router.delete("/:itemId", asyncHandler(deleteItemController));

export default router;
