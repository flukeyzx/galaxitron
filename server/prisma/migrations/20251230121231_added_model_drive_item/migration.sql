-- CreateEnum
CREATE TYPE "DriveItemType" AS ENUM ('FOLDER', 'FILE');

-- CreateTable
CREATE TABLE "DriveItem" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "DriveItemType" NOT NULL,
    "color" TEXT,
    "tags" TEXT[],
    "size" BIGINT,
    "itemCount" INTEGER,
    "parentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DriveItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DriveItem" ADD CONSTRAINT "DriveItem_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "DriveItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;
