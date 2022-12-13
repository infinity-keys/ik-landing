/*
  Warnings:

  - A unique constraint covering the columns `[puzzleId,stepSortWeight]` on the table `Step` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Step_id_puzzleId_stepSortWeight_key";

-- CreateIndex
CREATE UNIQUE INDEX "Step_puzzleId_stepSortWeight_key" ON "Step"("puzzleId", "stepSortWeight" ASC);
