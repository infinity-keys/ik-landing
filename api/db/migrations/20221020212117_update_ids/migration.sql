/*
  Warnings:

  - The primary key for the `Nft` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `nftId` on the `Nft` table. All the data in the column will be lost.
  - The primary key for the `Pack` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `packId` on the `Pack` table. All the data in the column will be lost.
  - The primary key for the `Puzzle` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `puzzleId` on the `Puzzle` table. All the data in the column will be lost.
  - The primary key for the `Step` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `stepId` on the `Step` table. All the data in the column will be lost.
  - The primary key for the `Submission` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `submissionId` on the `Submission` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `User` table. All the data in the column will be lost.
  - The required column `id` was added to the `Nft` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `Pack` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `Puzzle` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `Step` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `Submission` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "Nft" DROP CONSTRAINT "Nft_puzzleId_fkey";

-- DropForeignKey
ALTER TABLE "Step" DROP CONSTRAINT "Step_puzzleId_fkey";

-- DropForeignKey
ALTER TABLE "Submission" DROP CONSTRAINT "Submission_puzzleId_fkey";

-- DropForeignKey
ALTER TABLE "Submission" DROP CONSTRAINT "Submission_userId_fkey";

-- DropForeignKey
ALTER TABLE "_PackToPuzzle" DROP CONSTRAINT "_PackToPuzzle_A_fkey";

-- DropForeignKey
ALTER TABLE "_PackToPuzzle" DROP CONSTRAINT "_PackToPuzzle_B_fkey";

-- AlterTable
ALTER TABLE "Nft" DROP CONSTRAINT "Nft_pkey",
DROP COLUMN "nftId",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Nft_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Pack" DROP CONSTRAINT "Pack_pkey",
DROP COLUMN "packId",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Pack_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Puzzle" DROP CONSTRAINT "Puzzle_pkey",
DROP COLUMN "puzzleId",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Puzzle_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Step" DROP CONSTRAINT "Step_pkey",
DROP COLUMN "stepId",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Step_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Submission" DROP CONSTRAINT "Submission_pkey",
DROP COLUMN "submissionId",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Submission_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "userId",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Step" ADD CONSTRAINT "Step_puzzleId_fkey" FOREIGN KEY ("puzzleId") REFERENCES "Puzzle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Nft" ADD CONSTRAINT "Nft_puzzleId_fkey" FOREIGN KEY ("puzzleId") REFERENCES "Puzzle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_puzzleId_fkey" FOREIGN KEY ("puzzleId") REFERENCES "Puzzle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PackToPuzzle" ADD CONSTRAINT "_PackToPuzzle_A_fkey" FOREIGN KEY ("A") REFERENCES "Pack"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PackToPuzzle" ADD CONSTRAINT "_PackToPuzzle_B_fkey" FOREIGN KEY ("B") REFERENCES "Puzzle"("id") ON DELETE CASCADE ON UPDATE CASCADE;
