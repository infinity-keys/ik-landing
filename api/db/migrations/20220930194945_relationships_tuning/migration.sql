/*
  Warnings:

  - You are about to drop the column `rewardNft` on the `Puzzle` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Puzzle" DROP COLUMN "rewardNft",
ADD COLUMN     "rewardNftId" TEXT;
