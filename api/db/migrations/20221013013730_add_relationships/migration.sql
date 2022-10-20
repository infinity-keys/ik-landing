/*
  Warnings:

  - The primary key for the `Submission` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Submission` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[puzzleId]` on the table `Nft` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `puzzleId` to the `Nft` table without a default value. This is not possible if the table is not empty.
  - The required column `submissionId` was added to the `Submission` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `userId` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Nft" ADD COLUMN     "puzzleId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Submission" DROP CONSTRAINT "Submission_pkey",
DROP COLUMN "id",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "submissionId" TEXT NOT NULL,
ADD CONSTRAINT "Submission_pkey" PRIMARY KEY ("submissionId");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
ADD COLUMN     "userId" TEXT NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Nft_puzzleId_key" ON "Nft"("puzzleId");

-- AddForeignKey
ALTER TABLE "Nft" ADD CONSTRAINT "Nft_puzzleId_fkey" FOREIGN KEY ("puzzleId") REFERENCES "Puzzle"("puzzleId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_puzzleId_fkey" FOREIGN KEY ("puzzleId") REFERENCES "Puzzle"("puzzleId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
