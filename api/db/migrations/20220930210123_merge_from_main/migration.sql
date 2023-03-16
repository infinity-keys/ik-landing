/*
  Warnings:

  - You are about to drop the column `rewardNftId` on the `Puzzle` table. All the data in the column will be lost.
  - Added the required column `rewardNft` to the `Puzzle` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Puzzle" DROP COLUMN "rewardNftId",
ADD COLUMN     "rewardNft" TEXT NOT NULL;
