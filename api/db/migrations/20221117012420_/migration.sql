/*
  Warnings:

  - A unique constraint covering the columns `[rewardableId]` on the table `Puzzle` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Puzzle_rewardableId_key" ON "Puzzle"("rewardableId");
