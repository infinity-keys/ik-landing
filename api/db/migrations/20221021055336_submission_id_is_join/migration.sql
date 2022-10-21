/*
  Warnings:

  - The primary key for the `Submission` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Submission` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Submission_puzzleId_userId_key";

-- AlterTable
ALTER TABLE "Submission" DROP CONSTRAINT "Submission_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Submission_pkey" PRIMARY KEY ("puzzleId", "userId");
