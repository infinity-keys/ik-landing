/*
  Warnings:

  - You are about to drop the column `nftCheckLogic` on the `StepNftCheck` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "StepNftCheck" DROP COLUMN "nftCheckLogic",
ADD COLUMN     "requireAllNfts" BOOLEAN NOT NULL DEFAULT true;

-- DropEnum
DROP TYPE "NftCheckLogic";
