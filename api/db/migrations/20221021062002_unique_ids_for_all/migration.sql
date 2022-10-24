/*
  Warnings:

  - The primary key for the `Submission` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[puzzleId,userId]` on the table `Submission` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `Submission` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Submission" DROP CONSTRAINT "Submission_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Submission_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Submission_puzzleId_userId_key" ON "Submission"("puzzleId", "userId");
