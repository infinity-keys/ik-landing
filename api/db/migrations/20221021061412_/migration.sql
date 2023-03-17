/*
  Warnings:

  - The primary key for the `Attempt` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[stepId,userId,attemptedAt]` on the table `Attempt` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `Attempt` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Attempt" DROP CONSTRAINT "Attempt_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Attempt_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Attempt_stepId_userId_attemptedAt_key" ON "Attempt"("stepId", "userId", "attemptedAt");
