/*
  Warnings:

  - The primary key for the `Puzzle` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The required column `id` was added to the `Puzzle` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "Step" DROP CONSTRAINT "Step_puzzleId_fkey";

-- DropForeignKey
ALTER TABLE "Submission" DROP CONSTRAINT "Submission_puzzleId_fkey";

-- AlterTable
ALTER TABLE "Puzzle" DROP CONSTRAINT "Puzzle_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Puzzle_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Step" ADD CONSTRAINT "Step_puzzleId_fkey" FOREIGN KEY ("puzzleId") REFERENCES "Puzzle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_puzzleId_fkey" FOREIGN KEY ("puzzleId") REFERENCES "Puzzle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
