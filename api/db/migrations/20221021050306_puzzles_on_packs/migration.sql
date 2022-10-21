/*
  Warnings:

  - You are about to drop the column `listSortWeight` on the `Pack` table. All the data in the column will be lost.
  - You are about to drop the `_PackToPuzzle` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_PackToPuzzle" DROP CONSTRAINT "_PackToPuzzle_A_fkey";

-- DropForeignKey
ALTER TABLE "_PackToPuzzle" DROP CONSTRAINT "_PackToPuzzle_B_fkey";

-- AlterTable
ALTER TABLE "Pack" DROP COLUMN "listSortWeight";

-- AlterTable
ALTER TABLE "StepsOnPuzzles" ADD COLUMN     "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "_PackToPuzzle";

-- CreateTable
CREATE TABLE "PuzzlesOnPacks" (
    "puzzleId" TEXT NOT NULL,
    "packId" TEXT NOT NULL,
    "puzzleSortWeight" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PuzzlesOnPacks_pkey" PRIMARY KEY ("puzzleId","packId")
);

-- AddForeignKey
ALTER TABLE "PuzzlesOnPacks" ADD CONSTRAINT "PuzzlesOnPacks_puzzleId_fkey" FOREIGN KEY ("puzzleId") REFERENCES "Puzzle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PuzzlesOnPacks" ADD CONSTRAINT "PuzzlesOnPacks_packId_fkey" FOREIGN KEY ("packId") REFERENCES "Pack"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
