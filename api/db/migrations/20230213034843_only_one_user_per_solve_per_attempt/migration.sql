/*
  Warnings:

  - A unique constraint covering the columns `[userId,attemptId]` on the table `Solve` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Solve_userId_attemptId_key" ON "Solve"("userId", "attemptId");
