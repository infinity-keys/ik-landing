/*
  Warnings:

  - You are about to drop the column `listSortWeight` on the `Puzzle` table. All the data in the column will be lost.
  - You are about to drop the column `listSortWeight` on the `Step` table. All the data in the column will be lost.
  - You are about to drop the column `puzzleId` on the `Step` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Step" DROP CONSTRAINT "Step_puzzleId_fkey";

-- AlterTable
ALTER TABLE "Puzzle" DROP COLUMN "listSortWeight";

-- AlterTable
ALTER TABLE "Step" DROP COLUMN "listSortWeight",
DROP COLUMN "puzzleId";

-- CreateTable
CREATE TABLE "StepsOnPuzzles" (
    "stepId" TEXT NOT NULL,
    "puzzleId" TEXT NOT NULL,
    "stepSortWeight" INTEGER NOT NULL,

    CONSTRAINT "StepsOnPuzzles_pkey" PRIMARY KEY ("stepId","puzzleId")
);

-- CreateTable
CREATE TABLE "Bundle" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "rewardNftId" TEXT NOT NULL,
    "listPublicly" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Bundle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BundleToPack" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BundleToPack_AB_unique" ON "_BundleToPack"("A", "B");

-- CreateIndex
CREATE INDEX "_BundleToPack_B_index" ON "_BundleToPack"("B");

-- AddForeignKey
ALTER TABLE "StepsOnPuzzles" ADD CONSTRAINT "StepsOnPuzzles_stepId_fkey" FOREIGN KEY ("stepId") REFERENCES "Step"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StepsOnPuzzles" ADD CONSTRAINT "StepsOnPuzzles_puzzleId_fkey" FOREIGN KEY ("puzzleId") REFERENCES "Puzzle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BundleToPack" ADD CONSTRAINT "_BundleToPack_A_fkey" FOREIGN KEY ("A") REFERENCES "Bundle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BundleToPack" ADD CONSTRAINT "_BundleToPack_B_fkey" FOREIGN KEY ("B") REFERENCES "Pack"("id") ON DELETE CASCADE ON UPDATE CASCADE;
