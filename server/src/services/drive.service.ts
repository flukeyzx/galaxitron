import { prisma } from "../config/prisma.config.js";
import ApiError from "../utils/ApiError.js";

interface CreateFolderData {
  name: string;
  color: string;
  tags: string[];
  parentId?: string;
}

interface CreateFileData {
  name: string;
  tags: string[];
  parentId?: string;
}

interface EditItemData {
  itemId: string;
  name?: string;
  tags?: string[];
}

export const createFolderService = async ({
  name,
  color,
  tags,
  parentId,
}: CreateFolderData) => {
  if (parentId) {
    const parent = await prisma.driveItem.findUnique({
      where: {
        id: parentId,
      },
    });

    if (!parent) {
      throw new ApiError("Parent Folder not found", 404);
    }
  }

  return prisma.driveItem.create({
    data: {
      name,
      color,
      tags,
      parentId,
      type: "FOLDER",
    },
  });
};

export const createFileService = async ({
  name,
  tags,
  parentId,
}: CreateFileData) => {
  if (parentId) {
    const parent = await prisma.driveItem.findUnique({
      where: {
        id: parentId,
      },
    });

    if (!parent) {
      throw new ApiError("Parent Folder not found", 404);
    }
  }

  return prisma.driveItem.create({
    data: {
      name,
      tags,
      parentId,
      type: "FILE",
    },
  });
};

export const editItemService = async ({ itemId, name, tags }: EditItemData) => {
  const item = await prisma.driveItem.findUnique({
    where: {
      id: itemId,
    },
  });

  if (!item) {
    throw new ApiError("Item not found", 404);
  }

  return prisma.driveItem.update({
    where: {
      id: itemId,
    },
    data: {
      name: name || item.name,
      tags,
    },
  });
};

export const deleteItemService = async (itemId: string) => {
  const item = await prisma.driveItem.findUnique({
    where: {
      id: itemId,
    },
  });

  if (!item) {
    throw new ApiError("Item not found", 404);
  }

  return await prisma.$transaction(async (tx) => {
    const deletedChildren = await tx.driveItem.deleteMany({
      where: {
        parentId: itemId,
      },
    });
    const deletedItem = await tx.driveItem.delete({
      where: {
        id: itemId,
      },
    });
    return { deleteCount: deletedChildren.count, deletedItem };
  });
};

export const getFolderItemsService = async (folderId: string | null) => {
  const where =
    folderId === "null" ? { parentId: null } : { parentId: folderId };

  const items = await prisma.driveItem.findMany({ where });

  return items;
};

interface FolderType {
  id: string | null;
  name: string;
  parentId: string | null;
}

export const getFolderPathService = async (folderId: string) => {
  const path = [];

  let curr: string | null = folderId === "null" ? null : folderId;

  while (curr) {
    const folder = (await prisma.driveItem.findUnique({
      where: {
        id: curr,
      },
      select: {
        id: true,
        name: true,
        parentId: true,
      },
    })) as FolderType;

    if (!folder) break;

    path.push(folder);
    curr = folder.parentId;
  }

  return [{ id: null, name: "My Drive", parentId: null }, ...path.reverse()];
};
