/*
  Warnings:

  - The primary key for the `Puzzle` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `Puzzle` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Puzzle` table. All the data in the column will be lost.
  - You are about to drop the column `listPublicly` on the `Puzzle` table. All the data in the column will be lost.
  - You are about to drop the column `path` on the `Puzzle` table. All the data in the column will be lost.
  - You are about to drop the column `puzzleName` on the `Puzzle` table. All the data in the column will be lost.
  - You are about to drop the column `successMessage` on the `Puzzle` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Puzzle` table. All the data in the column will be lost.
  - You are about to drop the `StepsOnPuzzles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_NftToPuzzle` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[id,puzzleId,stepSortWeight]` on the table `Step` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `rewardableId` to the `Puzzle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `puzzleId` to the `Step` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PuzzlesOnPacks" DROP CONSTRAINT "PuzzlesOnPacks_puzzleId_fkey";

-- DropForeignKey
ALTER TABLE "StepsOnPuzzles" DROP CONSTRAINT "StepsOnPuzzles_puzzleId_fkey";

-- DropForeignKey
ALTER TABLE "StepsOnPuzzles" DROP CONSTRAINT "StepsOnPuzzles_stepId_fkey";

-- DropForeignKey
ALTER TABLE "Submission" DROP CONSTRAINT "Submission_puzzleId_fkey";

-- DropForeignKey
ALTER TABLE "_NftToPuzzle" DROP CONSTRAINT "_NftToPuzzle_A_fkey";

-- DropForeignKey
ALTER TABLE "_NftToPuzzle" DROP CONSTRAINT "_NftToPuzzle_B_fkey";

-- AlterTable
ALTER TABLE "Puzzle" DROP CONSTRAINT "Puzzle_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "id",
DROP COLUMN "listPublicly",
DROP COLUMN "path",
DROP COLUMN "puzzleName",
DROP COLUMN "successMessage",
DROP COLUMN "updatedAt",
ADD COLUMN     "rewardableId" TEXT NOT NULL,
ADD CONSTRAINT "Puzzle_pkey" PRIMARY KEY ("rewardableId");

-- AlterTable
ALTER TABLE "Step" ADD COLUMN     "puzzleId" TEXT NOT NULL,
ADD COLUMN     "stepSortWeight" INTEGER NOT NULL DEFAULT 1;

-- DropTable
DROP TABLE "StepsOnPuzzles";

-- DropTable
DROP TABLE "_NftToPuzzle";

-- CreateTable
CREATE TABLE "RewardableConnection" (
    "parentId" TEXT NOT NULL,
    "childId" TEXT NOT NULL,
    "childSortWeight" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RewardableConnection_pkey" PRIMARY KEY ("parentId","childId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Step_id_puzzleId_stepSortWeight_key" ON "Step"("id", "puzzleId", "stepSortWeight" ASC);

-- AddForeignKey
ALTER TABLE "RewardableConnection" ADD CONSTRAINT "RewardableConnection_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Rewardable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RewardableConnection" ADD CONSTRAINT "RewardableConnection_childId_fkey" FOREIGN KEY ("childId") REFERENCES "Rewardable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Puzzle" ADD CONSTRAINT "Puzzle_rewardableId_fkey" FOREIGN KEY ("rewardableId") REFERENCES "Rewardable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Step" ADD CONSTRAINT "Step_puzzleId_fkey" FOREIGN KEY ("puzzleId") REFERENCES "Puzzle"("rewardableId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_puzzleId_fkey" FOREIGN KEY ("puzzleId") REFERENCES "Puzzle"("rewardableId") ON DELETE RESTRICT ON UPDATE CASCADE;
