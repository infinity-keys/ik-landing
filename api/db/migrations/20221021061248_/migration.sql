/*
  Warnings:

  - The primary key for the `PacksOnBundles` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `PuzzlesOnPacks` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `StepsOnPuzzles` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[packId,bundleId]` on the table `PacksOnBundles` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[puzzleId,packId]` on the table `PuzzlesOnPacks` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[stepId,puzzleId]` on the table `StepsOnPuzzles` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "PacksOnBundles" DROP CONSTRAINT "PacksOnBundles_pkey",
ADD CONSTRAINT "PacksOnBundles_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "PuzzlesOnPacks" DROP CONSTRAINT "PuzzlesOnPacks_pkey",
ADD CONSTRAINT "PuzzlesOnPacks_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "StepsOnPuzzles" DROP CONSTRAINT "StepsOnPuzzles_pkey",
ADD CONSTRAINT "StepsOnPuzzles_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "PacksOnBundles_packId_bundleId_key" ON "PacksOnBundles"("packId", "bundleId");

-- CreateIndex
CREATE UNIQUE INDEX "PuzzlesOnPacks_puzzleId_packId_key" ON "PuzzlesOnPacks"("puzzleId", "packId");

-- CreateIndex
CREATE UNIQUE INDEX "StepsOnPuzzles_stepId_puzzleId_key" ON "StepsOnPuzzles"("stepId", "puzzleId");
