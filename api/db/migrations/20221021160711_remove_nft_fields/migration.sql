/*
  Warnings:

  - You are about to drop the column `rewardNftId` on the `Bundle` table. All the data in the column will be lost.
  - You are about to drop the column `rewardNftId` on the `Pack` table. All the data in the column will be lost.
  - You are about to drop the column `rewardNft` on the `Puzzle` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Bundle" DROP COLUMN "rewardNftId";

-- AlterTable
ALTER TABLE "Pack" DROP COLUMN "rewardNftId";

-- AlterTable
ALTER TABLE "Puzzle" DROP COLUMN "rewardNft";
