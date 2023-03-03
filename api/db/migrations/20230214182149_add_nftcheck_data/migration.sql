/*
  Warnings:

  - You are about to drop the column `chainId` on the `StepNftCheck` table. All the data in the column will be lost.
  - You are about to drop the column `contractAddress` on the `StepNftCheck` table. All the data in the column will be lost.
  - You are about to drop the column `poapEventId` on the `StepNftCheck` table. All the data in the column will be lost.
  - You are about to drop the column `tokenId` on the `StepNftCheck` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "StepNftCheck" DROP COLUMN "chainId",
DROP COLUMN "contractAddress",
DROP COLUMN "poapEventId",
DROP COLUMN "tokenId";

-- CreateTable
CREATE TABLE "NftCheckDatum" (
    "id" TEXT NOT NULL,
    "contractAddress" TEXT,
    "tokenId" INTEGER,
    "chainId" INTEGER,
    "poapEventId" TEXT,
    "stepNftCheckId" TEXT,

    CONSTRAINT "NftCheckDatum_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "NftCheckDatum" ADD CONSTRAINT "NftCheckDatum_stepNftCheckId_fkey" FOREIGN KEY ("stepNftCheckId") REFERENCES "StepNftCheck"("id") ON DELETE SET NULL ON UPDATE CASCADE;
