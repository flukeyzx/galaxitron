import ApiError from "../utils/ApiError.js";
import { prisma } from "../config/prisma.config.js";

export const createFolderService = async (data: {
  name: string;
  color: string;
  tags: string[];
  parentId: string;
}) => {
  try {
    const driveItem = await prisma.driveItem.create({
      data: {
        name: data.name,
        color: data.color,
        tags: data.tags,
        parentId: data.parentId,
        type: "FOLDER",
      },
    });

    return driveItem;
  } catch (error: any) {
    console.error("Error in createFolderService: ", error.message);
    throw new ApiError("Internal Server Error.", 500);
  }
};
