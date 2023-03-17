/*
  Warnings:

  - You are about to drop the column `nftId` on the `Pack` table. All the data in the column will be lost.
  - You are about to drop the column `sortWeight` on the `Pack` table. All the data in the column will be lost.
  - You are about to drop the column `sortWeight` on the `Puzzle` table. All the data in the column will be lost.
  - You are about to drop the column `order` on the `Step` table. All the data in the column will be lost.
  - Added the required column `rewardNftId` to the `Pack` table without a default value. This is not possible if the table is not empty.
  - Added the required column `listSortWeight` to the `Puzzle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rewardNft` to the `Puzzle` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pack" DROP COLUMN "nftId",
DROP COLUMN "sortWeight",
ADD COLUMN     "listSortWeight" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "rewardNftId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Puzzle" DROP COLUMN "sortWeight",
ADD COLUMN     "listSortWeight" INTEGER NOT NULL,
ADD COLUMN     "rewardNft" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Step" DROP COLUMN "order",
ADD COLUMN     "listSortWeight" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "Nft" (
    "nftId" TEXT NOT NULL,
    "tokenId" INTEGER NOT NULL,
    "contractName" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "cloudinaryId" TEXT NOT NULL,

    CONSTRAINT "Nft_pkey" PRIMARY KEY ("nftId")
);
