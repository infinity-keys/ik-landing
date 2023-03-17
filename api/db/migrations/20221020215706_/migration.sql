/*
  Warnings:

  - A unique constraint covering the columns `[puzzleId,userId]` on the table `Submission` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Submission_puzzleId_userId_key" ON "Submission"("puzzleId", "userId");
