/*
  Warnings:

  - A unique constraint covering the columns `[contractName,tokenId]` on the table `Nft` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[stepId,puzzleId,stepSortWeight]` on the table `StepsOnPuzzles` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Bundle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Nft` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Pack` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `PacksOnBundles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Puzzle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `PuzzlesOnPacks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Step` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `StepsOnPuzzles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Attempt" DROP CONSTRAINT "Attempt_userId_fkey";

-- DropIndex
DROP INDEX "StepsOnPuzzles_stepId_puzzleId_key";

-- AlterTable
ALTER TABLE "Bundle" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Nft" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Pack" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "PacksOnBundles" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Puzzle" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "PuzzlesOnPacks" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Step" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "StepsOnPuzzles" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "stepSortWeight" SET DEFAULT 1;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE INDEX "Attempt_userId_idx" ON "Attempt"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Nft_contractName_tokenId_key" ON "Nft"("contractName", "tokenId");

-- CreateIndex
CREATE UNIQUE INDEX "StepsOnPuzzles_stepId_puzzleId_stepSortWeight_key" ON "StepsOnPuzzles"("stepId", "puzzleId", "stepSortWeight" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Attempt" ADD CONSTRAINT "Attempt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
